import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from './styles';

interface Props extends TextInputProps {
  type?: string;
  error?: string;
  label?: string;
  icon?: any;
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
    <View style={styles.main}>
      {props.label && (
        <View pointerEvents='none'style={[
          styles.viewText,
          (isFocused || props.value) && styles.viewText_hover,
        ]}>
          <Text style={[
            styles.labelText,
            (isFocused || props.value) && styles.labelText_hover,
          ]}>
            {props.label}
          </Text>
        </View>
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
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