/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {logoUrl} from '../utils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Page = ({title, description, onPress, buttonTitle}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <TextInput style={styles.textInput} />
      <Button onPress={onPress} title={buttonTitle} />
    </>
  );
};

const KeyboardExample: () => React$Node = () => {
  const pager = React.useRef();
  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.flex} style={styles.flex}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: logoUrl,
            }}
          />
        </View>
        <View style={styles.flex}>
          <ViewPager
            ref={pager}
            style={styles.flex}
            initialPage={0}
            scrollEnabled={false}>
            <View style={styles.sectionContainer}>
              <Page
                title="First Question"
                description="What is your favourite lib ?"
                onPress={() => pager.current.setPage(1)}
                buttonTitle="Go to next question"
              />
            </View>
            <View style={styles.sectionContainer}>
              <Page
                title="Second Question"
                description="Why ViewPager?"
                onPress={() => pager.current.setPage(0)}
                buttonTitle="Go to previous question"
              />
            </View>
          </ViewPager>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  sectionDescription: {
    marginVertical: 16,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default KeyboardExample;
