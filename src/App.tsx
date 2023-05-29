import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationService } from 'services/NavigationService';
import { AppNavigator } from 'navigation/AppNavigator';
import 'core/i18n';
import { ThemeProvider } from 'context/Theme';

const App = (): ReactElement => {
  return (
    <ThemeProvider>
      <NavigationContainer
        ref={(ref): void => NavigationService.setNavigator(ref)}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export { App };
