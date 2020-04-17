import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ColorPropType } from 'react-native';

const Avatar = ({ initials, size, backgroundColor }) => {
    const style = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
    };

    return (
        <View style={[style, styles.container]}>
            <Text style={styles.text}>{ initials }</Text>
        </View>
    );
};

Avatar.propTypes = {
    initials: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    backgroundColor: ColorPropType.isRequired,
};
Avatar.defaultProps = {
    initials: 'ED',
    size: 50,
    backgroundColor: 'teal',
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    }
});

Avatar.displayName = 'Avatar'

export default Avatar;
