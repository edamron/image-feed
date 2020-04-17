import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import Feed from './screens/Feed';

/* const items = [
  { id: 0, author: 'Bob Ross' },
  { id: 1, author: 'Chuck Norris' },
  { id: 2, author: 'Earl Damron' },
  { id: 3, author: 'Rebecca Hernandez' },
];
 */
export default function App() {
  return (
    <View style={styles.container}>
      <Feed style={styles.feed} />
    </View>
  );
}

const platformVersion = 
  Platform.OS === 'ios' 
    ? parseInt(Platform.Version, 10) 
    : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11 
        ? Constants.statusBarHeight 
        : 0,
  },
});
