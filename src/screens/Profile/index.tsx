import React, { ReactElement } from 'react';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';

const Profile = (): ReactElement => {
  return (
    <BaseView>
      <BaseText>Profile</BaseText>
    </BaseView>
  );
};

export { Profile };
