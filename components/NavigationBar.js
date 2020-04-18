import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const NavigationBar = ({ title, leftText, onPressLeftText }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.leftText, { borderWidth: 2, borderRadius: 5, borderColor: 'rebeccapurple', padding: 5 }]}
                onPress={onPressLeftText}
            >
                <Text>{leftText}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

NavigationBar.propTypes = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
    title: '',
    leftText: '',
    onPressLeftText: () => {},
};

NavigationBar.displayName = 'NavigationBar'

export default NavigationBar;

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '500',
    },
    leftText: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});