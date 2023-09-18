import { Alert } from 'react-native';

export const getError = (error: any) => {
  if (error?.message) {
    Alert.alert('Lỗi', error.message);
  }
};
