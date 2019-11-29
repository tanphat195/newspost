import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from './styles';

interface Props extends TextInputProps {
  type?: string,
  error?: string,
}

const Input: React.FC<Props> = (props) => {
  const [isFocused, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, [isFocused]);
  
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[
          styles.main,
          props.style,
          isFocused && styles.focusBorder,
          props.error && styles.errorBorder
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  );
}

export default Input;