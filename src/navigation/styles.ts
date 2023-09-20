import { StyleSheet } from 'react-native';
import { ColorConst } from 'consts/ColorConst';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: ColorConst.primary,
  },
  iconActive: {
    width: 22,
    height: 22,
    tintColor: ColorConst.white,
  },
  iconInActive: {
    width: 20,
    height: 20,
    tintColor: ColorConst.grey,
  },
  titleActive: {
    color: ColorConst.white,
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 5,
  },
  titleInActive: {
    color: ColorConst.grey,
    fontSize: 12,
    marginBottom: 2,
  },
});

export { styles };
