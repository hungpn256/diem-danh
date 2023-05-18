import React, { ReactElement } from 'react';
import { Image } from 'react-native';
import {
  TypeImageResizeMode,
  TypeImageSourceProp,
  TypeImageStyle,
} from 'types/Common';

type Props = {
  source: TypeImageSourceProp;
  style?: TypeImageStyle;
  resizeMode?: TypeImageResizeMode;
  blurRadius?: number;
};

const BaseImage = ({
  source,
  style,
  resizeMode,
  blurRadius,
}: Props): ReactElement => {
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      blurRadius={blurRadius}
    />
  );
};

export { BaseImage };
