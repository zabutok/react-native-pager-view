import React, { useMemo, useContext, useCallback } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { StateNavigator } from 'navigation';
import { NavigationHandler, NavigationContext } from 'navigation-react';
import { NavigationStack } from 'navigation-react-native';

export const Button = ({ children, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Screen1 = () => {
  const { stateNavigator } = useContext(NavigationContext);
  const onPress = useCallback(() => {
    stateNavigator.navigate('screen2');
  }, [stateNavigator]);
  return (
    <ViewPager style={styles.viewPager} initialPage={0}>
      <View key="1" style={styles.page1}>
        <Button onPress={onPress}>Go to next screen</Button>
      </View>
      <View key="2" style={styles.page2} />
    </ViewPager>
  );
};

const Screen2 = () => {
  const { stateNavigator } = useContext(NavigationContext);
  const onPress = useCallback(() => {
    stateNavigator.navigateBack(1);
  }, [stateNavigator]);
  return (
    <View style={styles.screen2}>
      <Button onPress={onPress}>Go back</Button>
    </View>
  );
};

const App = () => {
  const stateNavigator = useMemo(() => {
    var stateNavigator = new StateNavigator([
      { key: 'screen1' },
      { key: 'screen2', trackCrumbTrail: true },
    ]);
    stateNavigator.states.screen1.renderScene = () => <Screen1 />;
    stateNavigator.states.screen2.renderScene = () => <Screen2 />;
    stateNavigator.navigate('screen1');
    return stateNavigator;
  }, []);

  return (
    <NavigationHandler stateNavigator={stateNavigator}>
      <NavigationStack />
    </NavigationHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'blue',
    elevation: 2,
    borderRadius: 4,
  },
  label: {
    color: 'white',
  },
  viewPager: {
    flex: 1,
  },
  page1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  page2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  screen2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
