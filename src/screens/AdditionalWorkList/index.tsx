import axios from 'axios';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { AnimatedFAB, Button, Chip, DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { useAppInfo } from 'context/AppInfo';

const AdditionalWorkList = (): ReactElement => {
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(moment());
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useAppInfo();
  const params = useRoute().params as any;
  const isAdditionalWork = !!params?.isAdditionalWork;
  const userId = params?.userId || user._id;

  const [isExtended, setIsExtended] = React.useState(true);
  const fabStyle = { right: 16 };

  useEffect(() => {
    getData();
  }, [date]);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const from = date.clone().startOf('months');
      const to = date.clone().endOf('months');
      const res = await axios.get('/attendance/additional-work', {
        params: {
          where: {
            date: {
              $gte: from,
              $lte: to,
            },
            userId,
            type: isAdditionalWork ? 'ADDITIONAL' : 'LEAVE',
          },
          sort: {
            createdAt: 'ascending',
          },
        },
      });
      const resData = res.data?.leaveRequests;
      setData(resData);
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

  const getStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'ACCEPTED':
        return 'Đã xác nhận';
      case 'REJECTED':
        return 'Huỷ bỏ';
      default:
        return '';
    }
  };

  return (
    <BaseView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={isAdditionalWork ? 'Bổ sung công' : 'Nghỉ phép'} />
      <DataTable style={{ flex: 1 }}>
        <Button onPress={() => setShow(true)}>{date.format('YYYY/MM')}</Button>
        <FlatList
          onScroll={onScroll}
          data={data}
          refreshing={loading}
          renderItem={({ item: leaveRequest }) => {
            return (
              <DataTable.Row
                onPress={() => {
                  NavigationService.navigate(
                    ScreenConst.ADDITIONAL_WORK_SCREEN,
                    {
                      leaveRequest,
                      isAdditionalWork,
                      getData,
                    },
                  );
                }}
              >
                <DataTable.Cell>
                  {moment(leaveRequest.date).format('MM/DD')}
                </DataTable.Cell>
                <DataTable.Cell>
                  {`${getWorkSession(leaveRequest.time)}`}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>
                  {
                    <Chip
                      ellipsizeMode="middle"
                      style={{
                        backgroundColor:
                          leaveRequest.status === 'PENDING'
                            ? 'orange'
                            : leaveRequest.status === 'ACCEPTED'
                            ? 'green'
                            : 'red',
                      }}
                      textStyle={{ color: 'white' }}
                    >
                      {getStatus(leaveRequest.status)}
                    </Chip>
                  }
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getData}
          keyExtractor={attendance => attendance._id}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title>Ngày</DataTable.Title>
              <DataTable.Title>Thời gian</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Trạng thái</DataTable.Title>
            </DataTable.Header>
          )}
        />
      </DataTable>
      <AnimatedFAB
        icon={'plus'}
        label={'Thêm mới'}
        extended={isExtended}
        onPress={() =>
          NavigationService.navigate(ScreenConst.ADDITIONAL_WORK_SCREEN, {
            isAdditionalWork,
            getData,
          })
        }
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle, fabStyle]}
      />

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date.toDate()}
          maximumDate={moment().toDate()}
          locale="vi"
        />
      )}
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 50,
    right: 16,
    position: 'absolute',
  },
});

export { AdditionalWorkList };
