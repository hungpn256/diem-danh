import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationService } from 'services/NavigationService';
import { AppNavigator } from 'navigation/AppNavigator';
import 'core/i18n';

const App = (): ReactElement => {
  return (
    <NavigationContainer
      ref={(ref): void => NavigationService.setNavigator(ref)}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export { App };
