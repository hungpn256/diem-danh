import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';

export const schemaRegister = yup.object().shape({
  email: yup.string(),
});

export const Company = () => {
  const isEditing = false;
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      await axios.post('/company', {
        name: 'company-name',
        morningStartTime: 8.5,
        morningEndTime: 12,
        afternoonStartTime: 13.5,
        afternoonEndTime: 17.5,
      });
      NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
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
          {/* <Controller
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
          )} */}

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
