import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NavigationService } from 'services/NavigationService';
import { ColorConst } from 'consts/ColorConst';
import { UIConst } from 'consts/UIConst';

export default function Header({ title }: { title: string }) {
  const theme = useTheme();
  const navigation = useNavigation();

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
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={NavigationService.back}
          style={{
            backgroundColor: theme.colors.primary,
            position: 'absolute',
            bottom: 15,
            left: 20,
          }}
        >
          <Ionicons
            name="arrow-back-sharp"
            style={{ fontSize: 32, color: '#fff' }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
