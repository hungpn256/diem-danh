import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import QRCodeSVG from 'react-native-qrcode-svg';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { getError } from 'core/helpers/getError';
import { UIConst } from 'consts/UIConst';
import { useAppInfo } from 'context/AppInfo';

export default function QRCodeAttention() {
  const [data, setData] = useState('');
  const theme = useTheme();
  const { user } = useAppInfo();
  const [timeCheckIn, setTimeCheckIn] = useState(30);

  useEffect(() => {
    createTokenCheckin();
  }, []);

  const createTokenCheckin = async () => {
    try {
      LoadingView.show();
      const res = await axios.post('/attendance/create-token');
      setData(
        JSON.stringify({
          ...res.data,
          companyId: user.managedBy._id,
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
      </AppContainer>
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
