import React, { useEffect } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Camera } from 'react-native-vision-camera';
import { BaseView } from 'components/atoms/BaseView';
import { NavigationService } from 'services/NavigationService';
import { ScreenConst } from 'consts/ScreenConst';

const ChooseRole = () => {
  useEffect(() => {
    const requestPermission = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };
    requestPermission();
  }, []);

  const theme = useTheme();
  return (
    <BaseView style={{ flex: 1 }}>
      <Text
        variant="titleLarge"
        style={{ marginTop: 150, textAlign: 'center' }}
      >
        Hãy chọn vai trò của bạn?
      </Text>
      <BaseView
        style={{ marginTop: 150, flexDirection: 'row', alignItems: 'center' }}
      >
        <Button
          mode="outlined"
          elevation={4}
          icon={() => {
            return (
              <MaterialIcons
                name="manage-accounts"
                style={{ fontSize: 30, color: theme.colors.primary }}
              />
            );
          }}
          style={{ flex: 1, marginHorizontal: 10 }}
          labelStyle={{ paddingVertical: 15, fontSize: 20, fontWeight: '600' }}
          onPress={() => {
            NavigationService.navigate(ScreenConst.LOGIN_SCREEN);
          }}
        >
          Quản lý
        </Button>
        <Button
          mode="outlined"
          elevation={4}
          icon={() => {
            return (
              <MaterialIcons
                name="supervised-user-circle"
                style={{ fontSize: 30, color: theme.colors.primary }}
              />
            );
          }}
          style={{ flex: 1, marginHorizontal: 10 }}
          labelStyle={{ paddingVertical: 15, fontSize: 20, fontWeight: '600' }}
          onPress={() => {
            NavigationService.navigate(ScreenConst.SCAN_QR_SCREEN);
          }}
        >
          Nhân viên
        </Button>
      </BaseView>
    </BaseView>
  );
};

export { ChooseRole };
