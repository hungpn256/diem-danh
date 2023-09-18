import React from 'react';
import { View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { ColorConst } from 'consts/ColorConst';
import { UIConst } from 'consts/UIConst';

export default function Header({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: ColorConst.white }}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: UIConst.WIDTH,
          height: '100%',
          position: 'absolute',
          borderBottomLeftRadius: 40,
        }}
      ></View>
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content color="white" title={title} />
      </Appbar.Header>
    </View>
  );
}
