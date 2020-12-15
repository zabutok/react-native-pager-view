import React, { useRef, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
import ViewPager, {
  ViewPagerOnPageScrollEvent,
} from '@react-native-community/viewpager';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ProgressBar } from './component/ProgressBar';
import { useNavigationPanel } from './hook/useNavigationPanel';
import { NavigationPanel } from './component/NavigationPanel';

const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

export function OnPageScrollExample() {
  const { ref, ...navigationPanel } = useNavigationPanel();
  const {
    activePage,
    onPageScroll,
    setPage,
    progress,
    pages,
  } = navigationPanel;
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;
  const animatedEvent = useMemo(
    () =>
      Animated.event([{ nativeEvent: { offset: scrollOffset, position } }], {
        listener: (event: ViewPagerOnPageScrollEvent) => {
          onPageScroll(event);
        },
        useNativeDriver: true,
      }),
    [onPageScroll, position, scrollOffset]
  );

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <ScrollView horizontal>
          {pages.map((_v, index) => (
            <TouchableOpacity key={index} onPress={() => setPage(index)}>
              <View style={styles.separator}>
                <Text
                  style={[
                    styles.touchableTitle,
                    activePage === index && styles.touchableTitleActive,
                  ]}
                >
                  Page {index}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ProgressBar numberOfPages={pages.length} progress={progress} />
      <AnimatedViewPager
        {...navigationPanel}
        ref={ref}
        style={styles.flex}
        initialPage={0}
        onPageScroll={animatedEvent}
      >
        {navigationPanel.pages.map(({ key, style }) => (
          <View key={key} style={[style, styles.center]}>
            <Text style={styles.text}>{`Page Index: ${key}`}</Text>
          </View>
        ))}
      </AnimatedViewPager>
      <NavigationPanel {...navigationPanel} disablePagesAmountManagement />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#63a4ff',
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
  separator: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  touchableTitle: {
    textAlign: 'center',
    color: '#000',
  },
  touchableTitleActive: {
    color: '#fff',
  },
});
