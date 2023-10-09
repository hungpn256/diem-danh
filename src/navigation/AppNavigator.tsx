import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddUser } from 'screens/AddUser';
import { AdditionalWork } from 'screens/AdditionalWork';
import { AdditionalWorkList } from 'screens/AdditionalWorkList';
import { ChooseRole } from 'screens/ChooseRole';
import { Company } from 'screens/Company';
import { ForgotPassword } from 'screens/ForgotPassword';
import { HomeUser } from 'screens/HomeUser';
import { Login } from 'screens/Login';
import QRCode from 'screens/QRCode';
import QRCodeAttention from 'screens/QRCodeAttention';
import { Register } from 'screens/Register';
import { ScanQR } from 'screens/ScanQR';
import { ScanQRAttention } from 'screens/ScanQRAttention';
import { Splash } from 'screens/Splash';
import { ScreenConst } from 'consts/ScreenConst';
import { MainTabBottom } from './MainTabBottom';

const Stack = createNativeStackNavigator();

const AppNavigator = (): ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenConst.SPLASH_SCREEN}
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
      <Stack.Screen name={ScreenConst.ADD_USER_SCREEN} component={AddUser} />
      <Stack.Screen
        name={ScreenConst.QR_CODE_ATTENTION_SCREEN}
        component={QRCodeAttention}
      />
      <Stack.Screen
        name={ScreenConst.ADDITIONAL_WORK_SCREEN}
        component={AdditionalWork}
      />
      <Stack.Screen
        name={ScreenConst.ADDITIONAL_SCAN_QR_SCREEN}
        component={ScanQRAttention}
      />
      <Stack.Screen name={ScreenConst.HOME_USER_SCREEN} component={HomeUser} />
      <Stack.Screen
        name={ScreenConst.ADDITIONAL_WORK_LIST_SCREEN}
        component={AdditionalWorkList}
      />
      <Stack.Screen name={ScreenConst.ADD_COMPANY_SCREEN} component={Company} />
      <Stack.Screen
        name={ScreenConst.FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export { AppNavigator };
