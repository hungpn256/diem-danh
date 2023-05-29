import React, { ReactElement, ReactNode } from 'react';
import { Text } from 'react-native';
import { ThemeConst } from 'consts/ThemeConst';
import { useTheme } from 'context/Theme';
import { TypeTextStyle } from 'types/Common';

type Props = {
  children: ReactNode;
  style?: TypeTextStyle;
  onPress?: () => void;
};
const BaseText = ({ children, style, onPress }: Props): ReactElement => {
  const { theme } = useTheme();
  return (
    <Text
      onPress={onPress}
      style={{
        color: ThemeConst[theme as keyof typeof ThemeConst].text,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export { BaseText };
