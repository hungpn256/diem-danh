/* eslint-disable react/sort-comp */

/* eslint-disable react/state-in-constructor */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { BaseView } from 'components/atoms/BaseView';
import { ColorConst } from 'consts/ColorConst';
import { styles } from './styles';

let self: LoadingView | null = null;
export default class LoadingView extends PureComponent {
  state = {
    isVisible: false,
  };

  static show() {
    if (!self) return;
    self.setState({ isVisible: true });
  }

  static hide() {
    if (!self) return;

    self.setState({ isVisible: false });
  }

  componentDidMount() {
    self = this;
  }

  componentWillUnmount() {
    self = null;
  }

  render() {
    self = this;
    const { isVisible } = this.state;
    if (!isVisible) return null;
    return (
      <BaseView style={styles.container}>
        <ActivityIndicator size="large" color={ColorConst.white} />
      </BaseView>
    );
  }
}
