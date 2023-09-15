import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Surface, Text, useTheme } from 'react-native-paper';
import QRCodeSVG from 'react-native-qrcode-svg';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import { NavigationService } from 'services/NavigationService';
import { UIConst } from 'consts/UIConst';

export default function QRCode() {
  const data = {
    id: '1233',
    username: 'kkk',
  };
  const theme = useTheme();
  return (
    <BaseView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={NavigationService.back} />
        <Appbar.Content title="QRCode" />
      </Appbar.Header>
      <AppContainer>
        <Surface style={styles.surface} elevation={4}>
          <BaseView
            style={{
              width: '100%',
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>
              Định danh người dùng
            </Text>
          </BaseView>
          <QRCodeSVG value={JSON.stringify(data)} size={UIConst.WIDTH / 2} />
          <Text style={{ marginVertical: 10 }} variant="bodyLarge">
            Quét mã để đăng nhập
          </Text>
        </Surface>
      </AppContainer>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
