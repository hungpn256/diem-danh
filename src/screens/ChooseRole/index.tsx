import React, { useEffect } from 'react';
import { Card, Text } from 'react-native-paper';
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
  return (
    <BaseView style={{ flex: 1 }}>
      <Text variant="titleLarge" style={{ marginTop: 50, textAlign: 'center' }}>
        Hãy chọn vai trò của bạn?
      </Text>
      <BaseView style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Card
          style={{ flex: 1, marginHorizontal: 10 }}
          onPress={() => {
            NavigationService.navigate(ScreenConst.LOGIN_SCREEN);
          }}
        >
          <Card.Content>
            <Text variant="titleLarge">Quản lý</Text>
          </Card.Content>
        </Card>
        <Card
          style={{ flex: 1, marginHorizontal: 10 }}
          onPress={() => {
            NavigationService.navigate(ScreenConst.SCAN_QR_SCREEN);
          }}
        >
          <Card.Content>
            <Text variant="titleLarge">Nhân viên</Text>
          </Card.Content>
        </Card>
      </BaseView>
    </BaseView>
  );
};

export { ChooseRole };
