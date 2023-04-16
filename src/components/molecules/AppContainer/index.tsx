import React, { ReactElement } from 'react';
import { KeyboardAvoidingView, ScrollView, ViewStyle } from 'react-native';
import { BaseView } from 'components/atoms/BaseView';
import { UIConst } from 'consts/UIConst';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  isSafeView?: boolean;
  styleContent?: ViewStyle;
  scrollEnabled?: boolean;
  testID?: string;
};

const AppContainer = ({
  isSafeView = false,
  children,
  style,
  styleContent,
  scrollEnabled = true,
  testID,
}: Props): ReactElement => {
  const styleBase = {
    paddingTop: isSafeView ? UIConst.STATUS_BAR_HEIGHT : 0,
    flex: 1,
  };
  const CustomView = scrollEnabled ? ScrollView : BaseView;

  return (
    <CustomView
      contentContainerStyle={styles.styleGrow}
      style={{ ...styles.container, ...style }}
      scrollEnabled={scrollEnabled}
      testID={testID}
      keyboardShouldPersistTaps="never">
      <KeyboardAvoidingView
        style={styles.ctKeyboard}
        behavior={UIConst.OS_IOS ? 'padding' : 'height'}>
        <BaseView style={{ ...styleBase, ...styleContent }}>
          {children}
        </BaseView>
      </KeyboardAvoidingView>
    </CustomView>
  );
};

export { AppContainer };
