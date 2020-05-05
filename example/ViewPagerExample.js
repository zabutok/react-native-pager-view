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
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

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

const CHILD_HEIGHT = 100;

const ViewPagerHeightBug = () => (
  <ScrollView>
    <ViewPager style={{flex: 1, marginLeft: 16, marginRight: 16}}>
      <View
        key="1"
        style={{
          backgroundColor: 'green',
          width: '100%',
          height: CHILD_HEIGHT,
        }}>
        <Text>First page</Text>
      </View>
      <View
        key="2"
        style={{
          backgroundColor: 'green',
          width: '100%',
          height: CHILD_HEIGHT,
        }}>
        <Text>Second page</Text>
      </View>
    </ViewPager>
  </ScrollView>
);

export default class ViewPagerExample extends React.Component<*, State> {
  viewPager: React.Ref<typeof ViewPager>;

  constructor(props: any) {
    super(props);

    const pages = [];
    for (let i = 0; i < PAGES; i++) {
      pages.push(createPage(i));
    }

    this.state = {
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      progress: {
        position: 0,
        offset: 0,
      },
      pages: pages,
      scrollState: 'idle',
      dotsVisible: false,
    };
    this.viewPager = React.createRef();
  }

  onPageSelected = (e: PageSelectedEvent) => {
    this.setState({page: e.nativeEvent.position});
  };

  onPageScroll = (e: PageScrollEvent) => {
    this.setState({
      progress: {
        position: e.nativeEvent.position,
        offset: e.nativeEvent.offset,
      },
    });
  };

  onPageScrollStateChanged = (e: PageScrollStateChangedEvent) => {
    this.setState({scrollState: e.nativeEvent.pageScrollState});
  };

  addPage = () => {
    this.setState(prevState => ({
      pages: [...prevState.pages, createPage(prevState.pages.length)],
    }));
  };

  removeLastPage = () => {
    this.setState(prevState => ({
      pages: prevState.pages.slice(0, prevState.pages.length - 1),
    }));
  };
  move = (delta: number) => {
    const page = this.state.page + delta;
    this.go(page);
  };

  go = (page: number) => {
    if (this.state.animationsAreEnabled) {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPage(page);
    } else {
      /* $FlowFixMe we need to update flow to support React.Ref and createRef() */
      this.viewPager.current.setPageWithoutAnimation(page);
    }
  };

  renderPage(page: CreatePage) {
    return (
      <View key={page.key} style={page.style} collapsable={false}>
        {/* $FlowFixMe */}
        <Image style={styles.image} source={page.imgSource} />
        <LikeCount />
      </View>
    );
  }

  toggleDotsVisibility = () => {
    this.setState(prevState => ({dotsVisible: !prevState.dotsVisible}));
  };

  render() {
    const {page, pages, animationsAreEnabled, dotsVisible} = this.state;
    return <ViewPagerHeightBug />;
  }
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
