import React, { ReactElement } from 'react';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';

const Home = (): ReactElement => {
  return (
    <BaseView style={{ flex: 1, justifyContent: 'center' }}>
      <BaseText>Home</BaseText>
    </BaseView>
  );
};

export { Home };
