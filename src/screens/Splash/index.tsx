import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';

const Splash = (): ReactElement => {
  useEffect(() => {
    const getToken = async (): Promise<any> => {
      try {
        const token = await StorageService.get(StorageConst.TOKEN);
        if (token) {
          await axios.get('/user/profile');
          NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
        } else {
          NavigationService.reset(ScreenConst.CHOOSE_ROLE_SCREEN);
        }
      } catch (err) {
        NavigationService.reset(ScreenConst.CHOOSE_ROLE_SCREEN);
      }
    };
    getToken();
  }, []);
  return (
    <BaseView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text variant="displayLarge">Thằng Chiến ngu</Text>
    </BaseView>
  );
};

export { Splash };
