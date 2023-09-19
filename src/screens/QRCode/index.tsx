import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Surface, Text, useTheme } from 'react-native-paper';
import QRCodeSVG from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { User } from 'screens/Home';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { UIConst } from 'consts/UIConst';

export default function QRCode() {
  const [data, setData] = useState('');
  const theme = useTheme();
  const params = useRoute().params as any;
  const user = params?.user as User;
  useEffect(() => {
    const createPassword = async () => {
      try {
        LoadingView.show();
        const res = await axios.post('/user/create-password', {
          email: user.email,
        });
        setData(JSON.stringify(res.data));
      } catch (error) {
        getError(error);
      } finally {
        LoadingView.hide();
      }
    };
    createPassword();
  }, []);

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
          <QRCodeSVG value={data} size={UIConst.WIDTH / 2} />
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
