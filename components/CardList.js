import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

const CardList = ({ items }) => {
    const renderCard = ({ item: { id, author } }) => (
        <Card
            fullname={author}
            image={{
                uri: getImageFromId(id),
            }}
        />
    );

    return (
        <FlatList
            data={items}
            renderItem={renderCard}
            keyExtractor={keyExtractor}
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
};

CardList.displayName = 'CardList'

export default CardList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });