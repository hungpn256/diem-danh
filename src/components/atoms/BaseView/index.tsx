import React, { ReactElement, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};
const BaseView = ({ children, style }: Props): ReactElement => {
  return <View style={{ ...style }}>{children}</View>;
};

export { BaseView };
