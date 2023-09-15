import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Divider, TextInput, useTheme } from 'react-native-paper';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';

const Login = () => {
  const theme = useTheme();
  return (
    <BaseView style={{ flex: 1 }}>
      <ScrollView>
        <BaseView style={{ backgroundColor: theme.colors.primary }}>
          <BaseText
            style={{
              lineHeight: 200,
              fontSize: 30,
              fontWeight: '600',
              paddingLeft: 10,
              color: '#fff',
            }}>
            ĐĂNG NHẬP
          </BaseText>
        </BaseView>
        <BaseText
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontWeight: '600',
            fontSize: 16,
          }}>
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
          <Divider style={{ margin: 20 }} />
          <Button style={{ margin: 10 }} mode="contained">
            Đăng Nhập
          </Button>
          <Button>Nếu bạn chưa có tài khoản, Hãy đăng ký</Button>
        </BaseView>
      </ScrollView>
    </BaseView>
  );
};

export { Login };
