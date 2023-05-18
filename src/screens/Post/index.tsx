import React, { ReactElement } from 'react';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';
import { styles } from './styles';

const Post = (): ReactElement => {
  return (
    <BaseView style={styles.container}>
      <BaseText>Post</BaseText>
    </BaseView>
  );
};

export { Post };
