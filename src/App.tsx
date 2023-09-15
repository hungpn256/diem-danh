import React, { ReactElement } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Codepush } from 'components/organisms/Codepush';
import { NavigationService } from 'services/NavigationService';
import { AppNavigator } from 'navigation/AppNavigator';
import 'core/i18n';
import { ThemeProvider } from 'context/Theme';

const App = (): ReactElement => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <NavigationContainer
          ref={(ref): void => NavigationService.setNavigator(ref)}>
          <AppNavigator />
          <Codepush />
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
};

export { App };
