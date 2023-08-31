import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  BackHandler,
  View,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../components/CommonStyles';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GoogleSignInConfig,
  emailRegex,
  isLoggedIn,
} from '../components/Constants';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import SuccessErrorPopup from '../components/SuccessErrorPopup';
import {setObjectValue} from '../components/AsyncStorage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommonActions} from '@react-navigation/native';

export default class LoginScreen extends React.Component {
  state = {
    userInfo: {},
    isLoading: false,
    isSignedIn: false,
    nameValidation: false,
    emailValidation: false,
    passwordValidation: false,
    name: '',
    email: '',
    password: '',
    errorMsg: '',
    isErrorPopup: false,
    showPassword: false,
  };
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    let isGoogleSignedIn = await this.isGoogleSignedIn();
  }
  isGoogleSignedIn = async () => {
    let isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({isSignedIn});
  };
  googleSignIn = async () => {
    GoogleSignin.configure(GoogleSignInConfig);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.RBSheet.open();
      await setObjectValue('name', {name: userInfo.user.name});
      await setObjectValue('email', {email: userInfo.user.email});
      await setObjectValue('password', {password: userInfo.user.password});
      await setObjectValue('google', {google: true});
      this.RBSheet.close();
      isLoggedIn.isLoggedIn = true;
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'HomeScreen',
            },
          ],
        }),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  signIn = () => {
    if (this.state.name.trim() == '') {
      this.setState({
        isErrorPopup: true,
        nameValidation: false,
        errorMsg: 'Please enter name',
      });
      return;
    }
    if (this.state.email.trim() == '') {
      this.setState({
        isErrorPopup: true,
        emailValidation: false,
        errorMsg: 'Please enter email address',
      });
      return;
    }
    if (!this.state.email.trim().match(emailRegex)) {
      this.setState({
        isErrorPopup: true,
        emailValidation: false,
        errorMsg: 'Please enter a valid email address',
      });
      return;
    }
    if (this.state.password.trim() == '') {
      this.setState({
        isErrorPopup: true,
        passwordValidation: false,
        errorMsg: 'Please enter password',
      });
      return;
    }
    this.setState(
      {
        isErrorPopup: false,
        nameValidation: false,
        emailValidation: false,
        passwordValidation: false,
      },
      () => {
        setObjectValue('name', {name: this.state.name.trim()});
        setObjectValue('email', {email: this.state.email.trim()});
        setObjectValue('password', {password: this.state.password.trim()});
        isLoggedIn.isLoggedIn = true;
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'HomeScreen',
              },
            ],
          }),
        );
      },
    );
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }
  render = () => (
    <SafeAreaView style={[styles.container, styles.centerAlign]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.centerAlign, {paddingVertical: 20}]}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
          }}
        />
        <View style={{height: 20}} />

        <Text
          style={{
            color: '#808080',
            fontSize: 25,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View style={{height: 20}} />
        <CustomTextInput
          borderRadius={5}
          placeholder="Name"
          value={this.state.name}
          autoCapitalize
          validation={this.state.nameValidation && this.state.isErrorPopup}
          setValue={text => this.setState({name: text, isErrorPopup: false})}
        />
        <View style={{height: 20}} />
        <CustomTextInput
          borderRadius={5}
          placeholder="Email Address"
          value={this.state.email}
          autoCapitalize
          validation={
            this.state.emailValidation &&
            this.state.isErrorPopup &&
            (this.state.email.trim() == '' ||
              !isValidEmail(this.state.email.trim()))
          }
          setValue={text => this.setState({email: text, isErrorPopup: false})}
        />
        <View style={{height: 20}} />
        <CustomTextInput
          borderRadius={5}
          placeholder="Password"
          password={!this.state.showPassword}
          eyePress={() =>
            this.setState({showPassword: !this.state.showPassword})
          }
          eye
          validation={this.state.passwordValidation && this.state.isErrorPopup}
          value={this.state.password}
          setValue={text =>
            this.setState({password: text, isErrorPopup: false})
          }
        />
        <View style={{height: 20}} />

        <Text
          style={{
            color: '#808080',
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontSize: 18,
          }}>
          Enter Email & Password
        </Text>
        <View style={{height: 50}} />
        <CustomButton
          text="Login"
          color={'#017bff'}
          width="100%"
          fontSize={15}
          borderRadius={10}
          onPress={this.signIn}
        />
        <View style={{height: 80}} />
        <TouchableOpacity
          style={styles.googleSignInButtonStyle}
          activeOpacity={0.7}
          onPress={this.googleSignIn}>
          <Text style={styles.googleSignInTextStyle}>
            Sign in with{' '}
            <Text style={{textDecorationLine: 'underline'}}>Google</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={250}
        openDuration={250}
        customStyles={{
          container: styles.rbSheetContainer,
        }}>
        <ActivityIndicator size={'large'} color={'#017bff'} />
      </RBSheet>
      {this.state.isErrorPopup && (
        <SuccessErrorPopup title={'Error'} message={this.state.errorMsg} />
      )}
    </SafeAreaView>
  );
}
