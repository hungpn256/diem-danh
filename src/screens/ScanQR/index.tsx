import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';
import { useAppInfo } from 'context/AppInfo';

const ScanQR = () => {
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission !== 'authorized') {
        Alert.alert('Camera', 'Vui lòng cho phép quyền truy cập camera');
      }
    };
    getPermission();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const loadingRef = useRef<boolean>();
  const { setUser } = useAppInfo();

  useEffect(() => {
    const getUser = async () => {
      try {
        LoadingView.show();
        loadingRef.current = true;
        if (barcodes?.[0]?.displayValue) {
          const data = JSON.parse(barcodes?.[0]?.displayValue);
          const res = await axios.post('/user/login', {
            email: data.email,
            password: data.password,
            deviceUniqueId: await DeviceInfo.getUniqueId(),
            deviceName: await DeviceInfo.getDeviceName(),
          });
          const token = res.data.token;
          setUser(res.data?.user);
          await StorageService.set(StorageConst.TOKEN, token);
          NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
        }
        loadingRef.current = false;
      } catch (error) {
        getError(error, () => {
          loadingRef.current = false;
        });
      } finally {
        LoadingView.hide();
      }
    };
    if (!loadingRef.current) {
      getUser();
    }
  }, [barcodes?.[0]?.displayValue]);

  const devices = useCameraDevices();
  const device = devices.back;
  if (device == null) return <></>;
  return (
    <BaseView style={StyleSheet.absoluteFill}>
      <Header title="Quét mã đăng nhập" />
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </BaseView>
  );
};

export { ScanQR };
