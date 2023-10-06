import React, { ReactElement, useEffect } from 'react';
import { BaseView } from 'components/atoms/BaseView';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { ScreenConst } from 'consts/ScreenConst';
import { StorageConst } from 'consts/StorageConst';
import { useAppInfo } from 'context/AppInfo';

const Splash = (): ReactElement => {
  const { getUser } = useAppInfo();
  useEffect(() => {
    const getToken = async (): Promise<any> => {
      try {
        const token = await StorageService.get(StorageConst.TOKEN);
        if (token) {
          const data = await getUser();
          if (data.user.role === 'admin' && !data.user.managedBy) {
            NavigationService.reset(ScreenConst.ADD_COMPANY_SCREEN);
          } else {
            NavigationService.reset(ScreenConst.MAIN_TAB_BOTTOM_SCREEN);
          }
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
    ></BaseView>
  );
};

export { Splash };
