import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

import { PagerView } from 'react-native-pager-view';

import { LikeCount } from './component/LikeCount';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
import { CreatePage, createPageKeyExtractor } from './utils';

function TrackingRender({ item }: { item: CreatePage }) {
  useEffect(() => {
    console.log(`didmout ${item.key}`);
    return () => {
      console.log(`didunmout ${item.key}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={item.style}>
      <Image style={styles.image} source={item.imgSource} />
      <LikeCount />
    </View>
  );
}

function renderItem({ item }: { item: CreatePage }) {
  return <TrackingRender item={item} />;
}

export function BasicPagerViewExample() {
  const { ref, ...navigationPanel } = useNavigationPanel<CreatePage>(10000);

  return (
    <SafeAreaView style={styles.container}>
      <PagerView
        buffer={2}
        ref={ref}
        style={styles.pagerView}
        scrollEnabled={navigationPanel.scrollEnabled}
        maxRenderWindow={6}
        onPageScroll={navigationPanel.onPageScroll}
        onPageSelected={navigationPanel.onPageSelected}
        onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        pageMargin={10}
        orientation="horizontal"
        overdrag={navigationPanel.overdragEnabled}
        transitionStyle="scroll"
        showPageIndicator={navigationPanel.dotsEnabled}
        data={navigationPanel.pages}
        keyExtractor={createPageKeyExtractor}
        renderItem={renderItem}
      />

      <NavigationPanel {...navigationPanel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  pagerView: {
    flex: 1,
  },
});
