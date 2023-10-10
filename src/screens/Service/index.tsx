import moment from 'moment';
import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import Header from 'components/organisms/Header';
import { NavigationService } from 'services/NavigationService';
import { ScreenConst } from 'consts/ScreenConst';
import { styles } from './styles';

const Service = (): ReactElement => {
  return (
    <BaseView style={{ flex: 1 }}>
      <Header title="Dịch vụ" />
      <AppContainer style={styles.container}>
        <Button
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
          onPress={() => {
            NavigationService.navigate(ScreenConst.QR_CODE_ATTENTION_SCREEN);
          }}
        >
          QR chấm công
        </Button>
        <Button
          onPress={() => {
            NavigationService.navigate(
              ScreenConst.ADDITIONAL_WORK_LIST_SCREEN,
              {
                isAdditionalWork: true,
              },
            );
          }}
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Phiếu bổ sung công
        </Button>
        <Button
          onPress={() => {
            NavigationService.navigate(
              ScreenConst.ADDITIONAL_WORK_LIST_SCREEN,
              {
                isAdditionalWork: false,
              },
            );
          }}
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Phiếu đăng ký nghỉ phép
        </Button>
        <Button
          onPress={() => {
            NavigationService.navigate(ScreenConst.SALARY_SCREEN);
          }}
          mode="elevated"
          style={{ borderRadius: 8, padding: 10, margin: 30, marginBottom: 0 }}
        >
          Lương nhân viên tháng {moment().get('month')}
        </Button>
      </AppContainer>
    </BaseView>
  );
};

export { Service };
