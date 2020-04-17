import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import AuthorRow from './AuthorRow';

// not sure memo, and the comparison function are necessary here
const Card = React.memo(({ fullname, image, linkText, onPressLinkText }) => {
    const [loading, setLoading] = React.useState(true);

    const handleLoad = () => {
        setLoading(false);
    };

    

    return (
        <View>
            <AuthorRow fullname={fullname} linkText={linkText} onPressLinkText={onPressLinkText} />
            <View style={styles.image}>
                {loading && (
                    <ActivityIndicator color='rebeccapurple' style={StyleSheet.absoluteFill} size={'large'} />
                )}
                <Image style={styles.image} source={image} onLoad={handleLoad} />
            </View>
        </View>
    );
}, (prevProps, nextProps) => prevProps.linkText !== nextProps.linkText);

Card.propTypes = {
    fullname: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    onPressLinkText: PropTypes.func.isRequired,
    image: Image.propTypes.source.isRequired,
};

Card.defaultProps = {
    linkText: '',
    onPressLinkText: () => {},
};

Card.displayName = 'Card'

export default Card;

// examples styles...modify or remove as needed
const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
});