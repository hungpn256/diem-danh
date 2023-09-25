import React, { ReactElement } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  NativeScrollEvent,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const BaseKeyboardAvoidingView = ({
  children,
  scrollEnabled = true,
  contentContainerStyle,
  keyboardShouldPersistTaps,
  testID,
  onScroll,
}: Props): ReactElement => {
  return (
    <KeyboardAwareScrollView
      testID={testID}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={[{ flex: 1 }, contentContainerStyle]}
      style={{ flex: 1 }}
      scrollEnabled={scrollEnabled}
      onScroll={onScroll}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export { BaseKeyboardAvoidingView };
