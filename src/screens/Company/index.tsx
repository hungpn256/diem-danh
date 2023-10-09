import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { useAppInfo } from 'context/AppInfo';

export const schemaRegisterCompany = yup.object().shape({
  name: yup.string().required(),
  morningStartTime: yup.number().required(),
  morningEndTime: yup.number().required(),
  afternoonStartTime: yup.number().required(),
  afternoonEndTime: yup.number().required(),
});

export const Company = () => {
  const theme = useTheme();
  const { getUser, user } = useAppInfo();
  const company = user.managedBy;
  const isEditing = !!company;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegisterCompany) });

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      if (
        data.morningStartTime < data.morningEndTime &&
        data.morningEndTime < data.afternoonStartTime &&
        data.afternoonStartTime < data.afternoonEndTime
      ) {
        if (isEditing) {
          await axios.put('/company/' + company._id, data);
        } else {
          await axios.post('/company', data);
        }
        await getUser();
        NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
      } else {
        Alert.alert('Lỗi', 'Thời gian không đúng');
      }
    } catch (error) {
      getError(error);
    } finally {
      LoadingView.hide();
    }
  };

  return (
    <AppContainer scrollEnabled={false} isKeyboardAvoidingView>
      <Header title={isEditing ? 'Chỉnh sửa' : 'Công ty'} />
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
                label="Name"
                mode="outlined"
              />
            )}
            name="name"
            defaultValue={company?.name ?? ''}
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
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? `${value}` : ''}
                style={{ marginVertical: 10 }}
                label="Thời gian bắt đầu ca sáng"
                mode="outlined"
                placeholder="vd: 8.5"
              />
            )}
            name="morningStartTime"
            defaultValue={company?.morningStartTime ?? ''}
          />
          {errors['morningStartTime'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['morningStartTime'].message}
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
                label="Thời gian kết thúc ca sáng"
                mode="outlined"
                placeholder="vd: 8.5"
              />
            )}
            name="morningEndTime"
            defaultValue={company?.morningEndTime ?? ''}
          />
          {errors['morningEndTime'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['morningEndTime'].message}
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
                label="Thời gian bắt đầu ca chiều"
                mode="outlined"
                placeholder="vd: 8.5"
              />
            )}
            name="afternoonStartTime"
            defaultValue={company?.afternoonStartTime ?? ''}
          />
          {errors['afternoonStartTime'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['afternoonStartTime'].message}
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
                label="Thời gian kết thúc ca chiều"
                mode="outlined"
                placeholder="vd: 8.5"
              />
            )}
            name="afternoonEndTime"
            defaultValue={company?.afternoonEndTime ?? ''}
          />
          {errors['afternoonEndTime'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['afternoonEndTime'].message}
            </Text>
          )}

          <Divider style={{ margin: 50 }} />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
            {isEditing ? 'Chỉnh sửa' : 'Tạo mới'}
          </Button>
        </BaseView>
      </ScrollView>
    </AppContainer>
  );
};
