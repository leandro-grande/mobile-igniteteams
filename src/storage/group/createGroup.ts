import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { getAllGroups } from './getAllGroups';

export const createGroup = async (newGroup: string) => {
  try {
    const storageGroups = await getAllGroups();

    const groupAlreadyExists = storageGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storageGroups, newGroup ]);
  
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (err) {
    throw err;
  }
}