import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Alert } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { regexPassword } from 'screens/Register';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { useAppInfo } from 'context/AppInfo';

export const forgotPasswordSchema = yup.object().shape({
  password: yup.string().required().matches(regexPassword),
  newPassword: yup.string().required().matches(regexPassword),
  rePassword: yup.string().required().matches(regexPassword),
});

export const ForgotPassword = () => {
  const theme = useTheme();
  const { getUser, user } = useAppInfo();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const onSubmit = async (data: any) => {
    try {
      if (data.newPassword !== data.rePassword) {
        Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
        return;
      }
      LoadingView.show();
      await axios.post('/user/change-password', data);
      await getUser();
      NavigationService.back();
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };

  return (
    <AppContainer scrollEnabled={false} isKeyboardAvoidingView>
      <Header title="Quên mật khẩu" />
      <ScrollView>
        <BaseView style={{ padding: 10, paddingVertical: 50 }}>
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
                label="Mật khẩu cũ"
                mode="outlined"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors['password'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['password'].message}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? `${value}` : ''}
                style={{ marginVertical: 10 }}
                label="Mật khẩu mới"
                mode="outlined"
                secureTextEntry
              />
            )}
            name="newPassword"
          />
          {errors['newPassword'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['newPassword'].message}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? `${value}` : ''}
                style={{ marginVertical: 10 }}
                label="Nhập lại mật khẩu mới"
                mode="outlined"
                secureTextEntry
              />
            )}
            name="rePassword"
          />
          {errors['rePassword'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['rePassword'].message}
            </Text>
          )}

          <Divider style={{ margin: 50 }} />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
            {'Chỉnh sửa'}
          </Button>
        </BaseView>
      </ScrollView>
    </AppContainer>
  );
};
