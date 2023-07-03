import React, { ReactElement } from 'react';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import { useTheme } from 'context/Theme';

const Home = (): ReactElement => {
  const { setTheme } = useTheme();

  return (
    <AppContainer isSafeView>
      <BaseView>
        <BaseText onPress={setTheme}>dfds</BaseText>
      </BaseView>
    </AppContainer>
  );
};

export { Home };
