import AsyncStorage from '@react-native-async-storage/async-storage';

const set = async (key: string, value: string | object): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    //
  }
};

const merge = async (key: string, value: object | string): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (err) {
    //
  }
};

const get = async (key: string): Promise<any> => {
  try {
    const res = (await AsyncStorage.getItem(key)) as string;
    return JSON.parse(res);
  } catch (err) {
    return null;
  }
};

const remove = async (key: string): Promise<void | null> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (err) {
    return null;
  }
};

const removeMulti = async (key: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(key);
  } catch (err) {
    //
  }
};

const StorageService = {
  set,
  get,
  remove,
  merge,
  removeMulti,
};
export { StorageService };
