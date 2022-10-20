import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { getPlayersByGroup } from './getPlayersByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';


export const addPlayerByGroup = async ( newPlayer: PlayerStorageDTO, group: string) => {

  try {
    const storagePlayer = await getPlayersByGroup(group);
   
    const playerAlreadyExists = storagePlayer.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time.')
    }

    const storage = JSON.stringify([...storagePlayer, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    
  } catch (err) {
    throw err;
  }

  
}