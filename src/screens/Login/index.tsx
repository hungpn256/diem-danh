import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { regexPassword } from 'screens/Register';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';
import { useAppInfo } from 'context/AppInfo';

const schema = yup.object().shape({
  email: yup.string().email('Nhập đúng định dạng email'),
  password: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPassword, 'Mật khẩu cần ít nhất 6 ký tự bao gồm chữ và số'),
});

const Login = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { setUser } = useAppInfo();

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      const res = await axios.post('/user/login', data);
      const token = res.data.token;
      setUser(res.data?.user);
      await StorageService.set(StorageConst.TOKEN, token);
      if (res.data.user.managedBy) {
        NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
      } else {
        NavigationService.reset(ScreenConst.ADD_COMPANY_SCREEN);
      }
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };

  return (
    <BaseView style={{ flex: 1 }}>
      <AppContainer isKeyboardAvoidingView>
        <BaseView
          style={{
            backgroundColor: theme.colors.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <BaseText
            style={{
              lineHeight: 250,
              fontSize: 30,
              fontWeight: '600',
              paddingLeft: 10,
              color: '#fff',
            }}
          >
            ĐĂNG NHẬP
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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{ marginVertical: 10 }}
                label="Email"
                mode="outlined"
              />
            )}
            name="email"
          />
          {errors['email'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['email'].message}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ marginVertical: 10 }}
                label="Password"
                mode="outlined"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors['password'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['password'].message}
            </Text>
          )}
          <Divider style={{ margin: 30 }} />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            disabled={Object.keys(errors).length > 0}
            onPress={handleSubmit(onSubmit)}
          >
            Đăng Nhập
          </Button>
          <Button
            onPress={() => {
              NavigationService.navigate(ScreenConst.REGISTER_SCREEN);
            }}
          >
            Nếu bạn chưa có tài khoản, Hãy đăng ký
          </Button>
        </BaseView>
      </AppContainer>
    </BaseView>
  );
};

export { Login };
