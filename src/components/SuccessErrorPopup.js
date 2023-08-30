import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions, Text} from 'react-native';

export default class SuccessErrorPopup extends React.Component {
  render = () => (
    <LinearGradient
      colors={
        this.props.title == 'Error'
          ? ['#a10000', '#de0000', '#f70000']
          : ['#4b954b', '#54a854', '#52a552']
      }
      start={{x: 0.4, y: 0.0}}
      end={{x: 1.0, y: 0.0}}
      style={{
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
      <Text style={{fontFamily: 'AzoSans-Bold', color: '#fff', fontSize: 15}}>
        {this.props.title}
      </Text>
      <Text style={{fontFamily: 'AzoSans-Light', color: '#fff', fontSize: 15}}>
        {this.props.message}
      </Text>
    </LinearGradient>
  );
}
