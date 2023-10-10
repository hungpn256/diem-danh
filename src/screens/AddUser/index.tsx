import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
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
import { formatMoney } from 'core/helpers/formatMoney';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { useAppInfo } from 'context/AppInfo';

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập'),
  email: yup.string().email('Nhập đúng định dạng email'),
  phoneNumber: yup
    .string()
    .required('Bắt buộc nhập')
    .matches(regexPhoneNumber, 'Điền đúng định dạng số điện thoại'),
  currentSalary: yup
    .number()
    .typeError('Chỉ được nhập số')
    .required('Bắt buộc nhập')
    .min(0, 'Lương lớn hơn 0'),
  _id: yup.string(),
});

export const AddUser = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schemaRegister) });
  const { user: me } = useAppInfo();
  const params = useRoute().params as any;
  const user = params?.user as User | undefined;
  const getUser = params?.getUser as any;
  const isEditing = !!params?.user;
  const isMe = user?._id === me._id;

  useEffect(() => {
    setValue('currentSalary', user?.currentSalary ?? 0);
    trigger('currentSalary');
  }, []);

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
        await axios.put('/user/' + user?._id, {
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
    <AppContainer scrollEnabled={false} isKeyboardAvoidingView>
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
          {!isMe && (
            <>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ marginVertical: 10 }}
                    label="Lương"
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={text => {
                      onChange(text.replace(/,/g, ''));
                    }}
                    value={`${formatMoney(value)}`}
                  />
                )}
                name="currentSalary"
                defaultValue={user?.currentSalary || 0}
              />
              {errors['currentSalary'] && (
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.error }}
                >
                  {errors['currentSalary'].message}
                </Text>
              )}
            </>
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
          {isEditing && !isMe && (
            <>
              <Button
                style={{ margin: 10 }}
                mode="contained"
                onPress={async () => {
                  try {
                    LoadingView.show();
                    await axios.post('/user/create-password', {
                      email: user?.email,
                    });
                    Alert.alert('Thành công', 'Mật khẩu đã được gửi về mail');
                  } catch (error) {
                    getError(error);
                  } finally {
                    LoadingView.hide();
                  }
                }}
              >
                Mã QR đăng nhập
              </Button>
              <Button
                style={{ margin: 10 }}
                mode="contained"
                onPress={() => {
                  NavigationService.navigate(ScreenConst.HOME_USER_SCREEN, {
                    userId: user?._id,
                  });
                }}
              >
                Chấm công chi tiết
              </Button>
            </>
          )}
        </BaseView>
      </ScrollView>
    </AppContainer>
  );
};
