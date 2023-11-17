import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const NotReady = ({page}) => {
  return (
    <View style={styles.container}>
      <Text>{`${page}번 화면은 준비중입니다.`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
