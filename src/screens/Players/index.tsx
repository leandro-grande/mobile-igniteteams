import { Button } from "@components/Button"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { ListEmpty } from "@components/ListEmpty"
import { Loading } from "@components/Loading"
import { PlayerCard } from "@components/PlayerCard"
import { useNavigation, useRoute } from '@react-navigation/native'
import { removeGroupByName } from "@storage/group/removeGroupByName"
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup"
import { getPlayersByGroupAndTeam } from '@storage/player/getPlayersByGroupAndTeam'
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup"
import { AppError } from "@utils/AppError"
import { useEffect, useRef, useState } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles"

type RouteParams = {
  group: string;
}

export const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const playerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation()
  const route = useRoute();
  const { group } = route.params as RouteParams; 

  const handleAddPlayer = async () => {
    if (playerName.trim().length === 0) {
      Alert.alert('Novo Player', 'Digite o nome do participante.');
      return;
    }

    const newPlayer = {
      name: playerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group);

      playerNameInputRef.current?.blur();
      setPlayerName('');
      fetchPlayerByTeam();

    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo Player', err.message);
      } else {
        console.log(err);
      }
    }
  }

  const handleRemovePlayer = async (playerName: string) => {
    try {

      await removePlayerByGroup(playerName, group);
      fetchPlayerByTeam();

    } catch (err) {
      console.log(err);
      Alert.alert('Remover participante', 'Não foi possível remover esse participante')
    }

  }

  const removeGroup = async () => {
    try {
      await removeGroupByName(group);
      navigation.navigate('groups');

    } catch (err) {
      console.log(err);
      Alert.alert('Remover grupo', 'Erro ao remover grupo.')
    }
  }

  const handleRemoveGroupAndPlayer = async () => {
    Alert.alert('Remover', 'Deseja remover o grupo?', 
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => removeGroup()}
      ]
    )
  }

  const fetchPlayerByTeam = async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (err) {
      console.log(err);
      Alert.alert('Participantes', 'Não foi possível carregar os participantes.')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayerByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setPlayerName}
          value={playerName}
          inputRef={playerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer} 
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
            
          )}
          horizontal
        />

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      

      { isLoading ? (
        <Loading />
      ) : (
        <FlatList 
          data={players}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
          )}
          contentContainerStyle={[   // Estilizar o conteúdo da FlatList
            {paddingBottom: 100},
            players.length === 0 && { flex: 1 }
          ]}
          showsVerticalScrollIndicator={false}  // Não mostrar o scroll
          ListEmptyComponent={() => (           // Mostrar componente quando estiver vazia
            <ListEmpty message="Não há participates nesse time!" />
          )}
        />
      )}

      
      <Button 
        type="secondary" 
        title="Remover Grupo"
        onPress={handleRemoveGroupAndPlayer}
      />
    </Container>
  )
}