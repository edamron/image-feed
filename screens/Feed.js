import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, ViewPropTypes, SafeAreaView } from 'react-native';
import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';

const Feed = ({ style, commentsForItem, onPressComments }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                setItems(await fetchImages());
            })();
        } catch (e) {
            console.log(`exception fetching images: ${e}`);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <ActivityIndicator size='large' />;
    }

    if (error) {
        return <Text>Error...</Text>;
    }

    return (
        <SafeAreaView style={style}>
            <CardList
                items={items}
                commentsForItem={commentsForItem}
                onPressComments={onPressComments}
            />
        </SafeAreaView>
    );
};

Feed.propTypes = {
    style: ViewPropTypes.style,
    commentsForItem: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string),
    ).isRequired,
    onPressComments: PropTypes.func.isRequired,
};

Feed.defaultProps = {
    style: null,
};

Feed.displayName = 'Feed'

export default Feed;
