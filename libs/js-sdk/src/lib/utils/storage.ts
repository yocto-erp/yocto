import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE = {
  JWT: 'JWT',
};

export const get = (key: string) => {
  return AsyncStorage.getItem(key);
};

export const save = (key: string, value: never) => {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(key, jsonValue);
};
