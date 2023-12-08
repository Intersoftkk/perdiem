import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {styles} from '../components/CommonStyles';
import RBSheetContent from '../components/RBSheetContent';
import {getMyObject, removeValue} from '../components/AsyncStorage';
import {parseApiResponseMessage} from '../components/Api';
import CustomButton from '../components/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import VectorIcons from '../components/VectorIcons';
import {isLoggedIn} from '../components/Constants';
import {CommonActions} from '@react-navigation/native';

export default class ProfileScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    google: false,
    todoFocused: true,
    postFocused: false,
  };
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('HomeScreen', {
        todoFocused: this.props.route.params
          ? this.props.route.params.todoFocused
          : true,
        postFocused: this.props.route.params
          ? this.props.route.params.postFocused
          : false,
      });
      return true;
    });
    this.props.navigation.addListener('focus', async () => {
      let name = await getMyObject('name');
      let email = await getMyObject('email');
      let password = await getMyObject('password');
      let google = await getMyObject('google');
      this.setState({
        name: parseApiResponseMessage(name),
        email: parseApiResponseMessage(email),
        password: parseApiResponseMessage(password),
        google: google != null ? parseApiResponseMessage(google) : false,
        todoFocused: this.props.route.params
          ? this.props.route.params.todoFocused
          : true,
        postFocused: this.props.route.params
          ? this.props.route.params.postFocused
          : false,
      });
    });
  }
  logout = async () => {
    await removeValue('name');
    await removeValue('email');
    await removeValue('password');
    if (this.state.google) {
      await removeValue('google');
    }
    isLoggedIn.isLoggedIn = false;
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'LoginScreen',
          },
        ],
      }),
    );
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('HomeScreen', {
        todoFocused: this.props.route.params
          ? this.props.route.params.todoFocused
          : true,
        postFocused: this.props.route.params
          ? this.props.route.params.postFocused
          : false,
      });
      return true;
    });
  }
  render = () => (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          this.props.navigation.navigate('HomeScreen', {
            todoFocused: true,
            postFocused: false,
          })
        }>
        <VectorIcons name="arrow-back" size={30} color="#0000FF" />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.centerList, {alignItems: 'flex-start'}]}>
        <Text
          style={[styles.itemTitleStyle, {fontSize: 20, alignSelf: 'center'}]}>
          Profile
        </Text>
        <View style={{height: 40}} />
        <View
          style={{
            alignSelf: 'center',
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            borderWidth: 1,
            borderColor: '#808080',
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcons name="person" size={50} color="#808080" />
        </View>
        <View style={{height: 40}} />
        <View style={[styles.rowStyle, {width: '100%'}]}>
          <Text style={[styles.itemTitleStyle, {fontSize: 20}]}>Name</Text>
          <Text style={[styles.itemBodyStyle, {fontSize: 17}]}>
            {this.state.name}
          </Text>
        </View>
        <View style={{height: 15}} />
        <View style={[styles.rowStyle, {width: '100%'}]}>
          <Text style={[styles.itemTitleStyle, {fontSize: 20}]}>Email</Text>
          <Text style={[styles.itemBodyStyle, {fontSize: 17}]}>
            {this.state.email}
          </Text>
        </View>
        {!this.state.google && <View style={{height: 15}} />}
        {!this.state.google && (
          <View style={[styles.rowStyle, {width: '100%'}]}>
            <Text style={[styles.itemTitleStyle, {fontSize: 20}]}>
              Password
            </Text>
            <Text style={[styles.itemBodyStyle, {fontSize: 17}]}>********</Text>
          </View>
        )}
        <View style={{height: 40}} />
        <CustomButton
          text="Logout"
          color={'#0000FF'}
          width="100%"
          fontSize={15}
          borderRadius={10}
          onPress={this.logout}
        />
        <View style={{marginBottom: 100}} />
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
        <RBSheetContent
          rbSheet={true}
          todoFocused={this.state.todoFocused}
          postFocused={this.state.postFocused}
          focusTodo={() =>
            this.setState(
              {
                todoFocused: true,
                postFocused: false,
                isLoading: true,
                todos: [],
                posts: [],
              },
              () =>
                this.props.navigation.navigate('HomeScreen', {
                  todoFocused: true,
                  postFocused: false,
                }),
            )
          }
          focusPosts={() =>
            this.setState(
              {
                todoFocused: false,
                postFocused: true,
                isLoading: true,
                todos: [],
                posts: [],
              },
              () =>
                this.props.navigation.navigate('HomeScreen', {
                  todoFocused: false,
                  postFocused: true,
                }),
            )
          }
        />
      </RBSheet>
      <RBSheetContent
        additionalStyle={styles.footerBottom}
        showFocused={false}
        rbSheet={false}
        profileFocused={true}
        focusShow={() => {
          this.RBSheet.open();
        }}
        focusPosts={() =>
          this.setState({todoFocused: false, postFocused: true})
        }
        // focusShow={() => this.props.navigation.goBack()}
        focusProfile={() => undefined}
      />
    </SafeAreaView>
  );
}
