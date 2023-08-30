import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VectorIcons = props =>
  <Ionicons
    name={props.name}
    size={props.size}
    color={props.color}
    style={props.style ? props.style : undefined}
  />

export default VectorIcons;
