import axios from 'axios';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  Alert,
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
  TextInput,
  useTheme,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BaseTouch } from 'components/atoms/BaseTouch';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import { getError } from 'core/helpers/getError';
import { useAppInfo } from 'context/AppInfo';

export interface IDepartment {
  _id: string;
  name: string;
}

const Department = (): ReactElement => {
  const [isExtended, setIsExtended] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const fabStyle = { right: 16 };
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const [name, setName] = useState('');
  const currentIdEdit = useRef('');
  const { departments, getDepartment: getDepartmentAppInfo } = useAppInfo();

  useEffect(() => {
    if (!visible) {
      currentIdEdit.current = '';
      setName('');
    }
  }, [visible]);

  const onCreateDepartment = async (): Promise<void> => {
    try {
      setLoading(true);
      if (currentIdEdit.current) {
        await axios.put('/company/department/' + currentIdEdit.current, {
          name,
        });
      } else {
        await axios.post('/company/department', { name });
      }
      await getDepartment();
      setVisible(false);
    } catch (error) {
      getError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteDepartment = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await axios.delete('/company/department/' + id);
      await getDepartment();
      setVisible(false);
    } catch (error) {
      getError(error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartment = async () => {
    try {
      setLoading(true);
      await getDepartmentAppInfo();
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

  return (
    <BaseView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Danh sách bộ phận" />
      <DataTable style={{ flex: 1 }}>
        <FlatList
          data={departments}
          refreshing={loading}
          renderItem={({ item: department }) => {
            return (
              <DataTable.Row key={department._id}>
                <DataTable.Cell style={{ flex: 3 }}>
                  {department.name}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BaseTouch
                      onPress={() => {
                        currentIdEdit.current = department._id;
                        setName(department.name);
                        setVisible(true);
                      }}
                    >
                      <MaterialIcons
                        name="edit"
                        style={{ fontSize: 24, padding: 4 }}
                        color={theme.colors.backdrop}
                      />
                    </BaseTouch>
                    <BaseTouch
                      onPress={() => {
                        Alert.alert(
                          'Xoá bộ phận',
                          'Bạn có chắc chắn muốn xoá bộ phận không?',
                          [
                            { isPreferred: true, text: 'Huỷ', style: 'cancel' },
                            {
                              isPreferred: true,
                              text: 'OK',
                              style: 'destructive',
                              onPress: () => {
                                onDeleteDepartment(department._id);
                              },
                            },
                          ],
                        );
                      }}
                    >
                      <MaterialIcons
                        name="delete"
                        style={{ fontSize: 24, padding: 4 }}
                        color={theme.colors.error}
                      />
                    </BaseTouch>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getDepartment}
          keyExtractor={user => user._id}
          onScroll={onScroll}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title style={{ flex: 3 }}>Tên</DataTable.Title>
              <DataTable.Title>Hành động</DataTable.Title>
            </DataTable.Header>
          )}
        />
      </DataTable>
      <AnimatedFAB
        icon={'plus'}
        label={'Thêm mới'}
        extended={isExtended}
        onPress={() => setVisible(true)}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle, fabStyle]}
      />
      <Modal visible={visible} transparent>
        <Pressable
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#00000010',
          }}
          onPress={e => {
            setVisible(false);
          }}
        >
          <Pressable
            onPress={e => {
              e.stopPropagation();
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                margin: 10,
                borderRadius: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                autoFocus
                label={'Tên bộ phận'}
                defaultValue={name}
              />
              <Button loading={loading} onPress={onCreateDepartment}>
                {currentIdEdit.current ? 'Chỉnh sửa' : 'Tạo mới'}
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 40,
    right: 16,
    position: 'absolute',
  },
});

export { Department };
