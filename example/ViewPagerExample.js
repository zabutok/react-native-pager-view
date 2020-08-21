/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import * as React from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';

import ViewPager from '@react-native-community/viewpager';
import {PAGES, createPage} from './utils';
import {Button} from './src/component/Button';
import {LikeCount} from './src/component/LikeCount';
import {ProgressBar} from './src/component/ProgressBar';
import type {CreatePage} from './utils';
import type {
  PageScrollEvent,
  PageScrollState,
  PageScrollStateChangedEvent,
  PageSelectedEvent,
} from '../js';

type State = {
  page: number,
  animationsAreEnabled: boolean,
  scrollEnabled: boolean,
  progress: {
    position: number,
    offset: number,
  },
  pages: Array<CreatePage>,
  scrollState: PageScrollState,
  dotsVisible: boolean,
};

export default function ViewPagerExample() {
  const [items, setItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    setTimeout(() => {
      setItems(['one', 'two', 'three']);
    }, 1000);
  }, [setItems]);

  function renderPage(item) {
    return (
      <View
        key={item}
        style={{backgroundColor: 'red', width: '100%', height: '100%'}}
        collapsable={false}>
        <View style={{flex: 1}}>
          <Text>Item: {item}</Text>
        </View>
      </View>
    );
  }

  return (
    <ViewPager
      style={{width: '100%', height: 50, backgroundColor: '#ddd'}}
      initialPage={0}>
      {/*<View key="-1">*/}
      {/*    <Text>A static item which is always rendered. Adding it will also prevent the bug. </Text>*/}
      {/*</View>*/}

      {items.map((item, index) => (
        <View key={index}>
          <Text>Item: {item}</Text>
        </View>
      ))}
    </ViewPager>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  viewPager: {
    flex: 1,
  },
});
