import React, { ReactElement } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { AnimatedFAB, DataTable, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BaseTouch } from 'components/atoms/BaseTouch';
import { BaseView } from 'components/atoms/BaseView';
import Header from 'components/organisms/Header';
import { NavigationService } from 'services/NavigationService';
import { getError } from 'core/helpers/getError';
import { ScreenConst } from 'consts/ScreenConst';

export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  currentSalary?: number;
}

const HomeUser = (): ReactElement => {
  const [isExtended, setIsExtended] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const fabStyle = { right: 16 };
  const theme = useTheme();

  const getUser = async () => {
    try {
      setLoading(true);
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
      <Header title="Chấm công chi tiết" />
      <DataTable style={{ flex: 1 }}>
        <FlatList
          data={[]}
          refreshing={loading}
          renderItem={({ item: user }) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{user.email}</DataTable.Cell>
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
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
          onRefresh={getUser}
          // keyExtractor={user => user._id}
          onScroll={onScroll}
          style={{ flex: 1 }}
          ListHeaderComponent={() => (
            <DataTable.Header>
              <DataTable.Title>Ngày</DataTable.Title>
              <DataTable.Title>Vào</DataTable.Title>
              <DataTable.Title>Ra</DataTable.Title>
              <DataTable.Title>Số công</DataTable.Title>
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

export { HomeUser };
