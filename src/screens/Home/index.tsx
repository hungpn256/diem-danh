import React, { ReactElement } from 'react';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { AppContainer } from 'components/molecules/AppContainer';
import { ItemList } from 'components/organisms/ItemList';

const Home = (): ReactElement => {
  return (
    <AppContainer>
      <BaseView>
        <BaseText>dfds</BaseText>
        <ItemList />
      </BaseView>
    </AppContainer>
  );
};

export { Home };
