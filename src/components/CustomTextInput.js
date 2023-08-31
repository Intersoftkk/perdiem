import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import VectorIcons from './VectorIcons';

const CustomTextInput = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: props.borderRadius ? props.borderRadius : 15,
      borderWidth: props.borderWidth ? props.borderWidth : 1,
      backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff',
      borderColor: props.validation
        ? '#ff0000'
        : props.backgroundColor
        ? props.backgroundColor
        : props.borderColor
        ? props.borderColor
        : '#000',
      paddingHorizontal: 5,
      elevation: 3,
      ...props.style,
    }}>
    <TextInput
      style={{
        flex: props.validation ? 0.9 : 1,
        paddingVertical: 5,
        color: props.fontColor ? props.fontColor : '#000',
      }}
      // autoFocus={true}
      onFocus={props.focus}
      editable={!props.disableField}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      defaultValue={props.value}
      autoCapitalize={props.autoCapitalize ? 'none' : undefined}
      multiline={props.multiline}
      secureTextEntry={props.password}
      onChangeText={text => props.setValue(text)}
      placeholder={props.placeholder}
      placeholderTextColor={props.fontColor ? props.fontColor : '#808080'}
    />
    {props.validation && (
      <View style={{flex: 0.1, marginTop: props.multiline ? 10 : 0}}>
        <VectorIcons
          type="ionicons"
          name="alert-circle"
          size={20}
          color="#ff0000"
        />
      </View>
    )}
    {props.search && (
      <View style={{flex: 0.1}}>
        <VectorIcons
          type="ionicons"
          name="search"
          size={20}
          color={'#0000FF'}
        />
      </View>
    )}
    {props.dropdown && (
      <View style={{flex: 0.1}}>
        <VectorIcons
          type="ionicons"
          name="caret-down-outline"
          size={20}
          color={props.dropdownColor}
        />
      </View>
    )}
    {props.eye && (
      <TouchableOpacity
        style={{flex: 0.1}}
        activeOpacity={0.7}
        onPress={props.eyePress}>
        <VectorIcons
          type="ionicons"
          name={!props.password ? 'eye' : 'eye-off'}
          size={20}
          color={'#808080'}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default CustomTextInput;
