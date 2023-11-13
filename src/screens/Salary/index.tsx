import axios from 'axios';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { Button, DataTable } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import LoadingView from 'components/organisms/LoadingView';
import { formatMoney } from 'core/helpers/formatMoney';
import { getError } from 'core/helpers/getError';

const Salary = (): ReactElement => {
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(moment());
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [salaryClosed, setSalaryClosed] = useState(true);

  useEffect(() => {
    getData();
  }, [date]);

  const getData = async () => {
    try {
      setLoading(true);
      const from = date.clone().startOf('months');
      const to = date.clone().endOf('months');
      const res = await axios.get('/attendance/salary', {
        params: {
          from,
          to,
        },
      });
      const resData = res.data.result;
      setData(resData);
      setSalaryClosed(res.data.salaryClosed ?? true);
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

  return (
    <BaseView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={'Lương'} />
      <DataTable style={{ flex: 1 }}>
        <Button onPress={() => setShow(true)}>{date.format('YYYY/MM')}</Button>
        <FlatList
          data={data}
          refreshing={loading}
          renderItem={({ item: dataUser }) => {
            return (
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 1.5 }}>
                  {dataUser.user?.email}
                </DataTable.Cell>
                <DataTable.Cell>{dataUser.user?.name}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 0.5 }}>
                  {dataUser.workDayValid}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {formatMoney(Math.round(dataUser.salary))}
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getData}
          keyExtractor={dataUser => dataUser._id}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1.5 }}>Email</DataTable.Title>
              <DataTable.Title>Tên</DataTable.Title>
              <DataTable.Title style={{ flex: 0.5 }}>Số công</DataTable.Title>
              <DataTable.Title numeric>Lương</DataTable.Title>
            </DataTable.Header>
          )}
        />
      </DataTable>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date.toDate()}
          maximumDate={moment().toDate()}
          locale="vi"
        />
      )}

      {!salaryClosed && moment().isSame(moment(date), 'month') && (
        <Button
          style={{ position: 'absolute', bottom: 30, left: 50, right: 50 }}
          mode="contained"
          onPress={async () => {
            try {
              LoadingView.show();
              await axios.post('/attendance/salary-closed', {
                from: moment(date).startOf('month'),
                to: moment(date).endOf('month'),
              });
              setSalaryClosed(true);
            } catch (e) {
              getError(e);
            } finally {
              LoadingView.hide();
            }
          }}
        >
          Chốt lương
        </Button>
      )}
    </BaseView>
  );
};

export { Salary };
