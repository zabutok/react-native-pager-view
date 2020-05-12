/**
 * @flow
 */

import * as React from 'react';
import {useState, useRef} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Button,
  Dimensions,
} from 'react-native';

import {PAGES, createPage} from '../utils';
import ViewPager from '@react-native-community/viewpager';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProgressBar} from './component/ProgressBar';
import {backgroundColor} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const OnPageScrollExample = () => {
  const [progressOffset, setProgressOffset] = useState(0);
  const [progressPosition, setProgressPosition] = useState(0);
  const [pages] = useState(
    Array(PAGES)
      .fill(1)
      .map((_, index) => createPage(index)),
  );
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.flex}>
      <View
        style={{
          flexDirection: 'row',

          backgroundColor: '#63a4ff',
        }}>
        {[
          'First Page | ',
          'Second Page | ',
          'Third Page | ',
          'Fourth Page | ',
          'Fifth Page',
        ].map(title => (
          <TouchableOpacity>
            <View style={{paddingVertical: 16}}>
              <Text style={{textAlign: 'center'}}>{title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ProgressBar
        numberOfPages={5}
        size={SCREEN_WIDTH}
        progress={{
          position: progressPosition,
          offset: progressOffset,
        }}
      />
      {/* <View style={styles.center}>
        <Text>{`Animated value: ${text}`}</Text>
      </View> */}
      <AnimatedViewPager
        style={styles.flex}
        initialPage={0}
        onPageScroll={Animated.event(
          [{nativeEvent: {offset: scrollOffset, position}}],
          {
            listener: ({nativeEvent: {offset, position}}) => {
              setProgressOffset(offset);
              setProgressPosition(position);
            },
            useNativeDriver: true,
          },
        )}>
        {pages.map(({key, style}) => (
          <View key={key} style={[style, styles.center]}>
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
export default OnPageScrollExample;
