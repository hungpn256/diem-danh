import axios from 'axios';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Button,
  Chip,
  Divider,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
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

export const schemaRegister = yup.object().shape({
  reason: yup.string().required('Bắt buộc nhập'),
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

export const AdditionalWork = () => {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // resolver: yupResolver(schemaRegister),
  });
  const params = useRoute().params as any;
  const user = params?.user as User;
  const getUser = params?.getUser as any;
  const isAdditionalWork = !!params?.user;

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
    <AppContainer scrollEnabled={false} isKeyboardAvoidingView>
      <Header title={isAdditionalWork ? 'Bổ sung công' : 'Đăng ký nghỉ phép'} />
      <ScrollView>
        <BaseView style={{ padding: 10, paddingVertical: 50 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ marginVertical: 10 }}
                label="Ngày"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onFocus={() => {
                  setOpen(true);
                }}
                ref={inputRef}
              />
            )}
            name="date"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}
              >
                <Chip
                  onPress={() => setValue('time', '10')}
                  style={{ marginRight: 10 }}
                  selected={value === '10'}
                >
                  Sáng
                </Chip>
                <Chip
                  onPress={() => setValue('time', '01')}
                  style={{ marginRight: 10 }}
                  selected={value === '01'}
                >
                  Chiều
                </Chip>
                <Chip
                  onPress={() => setValue('time', '11')}
                  selected={value === '11'}
                >
                  Cả ngày
                </Chip>
              </View>
            )}
            name="time"
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
                label="Lý do"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
              />
            )}
            name="reason"
            defaultValue={user?.reason}
          />
          {errors['reason'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['reason'].message}
            </Text>
          )}
          <Divider style={{ margin: 50 }} />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
            {isAdditionalWork ? 'Bổ sung công' : 'Đăng ký nghỉ phép'}
          </Button>
        </BaseView>
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setValue('date', moment(date).format('YYYY/MM/DD'));
          inputRef.current?.blur?.();
        }}
        onCancel={() => {
          setOpen(false);
          inputRef.current?.blur?.();
        }}
        mode="date"
        maximumDate={
          isAdditionalWork
            ? moment().startOf('day').subtract(1, 'day').toDate()
            : undefined
        }
        minimumDate={
          !isAdditionalWork ? moment().startOf('day').toDate() : undefined
        }
      />
    </AppContainer>
  );
};
