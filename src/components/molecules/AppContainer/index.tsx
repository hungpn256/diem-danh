import React, { ReactElement } from 'react';
import { BaseKeyboardAvoiding } from 'components/atoms/BaseKeyboardAvoiding';
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
};

const AppContainer = ({
  isSafeView = false,
  children,
  style,
  styleContent,
  scrollEnabled = true,
}: Props): ReactElement => {
  const styleBase = {
    paddingTop: isSafeView ? UIConst.STATUS_BAR_HEIGHT : 0,
    flex: 1,
  };

  const CustomView = scrollEnabled ? BaseScroll : BaseView;

  return (
    <CustomView
      contentContainerStyle={styles.styleGrow}
      style={{ ...styles.container, ...style }}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps="never">
      <BaseKeyboardAvoiding
        style={styles.ctKeyboard}
        behavior={UIConst.OS_IOS ? 'padding' : 'height'}>
        <BaseView style={{ ...styleBase, ...styleContent }}>
          {children}
        </BaseView>
      </BaseKeyboardAvoiding>
    </CustomView>
  );
};

export { AppContainer };
