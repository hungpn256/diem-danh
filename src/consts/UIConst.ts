import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

const UIConst = {
  WIDTH: width,
  HEIGHT: height,
  OS_ANDROID: Platform.OS === 'android',
  OS_IOS: Platform.OS === 'ios',
  STATUS_BAR_HEIGHT: StatusBar.currentHeight,

  FONT_WEIGHT_300: '300',
  FONT_WEIGHT_400: '400',
  FONT_WEIGHT_500: '500',
  FONT_WEIGHT_600: '600',

  PLATFORM_ANDROID: 'android',
  PLATFORM_IOS: 'ios',

  VERSION: DeviceInfo.getVersion(),
  VERSION_BUILD: DeviceInfo.getBuildNumber(),
};

export { UIConst };
