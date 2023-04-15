import { changeLanguage } from 'i18next';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseText } from 'components/atoms/BaseText';
import { BaseView } from 'components/atoms/BaseView';

const Splash = (): ReactElement => {
  const { t } = useTranslation();
  const onPress = (): void => {
    changeLanguage('en');
    //
  };

  return (
    <BaseView style={{ flex: 1, justifyContent: 'center' }}>
      <BaseText onPress={onPress}>{t('home.home')}</BaseText>
    </BaseView>
  );
};

export { Splash };
