import { t } from 'i18next';
import React, { ReactElement } from 'react';
import { ImageSourcePropType } from 'react-native/types';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Home } from 'screens/Home';
import { Post } from 'screens/Post';
import { Profile } from 'screens/Profile';
import { BaseImage } from 'components/atoms/BaseImage';
import { BaseText } from 'components/atoms/BaseText';
import { ColorConst } from 'consts/ColorConst';
import ImageConst from 'consts/ImageConst';
import { ScreenConst } from 'consts/ScreenConst';
import { styles } from './styles';

const Tab = createBottomTabNavigator();
// const bottomSpace = isIphoneX() ? getBottomSpace() : 0;

type Route = {
  name: string;
};

type Params = {
  icon: ImageSourcePropType;
  title: string;
  testID?: string;
};

const getParams = (route: Route, focused: boolean): Params => {
  switch (route.name) {
    case ScreenConst.HOME_SCREEN:
      return {
        icon: ImageConst.home,
        title: t('home.home'),
      };
    case ScreenConst.PROFILE_SCREEN:
      return {
        icon: ImageConst.profile,
        title: t('profile.profile'),
      };
    case ScreenConst.POST_SCREEN:
      return {
        icon: ImageConst.post,
        title: t('post.post'),
      };

    default:
      return {
        icon: ImageConst.home,
        title: t('home.home'),
      };
  }
};

const MainTabBottom = (): ReactElement => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }): BottomTabNavigationOptions => ({
          tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => {
            const { icon } = getParams(route, focused);

            return (
              <BaseImage
                style={focused ? styles.iconActive : styles.iconInActive}
                source={icon}
              />
            );
          },
          tabBarBadgeStyle: { backgroundColor: ColorConst.primary },
          tabBarLabel: ({ focused }: { focused: boolean }): ReactElement => {
            const { title } = getParams(route, focused);
            return (
              <BaseText
                style={focused ? styles.titleActive : styles.titleInActive}>
                {title}
              </BaseText>
            );
          },
          tabBarActiveTintColor: ColorConst.primary,
          tabBarInactiveTintColor: ColorConst.primary,
          tabBarActiveBackgroundColor: ColorConst.black,
          tabBarInactiveBackgroundColor: ColorConst.black,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        })}>
        <Tab.Screen name={ScreenConst.HOME_SCREEN} component={Home} />
        <Tab.Screen name={ScreenConst.POST_SCREEN} component={Post} />
        <Tab.Screen name={ScreenConst.PROFILE_SCREEN} component={Profile} />
      </Tab.Navigator>
    </>
  );
};

export { MainTabBottom };
