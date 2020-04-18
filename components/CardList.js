import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

const CardList = ({ items, commentsForItem, onPressComments }) => {
    const renderItem = ({ item: { id, author } }) => {
        const comments = commentsForItem[id];
        //console.log(`In CardList, 'commentsForItem[${id}]' contains ${comments}`)

        return (
            <Card
                fullname={author}
                image={{
                    uri: getImageFromId(id),
                }}
                linkText={`${comments ? comments.length : 0} Comments`}
                onPressLinkText={() => onPressComments(id)}
            />
        )
    };

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            extraData={commentsForItem}
        />
    );
};

CardList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
        }),
    ).isRequired,
    commentsForItem: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string),
    ).isRequired,
    onPressComments: PropTypes.func.isRequired,
};

CardList.displayName = 'CardList'

export default CardList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });