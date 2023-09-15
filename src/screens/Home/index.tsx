import React, { ReactElement } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { AnimatedFAB, Appbar, DataTable, Searchbar } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';

const Home = (): ReactElement => {
  const [isExtended, setIsExtended] = React.useState(true);

  const fabStyle = { right: 16 };
  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <BaseView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Danh sách người dùng" />
      </Appbar.Header>
      <AppContainer onScroll={onScroll} style={{ flex: 1 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ marginHorizontal: 10, marginBottom: 10 }}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Hoạt động</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Hung</DataTable.Cell>
            <DataTable.Cell>Hung</DataTable.Cell>
            <DataTable.Cell>Hung</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </AppContainer>
      <AnimatedFAB
        icon={'plus'}
        label={'Thêm mới'}
        extended={isExtended}
        onPress={() => console.log('Pressed')}
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

export { Home };
