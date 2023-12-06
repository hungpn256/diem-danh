import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  AnimatedFAB,
  Button,
  DataTable,
  Searchbar,
  useTheme,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from 'react-native-wheel-pick';
import { IDepartment } from 'screens/Department';
import { BaseTouch } from 'components/atoms/BaseTouch';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';
import { useAppInfo } from 'context/AppInfo';

export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  currentSalary?: number;
  department?: IDepartment;
  role: 'admin' | 'user';
  managedBy?: any;
}

const Home = (): ReactElement => {
  const [isExtended, setIsExtended] = React.useState(true);
  const fabStyle = { right: 16 };
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { departments } = useAppInfo();
  const departmentsPicker = departments.map(item => ({
    value: item._id,
    label: item.name,
  }));
  const [visible, setVisible] = useState(false);
  const [valuePicker, setValuePicker] = useState('');
  const [departmentPicked, setDepartmentPicked] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      getUser(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery, departmentPicked]);

  useEffect(() => {
    if (visible) {
      setValuePicker(departmentPicked || departmentsPicker?.[0]?.value);
    }
  }, [visible]);

  const theme = useTheme();

  const [users, setUsers] = useState<User[]>([]);

  const getUser = async (txtSearch: string) => {
    try {
      setLoading(true);
      const res = await axios.get('/user/get-user-managed', {
        params: { txtSearch, department: departmentPicked },
      });
      setUsers(res.data.users);
    } catch (error) {
      getError(error);
    } finally {
      setLoading(false);
    }
  };

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <BaseView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Danh sách nhân viên" />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginHorizontal: 10, marginVertical: 10 }}
      />
      <Button onPress={() => setVisible(true)}>
        Theo phòng ban{' '}
        {departments.find(item => item._id === departmentPicked)?.name}
      </Button>
      <DataTable style={{ flex: 1 }}>
        <FlatList
          data={users}
          refreshing={loading}
          renderItem={({ item: user }) => {
            return (
              <DataTable.Row key={user._id}>
                <DataTable.Cell style={{ flex: 3 }}>
                  {user.email}
                </DataTable.Cell>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseTouch
                      onPress={() => {
                        NavigationService.navigate(
                          ScreenConst.ADD_USER_SCREEN,
                          { user, getUser },
                        );
                      }}
                    >
                      <MaterialIcons
                        name="edit"
                        style={{ fontSize: 24, padding: 4 }}
                        color={theme.colors.backdrop}
                      />
                    </BaseTouch>
                    {/* <BaseTouch onPress={() => {}}>
                      <MaterialIcons
                        name="delete"
                        style={{ fontSize: 24, padding: 4 }}
                        color={theme.colors.error}
                      />
                    </BaseTouch> */}
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getUser}
          keyExtractor={user => user._id}
          onScroll={onScroll}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title style={{ flex: 3 }}>Email</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Hành động</DataTable.Title>
            </DataTable.Header>
          )}
        />
      </DataTable>
      <AnimatedFAB
        icon={'plus'}
        label={'Thêm mới'}
        extended={isExtended}
        onPress={() =>
          NavigationService.navigate(ScreenConst.ADD_USER_SCREEN, { getUser })
        }
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle, fabStyle]}
      />
      <Modal transparent visible={visible} animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: '#00000010' }}
          onPress={() => setVisible(false)}
        />
        <Picker
          style={{ backgroundColor: 'white' }}
          selectedValue={departmentPicked}
          pickerData={[...departmentsPicker, { value: '', label: 'bỏ chọn' }]}
          onValueChange={value => {
            setValuePicker(value);
          }}
        />
        <View style={{ backgroundColor: '#fff' }}>
          <Button
            style={{ marginBottom: 34 }}
            onPress={() => {
              setVisible(false);
              setDepartmentPicked(valuePicker as string);
            }}
          >
            OK
          </Button>
        </View>
      </Modal>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});

export { Home };
