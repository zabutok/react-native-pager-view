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
import ScrollViewInsideExample from './src/ScrollViewInsideExample';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewPager from '@react-native-community/viewpager';
import {View} from 'react-native';

const Stack = createStackNavigator();

const ViewPagerScreen = ({navigation}) => {
  return (
    <ViewPager style={{flex: 1}} initialPage={0}>
      <View key={1} style={{backgroundColor: '#aaccaa'}}>
        <Text>First page</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NestedStack')}>
          <Text>Goto NestedStack</Text>
        </TouchableOpacity>
      </View>
      <View key={2} style={{backgroundColor: '#aaaacc'}}>
        <Text>Second page</Text>
      </View>
    </ViewPager>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ViewPager Example">
        <Stack.Screen name="ViewPager Example" component={ViewPagerScreen} />
        <Stack.Screen name="NestedStack" component={ViewPagerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Navigation);
