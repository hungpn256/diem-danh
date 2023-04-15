import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from 'screens/Splash';
import { ScreenConst } from 'consts/ScreenConst';
import { MainTabBottom } from './MainTabBottom';

const Stack = createNativeStackNavigator();

const AppNavigator = (): ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenConst.MAIN_TAB_BOTTOM_SCREEN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenConst.SPLASH_SCREEN} component={Splash} />
      <Stack.Screen
        name={ScreenConst.MAIN_TAB_BOTTOM_SCREEN}
        component={MainTabBottom}
      />
    </Stack.Navigator>
  );
};

export { AppNavigator };
