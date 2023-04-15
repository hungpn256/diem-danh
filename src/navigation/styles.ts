import { StyleSheet } from 'react-native';
import { ColorConst } from 'consts/ColorConst';

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: ColorConst.black,
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
    fontSize: 13,
  },
  titleInActive: {
    color: ColorConst.grey,
    fontSize: 12,
  },
});

export { styles };
