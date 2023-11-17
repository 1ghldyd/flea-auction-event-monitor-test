import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

export const Header = ({title, insert, backgroundColor, color, style}) => {
  const {colors} = useTheme();
  const {layout} = useSelector(state => state.config);
  return (
    <View style={[styles.container, {height: layout.headerHeight, alignItems: insert ? 'flex-start' : 'center', backgroundColor: insert ? colors.background : backgroundColor ?? '#23D9CF', ...style}]}>
      <Text style={[styles.headerText, {color: insert ? colors.text : color ?? (backgroundColor ? colors.text : 'white')}]}>{title ?? '플리옥션'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', justifyContent: 'center'},
  headerText: {fontSize: 17, fontWeight: '600'},
});
