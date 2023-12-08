import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {styles} from '../components/CommonStyles';
import {getMyObject} from '../components/AsyncStorage';
import {
  callGetApi,
  endPoints,
  parseApiResponseMessage,
} from '../components/Api';
import RBSheet from 'react-native-raw-bottom-sheet';
import {setGreetingMessage} from '../components/SetGreetingMessage';
import RBSheetContent from '../components/RBSheetContent';
import SuccessErrorPopup from '../components/SuccessErrorPopup';

export default class HomeScreen extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    greetingMessage: '',
    isLoading: false,
    todoFocused: true,
    postFocused: false,
    showFocused: true,
    profileFocused: false,
    todos: [],
    posts: [],
    isErrorPopup: false,
    errorMsg: '',
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
    this.props.navigation.addListener('focus', async () => {
      let name = await getMyObject('name');
      let email = await getMyObject('email');
      let password = await getMyObject('password');
      !this.props.route.params && this.RBSheet && this.RBSheet.open();
      this.setState(
        {
          name: parseApiResponseMessage(name),
          email: parseApiResponseMessage(email),
          password: parseApiResponseMessage(password),
          greetingMessage: setGreetingMessage(),
          isLoading: true,
          todoFocused: this.props.route.params
            ? this.props.route.params.todoFocused
            : true,
          postFocused: this.props.route.params
            ? this.props.route.params.postFocused
            : false,
          showFocused: true,
          todos: [],
          posts: [],
          profileFocused: false,
          isErrorPopup: false,
          errorMsg: '',
        },
        this.fetchList,
      );
    });
  }

  fetchList = async () => {
    if (this.state.todoFocused) {
      let response = await callGetApi(endPoints.todos);
      response.map(item => (item.show = false));
      this.setState({isLoading: false, todos: response});
      this.RBSheet.close();
      this.props.navigation.setParams(false);
    } else {
      let response = await callGetApi(endPoints.posts);
      response.map(item => (item.show = false));
      this.setState({isLoading: false, posts: response});
      this.RBSheet.close();
      this.props.navigation.setParams(false);
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }

  render = () => (
    <SafeAreaView style={[styles.container, styles.centerAlign]}>
      <View style={styles.greetingMessageContainer}>
        <Text style={[styles.greetingMessage, styles.greetingsExtraStyle]}>
          {this.state.greetingMessage}
        </Text>
        <Text style={[styles.greetingMessage, styles.greetingsExtraNameStyle]}>
          {this.state.name}
        </Text>
      </View>
      <View style={{height: 50}} />
      {this.state.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={'#0000FF'}
          style={{marginVertical: 30}}
        />
      ) : (
        <FlatList
          data={this.state.todoFocused ? this.state.todos : this.state.posts}
          extraData={
            this.state.todoFocused ? this.state.todos : this.state.posts
          }
          initialNumToRender={1000}
          showsVerticalScrollIndicator={false}
          keyExtractor={({item, index}) => index}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.navigation.navigate('ItemScreen', {
                  item,
                  todoFocused: this.state.todoFocused,
                  postFocused: this.state.postFocused,
                });
              }}
              style={styles.listItemStyle}>
              <Text
                style={[
                  styles.listTitleTextStyle,
                  {fontWeight: 'bold', fontSize: 17},
                ]}>
                {item.title}
              </Text>
              {item.body && (
                <Text style={[styles.itemBodyStyle, {fontSize: 17}]}>
                  {item.body}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      <View style={{marginBottom: 100}} />

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
              this.fetchList,
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
              this.fetchList,
            )
          }
        />
      </RBSheet>
      <RBSheetContent
        additionalStyle={styles.footerBottom}
        showFocused={this.state.showFocused}
        rbSheet={false}
        profileFocused={this.state.profileFocused}
        focusShow={() =>
          this.setState({showFocused: true, profileFocused: false}, () =>
            this.RBSheet.open(),
          )
        }
        focusProfile={() =>
          this.props.navigation.navigate('ProfileScreen', {
            todoFocused: this.state.todoFocused,
            postFocused: this.state.postFocused,
          })
        }
      />
      {this.state.isErrorPopup && (
        <SuccessErrorPopup title={'Error'} message={this.state.errorMsg} />
      )}
    </SafeAreaView>
  );
}
