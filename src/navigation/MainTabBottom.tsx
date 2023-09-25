import { t } from 'i18next';
import React, { ReactElement } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Home } from 'screens/Home';
import { HomeUser } from 'screens/HomeUser';
import { Profile } from 'screens/Profile';
import { Service } from 'screens/Service';
import { ServiceUser } from 'screens/ServiceUser';
import { BaseText } from 'components/atoms/BaseText';
import { getValue } from 'core/helpers/Object';
import { ColorConst } from 'consts/ColorConst';
import ImageConst from 'consts/ImageConst';
import { ScreenConst } from 'consts/ScreenConst';
import { useAppInfo } from 'context/AppInfo';
import { styles } from './styles';

const Tab = createBottomTabNavigator();
// const bottomSpace = isIphoneX() ? getBottomSpace() : 0;

type Route = {
  name: string;
};

type Params = {
  icon: ReactElement;
  title: string;
  testID?: string;
};

const getParams = (route: Route, focused: boolean): Params => {
  switch (route.name) {
    case ScreenConst.HOME_SCREEN:
      return {
        icon: (
          <Entypo
            size={focused ? 30 : 25}
            color={focused ? '#fff' : '#d0d0d0'}
            name="home"
          />
        ),
        title: 'trang chủ',
      };
    case ScreenConst.PROFILE_SCREEN:
      return {
        icon: (
          <Entypo
            size={focused ? 30 : 25}
            color={focused ? '#fff' : '#d0d0d0'}
            name="user"
          />
        ),
        title: 'Cá nhân',
      };
    case ScreenConst.SERVICE_SCREEN:
      return {
        icon: (
          <Entypo
            size={focused ? 30 : 25}
            color={focused ? '#fff' : '#d0d0d0'}
            name="500px"
          />
        ),
        title: 'Dịch vụ',
      };

    default:
      return {
        icon: ImageConst.home,
        title: t('home.home'),
      };
  }
};

const MainTabBottom = (): ReactElement => {
  const { user } = useAppInfo();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }): BottomTabNavigationOptions => ({
          tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => {
            const { icon } = getParams(route, focused);

            return icon;
          },
          tabBarBadgeStyle: { backgroundColor: ColorConst.primary },
          tabBarLabel: ({ focused }: { focused: boolean }): ReactElement => {
            const { title } = getParams(route, focused);
            return (
              <BaseText
                style={focused ? styles.titleActive : styles.titleInActive}
              >
                {title}
              </BaseText>
            );
          },
          tabBarActiveTintColor: ColorConst.primary,
          tabBarInactiveTintColor: ColorConst.primary,
          tabBarActiveBackgroundColor: ColorConst.primary,
          tabBarInactiveBackgroundColor: ColorConst.primary,
          tabBarStyle: {
            ...styles.tabBar,
            height: 60 + getValue(insets, 0, ['bottom']),
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name={ScreenConst.HOME_SCREEN}
          component={user.role === 'admin' ? Home : HomeUser}
        />
        <Tab.Screen
          name={ScreenConst.SERVICE_SCREEN}
          component={user.role === 'admin' ? Service : ServiceUser}
        />
        <Tab.Screen name={ScreenConst.PROFILE_SCREEN} component={Profile} />
      </Tab.Navigator>
    </>
  );
};

export { MainTabBottom };
