import React, { useEffect } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Camera } from 'react-native-vision-camera';
import { BaseView } from 'components/atoms/BaseView';
import { NavigationService } from 'services/NavigationService';
import { ScreenConst } from 'consts/ScreenConst';
import { UIConst } from 'consts/UIConst';

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
        style={{
          marginTop: Math.max(UIConst.HEIGHT / 2 - 200, 100),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          mode="elevated"
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
            NavigationService.navigate(ScreenConst.LOGIN_SCREEN, {
              isAdmin: true,
            });
          }}
        >
          Quản lý
        </Button>
        <Button
          mode="elevated"
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
            NavigationService.navigate(ScreenConst.LOGIN_SCREEN, {
              isAdmin: false,
            });
          }}
        >
          Nhân viên
        </Button>
      </BaseView>
    </BaseView>
  );
};

export { ChooseRole };
