import React, { ReactElement, ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TypeViewStyle } from 'types/Common';

type Props = {
  children: ReactNode;
  style?: TypeViewStyle;
  behavior: 'height' | 'position' | 'padding' | undefined;
};

const BaseKeyboardAvoiding = ({
  children,
  style,
  behavior,
}: Props): ReactElement => {
  return (
    <KeyboardAvoidingView style={style} behavior={behavior}>
      {children}
    </KeyboardAvoidingView>
  );
};

export { BaseKeyboardAvoiding };
