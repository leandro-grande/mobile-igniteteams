import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from '@react-navigation/native';
import { createGroup } from "@storage/group/createGroup";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";


export const NewGroup = () => {
  const [groupName, setGroupName] = useState('');
  const navigation = useNavigation();

  const handleCreateNewGroup = async () => {
    try {
      if (groupName.trim().length === 0) {
        Alert.alert('Novo Grupo', 'Informe o nome da turma.');
        return;
      }

      await createGroup(groupName);
      navigation.navigate('players', { group: groupName });

    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo Grupo', err.message);
      } else {  
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
        console.log(err)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroupName}
          value={groupName}
        />
        <Button 
          title="Criar"
          style={{marginTop: 20}} 
          onPress={handleCreateNewGroup}
        />
      </Content>
      
    </Container>
  )
}