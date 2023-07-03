import React, { ReactElement, useEffect } from 'react';
import { AppState } from 'react-native';
import codePush from 'react-native-code-push';

const Codepush = (): ReactElement => {
  const checkCodepush = (): void => {
    codePush.allowRestart();
    codePush.sync(
      {
        updateDialog: undefined,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      //   status => {
      //     console.log('status', status);
      //   },
      // ({ receivedBytes, totalBytes }) => {
      // },
    );
  };

  const handleAppStateChange = (nextAppState: string): void => {
    if (nextAppState === 'active') {
      checkCodepush();
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    checkCodepush();
    return (): void => {
      subscription.remove();
    };
  }, []);

  return <></>;
};

export { Codepush };
