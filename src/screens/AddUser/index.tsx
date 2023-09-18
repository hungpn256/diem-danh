import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { regexPhoneNumber } from 'screens/Register';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập'),
  email: yup.string().email('Nhập đúng định dạng email'),
  phoneNumber: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPhoneNumber, 'Điền đúng định dạng số điện thoại'),
});

export const AddUser = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      await axios.post('/user/add-user', {
        ...data,
        role: 'user',
      });
      NavigationService.back();
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };
  return (
    <AppContainer scrollEnabled={false}>
      <Header title="Thêm nhân viên" />
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
                label="Email"
                mode="outlined"
                keyboardType="name-phone-pad"
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
                keyboardType="name-phone-pad"
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
                keyboardType="name-phone-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors['phoneNumber'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['phoneNumber'].message}
            </Text>
          )}
          <Divider style={{ margin: 50 }} />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
            Đăng Ký
          </Button>
        </BaseView>
      </ScrollView>
    </AppContainer>
  );
};
