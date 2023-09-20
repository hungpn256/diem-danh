import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import { styles } from './styles';

const Service = (): ReactElement => {
  return (
    <BaseView style={{ flex: 1 }}>
      <Header title="Dịch vụ" />
      <AppContainer style={styles.container}>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          QR chấm công
        </Button>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Phiếu bổ xung công
        </Button>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Phiếu đăng ký nghỉ phép
        </Button>
      </AppContainer>
    </BaseView>
  );
};

export { Service };
