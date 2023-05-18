import React, { ReactElement, ReactNode } from 'react';
import { Text } from 'react-native';
import { TypeTextStyle } from 'types/Common';
import { styles } from './styles';

type Props = {
  children: ReactNode;
  style?: TypeTextStyle;
  onPress?: () => void;
};
const BaseText = ({ children, style, onPress }: Props): ReactElement => {
  return (
    <Text onPress={onPress} style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export { BaseText };
