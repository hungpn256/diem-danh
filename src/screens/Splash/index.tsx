import axios from 'axios';
import { changeLanguage } from 'i18next';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseText } from 'components/atoms/BaseText';
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
  return <BaseView></BaseView>;
};

export { Splash };
