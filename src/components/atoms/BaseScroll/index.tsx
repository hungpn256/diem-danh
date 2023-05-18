import React, { ReactElement, ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { TypeViewStyle } from 'types/Common';

type Props = {
  children: ReactNode;
  style?: TypeViewStyle;
  contentContainerStyle: TypeViewStyle;
  scrollEnabled: boolean;
  keyboardShouldPersistTaps:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
};

const BaseScroll = ({
  children,
  contentContainerStyle,
  style,
  scrollEnabled,
  keyboardShouldPersistTaps,
}: Props): ReactElement => {
  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      style={style}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      {children}
    </ScrollView>
  );
};

export { BaseScroll };
