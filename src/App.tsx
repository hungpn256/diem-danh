import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { Codepush } from 'components/organisms/Codepush';
import LoadingView from 'components/organisms/LoadingView';
import { NavigationService } from 'services/NavigationService';
import { StorageService } from 'services/StorageService';
import { AppNavigator } from 'navigation/AppNavigator';
import 'core/i18n';
import { StorageConst } from 'consts/StorageConst';
import { AppInfoProvider } from 'context/AppInfo';
import { ThemeProvider } from 'context/Theme';

const App = (): ReactElement => {
  useEffect(() => {
    const server = false
      ? 'https://diem-danh-be.onrender.com/api'
      : 'http://localhost:1200/api';

    axios.defaults.baseURL = server;
    axios.interceptors.request.use(
      async config => {
        const token = await StorageService.get(StorageConst.TOKEN);
        config.headers.Authorization = token;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }, []);
  return (
    <PaperProvider>
      <AppInfoProvider>
        <ThemeProvider>
          <NavigationContainer
            ref={(ref): void => NavigationService.setNavigator(ref)}
          >
            <AppNavigator />
            <Codepush />
          </NavigationContainer>
        </ThemeProvider>
      </AppInfoProvider>
      <LoadingView />
    </PaperProvider>
  );
};

export { App };
