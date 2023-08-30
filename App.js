import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { getMyObject } from "./src/components/AsyncStorage";
import { Image } from "react-native";
import { styles } from "./src/components/CommonStyles";
import ItemScreen from "./src/screens/ItemScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  state = {
    initialRouteName: '',
    isLoggedIn: false,
    landingPageOpen: true
  }
  async componentDidMount() {
    let email = await getMyObject('email');
    let password = await getMyObject('password');
    if(email == null || password == null) {
      this.setState({
        initialRouteName: 'LoginScreen',
        isLoggedIn: false
      })
    } else {
      this.setState({
        initialRouteName: 'HomeScreen', 
        isLoggedIn: true
      })
    }

    setTimeout(() => this.setState({landingPageOpen: false}), 3000);
  }
  render = () => (this.state.landingPageOpen ? (
    <Image
      source={require('./assets/launch_screen.jpg')}
      style={styles.splashStyle}
    />
  ) :
    <NavigationContainer>
      <Stack.Navigator initialRouteName={this.state.isLoggedIn ? 'HomeScreen' : 'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ItemScreen"
          component={ItemScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}