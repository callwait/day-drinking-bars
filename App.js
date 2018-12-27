import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  AsyncStorage
} from 'react-native';

import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Content, Icon } from 'native-base';
import Colors from './src/styles/colors';

import LogInPage from './src/screens/LogIn';
import SignUpPage from './src/screens/SignUp';
import HomePage from './src/screens/Home';
import BarDetailPage from './src/screens/BarDetail';
import BarListPage from './src/screens/BarList';
import MyProfilePage from './src/screens/MyProfile';
import SettingsPage from './src/screens/Settings';
import AddBarPage from './src/screens/AddBar';
import ReviewPage from './src/screens/Review';
import AddReviewPage from './src/screens/AddReview';

export const HomeStack = StackNavigator({
  Home: { screen: HomePage },
  BarList: { screen: BarListPage },
  BarDetail: { screen: BarDetailPage },
  AddBar: { screen: AddBarPage },
  Review: { screen: ReviewPage },
  AddReview: { screen: AddReviewPage }
});

export const MyProfileStack = StackNavigator({
  MyProfile: { screen: MyProfilePage }
});

export const SettingsStack = StackNavigator({
  Settings: { screen: SettingsPage }
});

export const TabStack = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Feather"
            name="map"
            style={{ fontSize: 20, color: tintColor }}
          />
        )
      }
    },
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Feather"
            name="users"
            style={{ fontSize: 20, color: tintColor }}
          />
        )
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Feather"
            name="sliders"
            style={{ fontSize: 20, color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.colorPrimary,
      inactiveTintColor: '#000000',
      activeBackgroundColor: Colors.colorSecondary,
      inactiveBackgroundColor: Colors.colorSecondary,
      style: {
        borderTopColor: Colors.lightGray
      }
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

export const PrimaryNav = StackNavigator(
  {
    LogIn: { screen: LogInPage },
    SignUp: { screen: SignUpPage },
    TabStack: { screen: TabStack }
  },
  {
    headerMode: 'none'
  }
);

export const SecondNav = StackNavigator(
  {
    TabStack: { screen: TabStack },
    LogIn: { screen: LogInPage }
  },
  {
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: ''
    };
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DayDrinking App Location Permission',
          message: 'DayDrinking App needs access to your Location '
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      //console.warn(err)
    }
  }
  /**
   * call when view will ready to load
   */
  async componentWillMount() {
    var value = await AsyncStorage.getItem('UserId');
    console.log('UserId....', value);
    this.setState({
      isLoggedIn: value
    });
  }

  render() {
    if (this.state.isLoggedIn == null || this.state.isLoggedIn == '') {
      return <PrimaryNav />;
    } else if (this.state.isLoggedIn != null || this.state.isLoggedIn != '') {
      return <SecondNav />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

console.disableYellowBox = true;
