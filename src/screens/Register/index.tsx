import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';

export const regexPassword =
  /^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!#\$%&'*+\-/=?\^_`{\|}~@]{6,}$/;

export const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập'),
  email: yup.string().email('Nhập đúng định dạng email'),
  password: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPassword, 'Mật khẩu cần ít nhất 6 ký tự bao gồm chữ và số'),
  phoneNumber: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPhoneNumber, 'Điền đúng định dạng số điện thoại'),
});

const Register = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      await axios.post('/user/register', {
        ...data,
        role: 'admin',
      });
      NavigationService.navigate(ScreenConst.LOGIN_SCREEN);
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
                autoCapitalize="none"
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
                label="Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="name"
          />
          {errors['name'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['name'].message}
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
                label="Phone"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="phoneNumber"
          />
          {errors['phoneNumber'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['phoneNumber'].message}
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
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
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
      </AppContainer>
    </BaseView>
  );
};

export { Register };
