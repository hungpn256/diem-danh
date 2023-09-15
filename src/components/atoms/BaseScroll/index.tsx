import React, { ReactElement } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

const BaseScroll = ({ children, ...props }: ScrollViewProps): ReactElement => {
  return <ScrollView {...props}>{children}</ScrollView>;
};

export { BaseScroll };
