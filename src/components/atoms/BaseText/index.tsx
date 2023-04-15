import React, { ReactElement, ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { styles } from './styles';

type Props = {
  children: ReactNode;
  style?: TextStyle;
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
