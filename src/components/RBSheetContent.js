import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './CommonStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import VectorIcons from './VectorIcons';

export default class RBSheetContent extends React.Component {
  press = type => {
    if (this.props.rbSheet) {
      if (this.props.todoFocused) {
        this.props.focusPosts();
      } else {
        this.props.focusTodo();
      }
    } else {
      if (type == '1') {
        this.props.focusShow();
      } else {
        this.props.focusProfile();
      }
    }
  };
  render = () => (
    <View
      style={[
        styles.footerStyle,
        this.props.additionalStyle ? this.props.additionalStyle : {},
        {flexDirection: this.props.rbSheet ? 'column' : 'row'},
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.press('1')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.props.rbSheet ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <VectorIcons
              name={
                this.props.todoFocused
                  ? 'radio-button-on-outline'
                  : 'radio-button-off-outline'
              }
              size={30}
              color="#017bff"
            />
            <Text
              style={[
                styles.footerTextStyle,
                {
                  fontWeight: 'bold',
                  paddingLeft: 20,
                },
              ]}>
              {'Render List 1'}
            </Text>
          </View>
        ) : (
          <>
            <VectorIcons name="eye" size={20} color="#017bff" />
            <Text
              style={[
                styles.footerTextStyle,
                {
                  fontWeight: this.props.showFocused ? 'bold' : '300',
                },
              ]}>
              Show
            </Text>
          </>
        )}
      </TouchableOpacity>
      {this.props.rbSheet && <View style={{height: 50}} />}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.press('2')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.props.rbSheet ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <VectorIcons
              name={
                this.props.postFocused
                  ? 'radio-button-on-outline'
                  : 'radio-button-off-outline'
              }
              size={30}
              color="#017bff"
            />
            <Text
              style={[
                styles.footerTextStyle,
                {
                  fontWeight: 'bold',
                  paddingLeft: 20,
                },
              ]}>
              {'Render List 2'}
            </Text>
          </View>
        ) : (
          <>
            <VectorIcons
              name={this.props.profileFocused ? 'person' : 'person-outline'}
              size={20}
              color="#017bff"
            />
            <Text
              style={[
                styles.footerTextStyle,
                {
                  fontWeight: this.props.profileFocused ? 'bold' : '300',
                },
              ]}>
              Profile
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
