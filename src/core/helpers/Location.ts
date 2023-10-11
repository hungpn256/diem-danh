import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const getCurrentPosition = () => {
  return new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        resolve(position);
      },
      error => {
        reject(error);
      },
    );
  });
};
export const requestAuthorization = () => {
  return new Promise(resolve => {
    Geolocation.requestAuthorization(
      () => {
        resolve(true);
      },
      () => {
        resolve(false);
      },
    );
  });
};

export { getCurrentPosition };
