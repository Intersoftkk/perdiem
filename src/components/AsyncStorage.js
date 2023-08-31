import AsyncStorage from '@react-native-async-storage/async-storage';

export const setObjectValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // save error
  }
};

export const getMyObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};

export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

export const ASYNC_STORAGE_KEYS = {
  LOGGED_IN_USER: 'LOGGED_IN_USER',
  DEFAULT_CHECKED_BUSINESS: 'DEFAULT_CHECKED_BUSINESS',
};
