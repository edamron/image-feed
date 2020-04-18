import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';

const CommentInput = ({ onSubmit, placeholder }) => {
    const [text, setText] = useState('');

    const handleChangeText = currentText => {
        setText(currentText);
    }

    const handleSubmitEditing = () => {
        if (!text) {
            return;
        }

        onSubmit(text);
        setText('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                placeholder={placeholder}
                underlineColorAndroid='transparent'
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    );
};

CommentInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

CommentInput.defaultProps = {
    placeholder: '',
};

CommentInput.displayName = 'CommentInput'

export default CommentInput;

// examples styles...modify or remove as needed
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20,
        height: 60,
    },
    input: {
        flex: 1,
    },
});