import React, { ReactElement } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { BaseKeyboardAvoidingView } from 'components/atoms/BaseKeyboardAvoiding';
import { BaseScroll } from 'components/atoms/BaseScroll';
import { BaseView } from 'components/atoms/BaseView';
import { UIConst } from 'consts/UIConst';
import { TypeViewStyle } from 'types/Common';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
  style?: TypeViewStyle;
  isSafeView?: boolean;
  styleContent?: TypeViewStyle;
  scrollEnabled?: boolean;
  testID?: string;
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
  isKeyboardAvoidingView?: boolean;
};

const AppContainer = ({
  isSafeView = false,
  children,
  style,
  styleContent,
  scrollEnabled = true,
  onScroll,
  isKeyboardAvoidingView,
}: Props): ReactElement => {
  const styleBase = {
    paddingTop: isSafeView ? UIConst.STATUS_BAR_HEIGHT : 0,
    flex: 1,
  };

  const CustomView = scrollEnabled ? BaseScroll : BaseView;
  const AvoidingView = isKeyboardAvoidingView
    ? BaseKeyboardAvoidingView
    : BaseView;

  return (
    <CustomView
      contentContainerStyle={styles.styleGrow}
      style={{ ...styles.container, ...style }}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps="never"
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      <AvoidingView style={styles.ctKeyboard}>
        <BaseView style={{ ...styleBase, ...styleContent }}>
          {children}
        </BaseView>
      </AvoidingView>
    </CustomView>
  );
};

export { AppContainer };
