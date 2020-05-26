/*
 *
 * @format
 */

import React from 'react';
import {
  AppRegistry,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {name as appName} from './app.json';
import BasicViewPagerExample from './src/BasicViewPagerExample';
import OnPageScrollExample from './src/OnPageScrollExample';
import KeyboardExample from './src/KeyboardExample';
import OnPageSelectedExample from './src/OnPageSelectedExample';
import ScrollableViewPagerExample from './src/ScrollableViewPagerExample';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const examples = [
  {component: BasicViewPagerExample, name: 'Basic Example'},
  {component: KeyboardExample, name: 'Keyboard Example'},
  {component: OnPageScrollExample, name: 'OnPageScroll Example'},
  {component: OnPageSelectedExample, name: 'OnPageSelected Example'},
  {
    component: ScrollableViewPagerExample,
    name: 'Scrollable ViewPager Example',
  },
];

function App(props) {
  return (
    <ScrollView>
      {examples.map(example => (
        <TouchableOpacity
          key={example.name}
          style={styles.exampleTouchable}
          onPress={() => {
            props.navigation.push(example.name);
          }}>
          <Text style={styles.exampleText}>{example.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ViewPager Example">
        <Stack.Screen name="ViewPager Example" component={App} />
        {examples.map(example => (
          <Stack.Screen name={example.name} component={example.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  exampleTouchable: {
    padding: 16,
  },
  exampleText: {
    fontSize: 16,
  },
});

AppRegistry.registerComponent(appName, () => Navigation);
