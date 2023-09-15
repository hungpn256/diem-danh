import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { BaseView } from 'components/atoms/BaseView';

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

  const devices = useCameraDevices();
  const device = devices.back;
  if (device == null) return <></>;
  return (
    <BaseView style={StyleSheet.absoluteFill}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Quét mã đăng nhập" />
      </Appbar.Header>
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
