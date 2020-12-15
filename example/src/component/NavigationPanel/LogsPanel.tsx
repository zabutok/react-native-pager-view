import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import type { LogsPanelProps } from './types';

export function LogsPanel({ logs }: LogsPanelProps) {
  console.log(logs);
  return (
    <FlatList
      style={styles.container}
      keyExtractor={({ timestamp }) => `${timestamp.getTime()}`}
      data={logs}
      renderItem={({ item }) => (
        <View style={styles[item.event]}>
          <Text style={styles.text}>{item.timestamp.toLocaleTimeString()}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 250,
  },
  scroll: {
    backgroundColor: 'cyan',
  },
  select: {
    backgroundColor: 'greenyellow',
  },
  statusChanged: {
    backgroundColor: 'tomato',
  },
  text: {
    color: '#000',
  },
});
