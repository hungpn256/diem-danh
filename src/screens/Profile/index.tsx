import React, { ReactElement, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { formatMoney } from 'core/helpers/formatMoney';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';
import { useAppInfo } from 'context/AppInfo';

const Profile = (): ReactElement => {
  const { user, getUser } = useAppInfo();
  const [codepushVer, setCodepushVer] = useState<string | undefined>();
  useEffect(() => {
    (async () => {
      const ver = await CodePush.getUpdateMetadata();
      setCodepushVer(ver?.label);
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header title="Trang cá nhân" />
      <AppContainer>
        <Card style={{ margin: 20, padding: 25 }}>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginRight: 8,
              }}
            />
            <View>
              <Text variant="labelMedium" style={{ padding: 5 }}>
                {user.name}
              </Text>
              <Text variant="labelMedium" style={{ padding: 5 }}>
                {user.email}
              </Text>
              <Text variant="labelMedium" style={{ padding: 5 }}>
                {user.phoneNumber}
              </Text>
              {user.role === 'user' && (
                <Text variant="labelMedium" style={{ padding: 5 }}>
                  {formatMoney(user.currentSalary)}
                </Text>
              )}
            </View>
          </View>
          <Button
            style={{ marginVertical: 8, marginTop: 50 }}
            mode="contained-tonal"
            onPress={() =>
              NavigationService.navigate(ScreenConst.ADD_USER_SCREEN, {
                user,
                getUser,
              })
            }
          >
            Chỉnh sửa thông tin cá nhân
          </Button>
          {user.role === 'admin' && (
            <Button
              style={{ marginVertical: 8 }}
              mode="contained-tonal"
              onPress={() =>
                NavigationService.navigate(ScreenConst.ADD_COMPANY_SCREEN)
              }
            >
              Chỉnh sửa thông tin công ty
            </Button>
          )}
          <Button
            style={{ marginVertical: 8 }}
            mode="contained-tonal"
            onPress={() =>
              NavigationService.navigate(ScreenConst.FORGOT_PASSWORD_SCREEN)
            }
          >
            Đổi mật khẩu
          </Button>
          <Button
            style={{ marginVertical: 8, marginBottom: 30 }}
            mode="contained-tonal"
            onPress={async () => {
              await StorageService.removeMulti(Object.keys(StorageConst));
              NavigationService.reset(ScreenConst.CHOOSE_ROLE_SCREEN);
            }}
          >
            Đăng xuất
          </Button>
          <Text variant="labelSmall" style={{ textAlign: 'center' }}>
            Phiên bản ứng dụng: {DeviceInfo.getVersion()} (
            {DeviceInfo.getBuildNumber()}) {codepushVer}
          </Text>
        </Card>
      </AppContainer>
    </View>
  );
};

export { Profile };
