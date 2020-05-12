/**
 * @flow
 */

import ViewPager from '@react-native-community/viewpager';
import React from 'react';
import {useState} from 'react';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {PAGES, createPage} from '../utils';

const HEIGHT = 300;

const ScrollableViewPagerExample = (): JSX.Element => {
  const [pages] = useState(
    Array(PAGES)
      .fill(1)
      .map((_, index) => createPage(index)),
  );

  return (
    <ScrollView style={styles.flex}>
      {Array(PAGES)
        .fill(1)
        .map((_, index) => (
          <ViewPager style={{height: HEIGHT, marginBottom: 16}}>
            {pages.map(page => (
              <View key={page.key} style={styles.content}>
                <Image style={styles.image} source={page.imgSource} />
              </View>
            ))}
          </ViewPager>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginVertical: 10,
  },
  image: {
    height: HEIGHT,
  },
});
export default ScrollableViewPagerExample;
