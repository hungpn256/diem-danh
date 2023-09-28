import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { AppContainer } from 'components/molecules/AppContainer';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';

const Profile = (): ReactElement => {
  return (
    <AppContainer isSafeView>
      <Button
        mode="contained"
        onPress={async () => {
          await StorageService.removeMulti(Object.keys(StorageConst));
          NavigationService.reset(ScreenConst.CHOOSE_ROLE_SCREEN);
        }}
      >
        Đăng xuất2
      </Button>
    </AppContainer>
  );
};

export { Profile };
