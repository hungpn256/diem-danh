import axios from 'axios';
import { getDistance } from 'geolib';
import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import {
  getCurrentPosition,
  requestAuthorization,
} from 'core/helpers/Location';
import { getError } from 'core/helpers/getError';

const ScanQRAttention = () => {
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const resPermission = await requestAuthorization();
      if (cameraPermission !== 'authorized' && !resPermission) {
        Alert.alert('Lỗi', 'Vui lòng cho phép quyền truy cập camera và vị trí');
        NavigationService.back();
      }
    };
    getPermission();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const loadingRef = useRef<boolean>();

  useEffect(() => {
    const getUser = async () => {
      try {
        LoadingView.show();
        loadingRef.current = true;
        if (barcodes?.[0]?.displayValue) {
          const { location, ...data } = JSON.parse(barcodes?.[0]?.displayValue);
          const currentLocation = await getCurrentPosition();

          const distance = getDistance(location, {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
          if (distance > 5) {
            Alert.alert('Vị trí', 'Bạn đang không gần vị trí quét mã');
            return;
          }
          await axios.post('/attendance/attendance', {
            ...data,
            deviceUniqueId: await DeviceInfo.getUniqueId(),
          });
          NavigationService.back();
          Alert.alert('Chấm công', 'Thành công! Xin cảm ơn');
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
      <Header title="Quét mã chấm công" />
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </BaseView>
  );
};

export { ScanQRAttention };
