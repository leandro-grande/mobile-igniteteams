import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { getAllGroups } from '@storage/group/getAllGroups';
import { Container } from "./styles";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new');
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  const fetchGroups = async () => {
    try {
      const data = await getAllGroups();
      setGroups(data);

    } catch (err) {
      console.log(err);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []));

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
            onPress={()=> handleOpenGroup(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma!" />
        )}
      />

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup} 
      />

      
    </Container>
  )
}