import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Divider, TextInput, useTheme } from 'react-native-paper';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { NavigationService } from 'services/NavigationService';
import { ScreenConst } from 'consts/ScreenConst';

const Register = () => {
  const theme = useTheme();
  return (
    <BaseView style={{ flex: 1 }}>
      <ScrollView>
        <BaseView style={{ backgroundColor: theme.colors.primary }}>
          <BaseText
            style={{
              lineHeight: 250,
              fontSize: 30,
              fontWeight: '600',
              paddingLeft: 10,
              color: '#fff',
            }}
          >
            ĐĂNG KÝ
          </BaseText>
        </BaseView>
        <BaseText
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          Nhập tài khoản và mật khẩu
        </BaseText>
        <BaseView style={{ padding: 10 }}>
          <TextInput
            style={{ marginVertical: 10 }}
            label="Email"
            mode="outlined"
          />
          <TextInput
            style={{ marginVertical: 10 }}
            label="Password"
            mode="outlined"
            secureTextEntry
          />

          <Divider style={{ margin: 30 }} />
          <Button style={{ margin: 10 }} mode="contained">
            Đăng Ký
          </Button>
          <Button
            onPress={() => {
              NavigationService.navigate(ScreenConst.LOGIN_SCREEN);
            }}
          >
            Nếu bạn đã có tài khoản, Hãy đăng nhập
          </Button>
        </BaseView>
      </ScrollView>
    </BaseView>
  );
};

export { Register };
