import React, { useState } from 'react';
import { StyleSheet, View, Platform, Modal } from 'react-native';
import Constants from 'expo-constants';
import Feed from './screens/Feed';
import Comments from './screens/Comments';

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openCommentsScreen = id => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const closeCommentsScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const onSubmitComment = text => {
    const comments = commentsForItem[selectedItemId] || [];

    console.log(`App::onSubmitComment, text is ${text}, comments are ${comments}`)

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    setCommentsForItem(updated);
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
