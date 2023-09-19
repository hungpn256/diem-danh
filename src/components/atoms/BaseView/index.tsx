import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { TypeViewStyle } from 'types/Common';

type Props = {
  children?: ReactNode;
  style?: TypeViewStyle;
};
const BaseView = ({ children, style }: Props): ReactElement => {
  return <View style={style}>{children}</View>;
};

export { BaseView };
