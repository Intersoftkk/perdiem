import NetInfo from '@react-native-community/netinfo';

export const IsConnected = async () => {
  let state = await NetInfo.fetch();
  return state.isConnected;
};
