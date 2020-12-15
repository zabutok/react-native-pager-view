/**
 * @flow
 */

import * as React from 'react';

import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';

import ViewPager, {
  ViewPagerOnPageSelectedEvent,
} from '@react-native-community/viewpager';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';

export const OnPageSelectedExample = () => {
  const { ref, ...navigationPanel } = useNavigationPanel();

  return (
    <SafeAreaView style={styles.flex}>
      <ViewPager
        {...navigationPanel}
        ref={ref}
        style={styles.flex}
        initialPage={0}
        onPageSelected={(event: ViewPagerOnPageSelectedEvent) => {
          navigationPanel.onPageSelected(event);
          Alert.alert(
            'Hey',
            `You are on ${event.nativeEvent.position + 1} page`
          );
        }}
      >
        {navigationPanel.pages.map(({ key, style }) => (
          <View key={key} style={[style, styles.center]}>
            <Text style={styles.text}>{`Page Index: ${key}`}</Text>
          </View>
        ))}
      </ViewPager>
      <NavigationPanel {...navigationPanel} />
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
