import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from 'navigation/AppNavigator';
import 'core/i18n';

const App = (): ReactElement => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export { App };
