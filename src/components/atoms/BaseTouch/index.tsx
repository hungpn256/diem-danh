import React, { ReactElement } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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
