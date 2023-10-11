import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import QRCodeSVG from 'react-native-qrcode-svg';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getCurrentPosition } from 'core/helpers/Location';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { UIConst } from 'consts/UIConst';
import { useAppInfo } from 'context/AppInfo';

export default function QRCodeAttention() {
  const [data, setData] = useState('');
  const theme = useTheme();
  const { user } = useAppInfo();
  const [timeCheckIn, setTimeCheckIn] = useState(30);
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionSuccess, setPermission] = useState(false);

  useEffect(() => {
    Geolocation.requestAuthorization(
      () => {
        setPermission(true);
      },
      () => {
        setPermission(false);
      },
    );
  }, []);

  useEffect(() => {
    if (permissionSuccess) {
      createTokenCheckin();
    }
  }, [permissionSuccess]);

  const createTokenCheckin = async () => {
    try {
      if (!permissionSuccess) {
        Alert.alert('Quyền', 'Không có quyền truy cập');
        return;
      }
      LoadingView.show();
      const location = await getCurrentPosition();
      location.coords.latitude;
      const res = await axios.post('/attendance/create-token');
      setData(
        JSON.stringify({
          ...res.data,
          companyId: user.managedBy._id,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }),
      );
      setTimeCheckIn(30);
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };
  useEffect(() => {
    if (timeCheckIn === 0) {
      createTokenCheckin();
    }
  }, [timeCheckIn]);

  useEffect(() => {
    return () => {
      createTokenCheckin();
    };
  }, []);

  useEffect(() => {
    let interval: number;
    if (data) {
      interval = setInterval(() => {
        setTimeCheckIn(time => {
          if (time > 0) {
            return --time;
          }
          return time;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [data]);

  const navigateHome = async () => {
    try {
      if (!password) return;
      setLoading(true);
      await axios.post('/user/login', {
        email: user.email,
        password: password,
        deviceUniqueId: await DeviceInfo.getUniqueId(),
        deviceName: await DeviceInfo.getDeviceName(),
      });
      onClose();
      NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
    } catch (err) {
      getError(err);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setVisible(false);
    setPassword('');
  };

  return (
    <BaseView style={{ flex: 1 }}>
      <Header title="QRCode" />
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
              Chấm công
            </Text>
          </BaseView>
          {data && <QRCodeSVG value={data} size={UIConst.WIDTH / 2} />}
          <Text style={{ marginVertical: 10 }} variant="bodyLarge">
            Quét mã để chấm công: {timeCheckIn}s
          </Text>
        </Surface>
        <Button
          onPress={() => {
            setVisible(true);
          }}
        >
          Trở lại trang chủ
        </Button>
      </AppContainer>
      <Modal transparent visible={visible} onDismiss={onClose}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#00000033',
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập password"
              secureTextEntry
            />
            <View style={{ marginTop: 10 }}>
              <Button loading={loading} onPress={navigateHome}>
                Xác nhận
              </Button>
              <Button loading={loading} onPress={onClose}>
                Huỷ bỏ
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
});
