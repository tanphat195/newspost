import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from './styles';

interface Props extends TouchableOpacityProps {
}

const ButtonCustom: React.FC<Props> = (props) => {

  return (
    <TouchableOpacity
      {...props}
      style={[styles.main, props.style]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

export default ButtonCustom;