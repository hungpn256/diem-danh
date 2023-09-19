import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { useRoute } from '@react-navigation/native';
import { User } from 'screens/Home';
import { regexPhoneNumber } from 'screens/Register';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập'),
  email: yup.string().email('Nhập đúng định dạng email'),
  phoneNumber: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPhoneNumber, 'Điền đúng định dạng số điện thoại'),
  _id: yup.string(),
});

export const AddUser = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });
  const params = useRoute().params as any;
  const user = params?.user as User;
  const getUser = params?.getUser as any;
  const isEditing = !!params?.user;

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      if (!isEditing) {
        await axios.post('/user/add-user', {
          ...data,
          role: 'user',
        });
        await getUser();
      } else {
        await axios.put('/user/' + user._id, {
          ...data,
        });
        await getUser();
      }
      NavigationService.back();
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };

  return (
    <AppContainer scrollEnabled={false}>
      <Header title={isEditing ? 'Chỉnh sửa' : 'Thêm nhân viên'} />
      <ScrollView>
        <BaseView style={{ padding: 10, paddingVertical: 50 }}>
          {isEditing && (
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
                  label="ID"
                  mode="outlined"
                  keyboardType="name-phone-pad"
                  disabled={isEditing}
                />
              )}
              name="_id"
              defaultValue={user?._id}
              disabled={isEditing}
            />
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
                value={value}
                style={{ marginVertical: 10 }}
                label="Email"
                mode="outlined"
                keyboardType="name-phone-pad"
                disabled={isEditing}
              />
            )}
            name="email"
            defaultValue={user?.email}
            disabled={isEditing}
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
            defaultValue={user?.name}
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
            defaultValue={user?.phoneNumber}
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
            {isEditing ? 'Chỉnh sửa' : 'Đăng Ký'}
          </Button>
          {isEditing && (
            <Button
              style={{ margin: 10 }}
              mode="contained"
              onPress={() => {
                NavigationService.navigate(ScreenConst.QR_CODE_SCREEN, {
                  user,
                });
              }}
              disabled={Object.keys(errors).length > 0}
            >
              Mã QR đăng nhập
            </Button>
          )}
        </BaseView>
      </ScrollView>
    </AppContainer>
  );
};
