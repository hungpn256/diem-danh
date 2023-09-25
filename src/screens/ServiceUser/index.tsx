import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import { styles } from './styles';

const ServiceUser = (): ReactElement => {
  return (
    <BaseView style={{ flex: 1 }}>
      <Header title="Dịch vụ" />
      <AppContainer style={styles.container}>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Bổ sung công
        </Button>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Đăng ký nghỉ phép
        </Button>
      </AppContainer>
    </BaseView>
  );
};

export { ServiceUser };
