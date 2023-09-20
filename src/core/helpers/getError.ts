import { Alert } from 'react-native';

export const getError = (error: any, onOk?: () => void) => {
  if (error?.response?.data?.error || error.message) {
    Alert.alert('Lỗi', error?.response?.data?.error || error.message, [
      { text: 'OK', onPress: onOk },
    ]);
  }
};
