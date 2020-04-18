import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Modal, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import Feed from './screens/Feed';
import Comments from './screens/Comments';

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

  useEffect(() => {
    try {
      (async () => {
        const commentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
        console.log(`'${commentsForItem}'`);
        //console.log(`retrieved comments: ${commentsForItem["1"]}`);

        //TODO: never quite got the AsyncStorage thing working...  :-(

        //console.log(JSON.parse(commentsForItem)["1"]);
        setCommentsForItem({
          commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {}
        });
        //console.log(`commentsForItem: ${commentsForItem}`);
      })();
    } catch (error) {
      console.log(`Failed to load comments: ${error}`);
    }
  }, []);

  const openCommentsScreen = id => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const closeCommentsScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const onSubmitComment = async text => {
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    setCommentsForItem(updated);

    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log(`Failed to save comment "${text}" for ${selectedItemId}: ${error}`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Feed
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComments={openCommentsScreen}
      />
      <Modal
        visible={showModal}
        animationType='slide'
        onRequestClose={closeCommentsScreen}
      >
        <Comments
          style={styles.container}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentsScreen}
          onSubmitComment={onSubmitComment}
        />
      </Modal>
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
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' || platformVersion < 11 
        ? Constants.statusBarHeight 
        : 0,
  },
});
