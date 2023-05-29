import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { ThemeConst } from 'consts/ThemeConst';
import { useTheme } from 'context/Theme';
import { TypeViewStyle } from 'types/Common';

type Props = {
  children?: ReactNode;
  style?: TypeViewStyle;
};
const BaseView = ({ children, style }: Props): ReactElement => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor:
          ThemeConst[theme as keyof typeof ThemeConst].background,
        ...style,
      }}>
      {children}
    </View>
  );
};

export { BaseView };
