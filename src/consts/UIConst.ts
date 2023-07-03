import { Dimensions, Platform, StatusBar, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

const [shortDimension] = width < height ? [width, height] : [height, width];

const UIConst = {
  WIDTH: width,
  HEIGHT: height,
  SCALE: shortDimension / 350,
  OS_ANDROID: Platform.OS === 'android',
  OS_IOS: Platform.OS === 'ios',
  STATUS_BAR_HEIGHT:
    Platform.OS === 'ios'
      ? NativeModules?.StatusBarManager?.HEIGHT
      : StatusBar.currentHeight,

  PLATFORM_ANDROID: 'android',
  PLATFORM_IOS: 'ios',

  VERSION: DeviceInfo.getVersion(),
  VERSION_BUILD: DeviceInfo.getBuildNumber(),
};

export { UIConst };
