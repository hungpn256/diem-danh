import React, { ReactElement } from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
  style?: ImageStyle;
  resizeMode?: ImageResizeMode;
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
