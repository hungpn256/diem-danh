import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import codePush from 'react-native-code-push';
import { Modal, ProgressBar } from 'react-native-paper';

const Codepush = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const checkCodepush = (): void => {
    codePush.allowRestart();
    codePush.sync(
      {
        updateDialog: undefined,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      status => {
        if (status === codePush.SyncStatus.DOWNLOADING_PACKAGE) {
          setVisible(true);
        } else if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
          setVisible(false);
        }
      },
      ({ receivedBytes, totalBytes }) => {
        setProgress(receivedBytes / totalBytes);
      },
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

  return (
    <Modal visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ProgressBar progress={progress}></ProgressBar>
      </View>
    </Modal>
  );
};

export { Codepush };
