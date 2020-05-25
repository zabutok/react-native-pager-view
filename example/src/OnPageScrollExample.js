/**
 * @flow
 */

import * as React from 'react';
import {useEffect} from 'react';
import {useState, useRef} from 'react';

import {StyleSheet, Text, View, SafeAreaView, Animated} from 'react-native';

import type {CreatePage} from '../utils';
import {PAGES, createPage} from '../utils';
import ViewPager from '@react-native-community/viewpager';

const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

const OnPageScrollExample = () => {
  const [text, setText] = useState(0);
  const [pages, setPages] = useState(
    Array(PAGES)
      .fill(1)
      .map((_, index) => createPage(index)),
  );
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.textContainer}>
        <Text>{`Animated value: ${text}`}</Text>
      </View>

      <AnimatedViewPager
        style={styles.flex}
        initialPage={0}
        onPageScroll={Animated.event(
          [{nativeEvent: {offset: scrollOffset, position}}],
          {
            listener: ({nativeEvent: {offset, position}}) => {
              setText(offset + position);
            },
            useNativeDriver: true,
          },
        )}>
        {pages.map(({key, style}) => (
          <View key={key} style={style}>
            <Text style={styles.text}>{`Page Index: ${key}`}</Text>
          </View>
        ))}
      </AnimatedViewPager>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
});
export default OnPageScrollExample;
