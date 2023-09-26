import axios from 'axios';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { Button, DataTable, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import { getError } from 'core/helpers/getError';

export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  currentSalary?: number;
}

const HomeUser = (): ReactElement => {
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(moment());
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const userId = useRoute().params?.userId;

  useEffect(() => {
    getAttendances();
  }, [date]);

  const getAttendances = async () => {
    try {
      setLoading(true);
      const from = date.clone().startOf('months');
      const to = date.clone().endOf('months');
      const res = await axios.get('/attendance', {
        params: {
          from,
          to,
          userId,
        },
      });
      const result = [];
      const resData = res.data?.attendances;
      for (let i = 0; i <= to.diff(from, 'day'); i++) {
        const currentDate = from.clone().add(i, 'day');
        let data = {
          date: currentDate,
        };
        if (resData?.length > 0) {
          if (currentDate.isSame(moment(resData[0].date), 'day')) {
            data = { ...data, ...resData[0] };
            resData.shift();
          }
        }
        result.push(data);
      }
      setData(result);
    } catch (error) {
      getError(error);
    } finally {
      setLoading(false);
    }
  };

  const onValueChange = (event, newDate) => {
    switch (event) {
      case 'dateSetAction':
        const selectedDate = newDate || date;
        setDate(moment(selectedDate));
        setShow(false);
      case 'dismissedAction':
        setShow(false);
    }
  };

  const getWorkSession = (workSession: string) => {
    switch (workSession) {
      case '10':
        return 'Sáng';
      case '01':
        return 'Chiều';
      case '11':
        return 'Cả ngày';
      default:
        return '';
    }
  };

  return (
    <BaseView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Chấm công chi tiết" />
      <DataTable style={{ flex: 1 }}>
        <Button onPress={() => setShow(true)}>{date.format('YYYY/MM')}</Button>
        <FlatList
          data={data}
          refreshing={loading}
          renderItem={({ item: attendance }) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>
                  {moment(attendance.date).format('MM/DD')}
                </DataTable.Cell>
                <DataTable.Cell>
                  {attendance.checkInTime
                    ? moment(attendance.checkInTime).format('HH:mm')
                    : ''}
                </DataTable.Cell>
                <DataTable.Cell>
                  {attendance.checkOutTime
                    ? moment(attendance.checkOutTime).format('HH:mm')
                    : ''}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>
                  {`${getWorkSession(attendance.workSession)}${
                    attendance.latePenalty > 0
                      ? ' M:' + attendance.latePenalty
                      : ''
                  }`}
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getAttendances}
          keyExtractor={attendance => attendance._id}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title>Ngày</DataTable.Title>
              <DataTable.Title>Vào</DataTable.Title>
              <DataTable.Title>Ra</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Số công</DataTable.Title>
            </DataTable.Header>
          )}
        />
      </DataTable>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date.toDate()}
          maximumDate={moment().toDate()}
        />
      )}
    </BaseView>
  );
};

export { HomeUser };
