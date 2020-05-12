/**
 * @flow
 */

import * as React from 'react';
import {useState} from 'react';

import {StyleSheet, Text, View, SafeAreaView, Alert} from 'react-native';

import {PAGES, createPage} from '../utils';
import ViewPager from '@react-native-community/viewpager';

const OnPageSelectedExample = () => {
  const [pages] = useState(
    Array(PAGES)
      .fill(1)
      .map((_, index) => createPage(index)),
  );

  return (
    <SafeAreaView style={styles.flex}>
      <ViewPager
        style={styles.flex}
        initialPage={0}
        onPageSelected={({nativeEvent: {position}}) => {
          Alert.alert('Hey', `You are on ${position + 1} page`);
        }}>
        {pages.map(({key, style}) => (
          <View key={key} style={[style, styles.center]}>
            <Text style={styles.text}>{`Page Index: ${key}`}</Text>
          </View>
        ))}
      </ViewPager>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
});

export default OnPageSelectedExample;
