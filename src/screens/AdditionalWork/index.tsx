import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
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
import { getStatus } from 'screens/AdditionalWorkList';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { useAppInfo } from 'context/AppInfo';

export const schemaRegister = yup.object().shape({
  reason: yup.string().required('Bắt buộc nhập'),
  date: yup.string().required('Bắt buộc nhập'),
  time: yup.string().required('Bắt buộc nhập'),
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
    trigger,
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const params = useRoute().params as any;
  const isAdditionalWork = !!params?.isAdditionalWork;
  const leaveRequest = params?.leaveRequest;
  const getData = params?.getData;
  const { user, getUser } = useAppInfo();

  const onSubmit = async (data: any) => {
    try {
      LoadingView.show();
      const leaveOff = data.time === '11' ? 1 : 0.5;
      if (!isAdditionalWork) {
        if (user.numOfDaysOff < leaveOff) {
          Alert.alert('Nghỉ phép', 'Số ngày nghỉ phép còn lại không đủ');
          return;
        }
      }
      await axios.post('/attendance/additional-work', {
        ...data,
        type: isAdditionalWork ? 'ADDITIONAL' : 'LEAVE',
      });
      await getData?.();
      await getUser?.();
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
          {user.role === 'admin' && (
            <TextInput
              style={{ marginVertical: 10 }}
              label="Người tạo"
              mode="outlined"
              value={user.email}
              editable={false}
              autoCapitalize="none"
            />
          )}
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
                editable={!leaveRequest}
                autoCapitalize="none"
              />
            )}
            name="date"
            defaultValue={
              leaveRequest?.date
                ? moment(leaveRequest?.date).format('YYYY/MM/DD')
                : ''
            }
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
                  onPress={() => {
                    if (!leaveRequest) {
                      setValue('time', '10');
                      trigger('time');
                    }
                  }}
                  style={{ marginRight: 10 }}
                  selected={value === '10'}
                >
                  Sáng
                </Chip>
                <Chip
                  onPress={() => {
                    if (!leaveRequest) {
                      setValue('time', '01');
                      trigger('time');
                    }
                  }}
                  style={{ marginRight: 10 }}
                  selected={value === '01'}
                >
                  Chiều
                </Chip>
                <Chip
                  onPress={() => {
                    if (!leaveRequest) {
                      setValue('time', '11');
                      trigger('time');
                    }
                  }}
                  selected={value === '11'}
                >
                  Cả ngày
                </Chip>
              </View>
            )}
            name="time"
            defaultValue={leaveRequest?.time}
          />
          {errors['time'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['time'].message}
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
                editable={!leaveRequest}
                autoCapitalize="none"
              />
            )}
            name="reason"
            defaultValue={leaveRequest?.reason}
          />
          {errors['reason'] && (
            <Text variant="labelSmall" style={{ color: theme.colors.error }}>
              {errors['reason'].message}
            </Text>
          )}

          {leaveRequest && (
            <Chip
              ellipsizeMode="tail"
              style={{
                backgroundColor:
                  leaveRequest.status === 'PENDING'
                    ? 'orange'
                    : leaveRequest.status === 'ACCEPTED'
                    ? 'green'
                    : 'red',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                alignSelf: 'flex-start',
              }}
              textStyle={{
                color: 'white',
              }}
            >
              {getStatus(leaveRequest.status)}
            </Chip>
          )}
          {!leaveRequest && !isAdditionalWork && (
            <Text variant="labelSmall">
              {`Số ngày nghỉ phép còn lại: ${user.numOfDaysOff}`}
            </Text>
          )}
          <Divider style={{ margin: 50 }} />
          {!leaveRequest && (
            <Button
              style={{ margin: 10 }}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={Object.keys(errors).length > 0}
            >
              {isAdditionalWork ? 'Bổ sung công' : 'Đăng ký nghỉ phép'}
            </Button>
          )}

          {user?.role === 'admin' && leaveRequest.status === 'PENDING' && (
            <>
              <Button
                style={{ margin: 10 }}
                mode="contained"
                onPress={async () => {
                  try {
                    LoadingView.show();
                    await axios.put(
                      '/attendance/additional-work/' + leaveRequest._id,
                      {
                        status: 'ACCEPTED',
                      },
                    );
                    await getData?.();
                    NavigationService.back();
                  } catch (e) {
                    getError(e);
                  } finally {
                    LoadingView.hide();
                  }
                }}
                disabled={Object.keys(errors).length > 0}
              >
                Chấp nhận
              </Button>
              <Button
                style={{ margin: 10 }}
                mode="contained"
                onPress={async () => {
                  try {
                    LoadingView.show();
                    await axios.put(
                      '/attendance/additional-work/' + leaveRequest._id,
                      {
                        status: 'REJECTED',
                      },
                    );
                    await getData?.();
                    NavigationService.back();
                  } catch (e) {
                    getError(e);
                  } finally {
                    LoadingView.hide();
                  }
                }}
                disabled={Object.keys(errors).length > 0}
                buttonColor={theme.colors.error}
              >
                Từ chối
              </Button>
            </>
          )}
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
          trigger('date');
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
