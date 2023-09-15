import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChooseRole } from 'screens/ChooseRole';
import { Login } from 'screens/Login';
import QRCode from 'screens/QRCode';
import { Register } from 'screens/Register';
import { ScanQR } from 'screens/ScanQR';
import { Splash } from 'screens/Splash';
import { ScreenConst } from 'consts/ScreenConst';
import { MainTabBottom } from './MainTabBottom';

const Stack = createNativeStackNavigator();

const AppNavigator = (): ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenConst.CHOOSE_ROLE_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenConst.SPLASH_SCREEN} component={Splash} />
      <Stack.Screen
        name={ScreenConst.MAIN_TAB_BOTTOM_SCREEN}
        component={MainTabBottom}
      />
      <Stack.Screen name={ScreenConst.LOGIN_SCREEN} component={Login} />
      <Stack.Screen
        name={ScreenConst.CHOOSE_ROLE_SCREEN}
        component={ChooseRole}
      />
      <Stack.Screen name={ScreenConst.SCAN_QR_SCREEN} component={ScanQR} />
      <Stack.Screen name={ScreenConst.REGISTER_SCREEN} component={Register} />
      <Stack.Screen name={ScreenConst.QR_CODE_SCREEN} component={QRCode} />
    </Stack.Navigator>
  );
};

export { AppNavigator };
