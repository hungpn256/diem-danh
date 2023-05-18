import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { TypeViewStyle } from 'types/Common';

type Props = {
  children?: React.ReactNode;
  style?: TypeViewStyle;
  onPress: () => void;
  disabled?: boolean;
};

const BaseTouch = ({
  children,
  style,
  onPress,
  disabled = false,
}: Props): ReactElement => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export { BaseTouch };
