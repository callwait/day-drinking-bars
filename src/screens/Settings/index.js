import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ListView,
  Image,
  Switch,
  ImageBackground,
  AsyncStorage,
  Alert,
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
const { width, height } = Dimensions.get('window'); // Detect screen width and height

/**
*  set constuctor and initial configuration of page
*/
export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled : true
    };
  }

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Settings",
    headerTintColor: Colors.black,
    headerTitleStyle: { color: Colors.black},
    headerStyle: {
      backgroundColor: Colors.backgroundPrimary,
      borderBottomColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0
    },
  });

  setToggle(visible) {

      this.setState({toggled: visible});
    
  }
  /**
  * call when view will ready to load 
  */
componentWillMount() {
 
}

  /**
   * user logout method
   */
  _LogOut =  () => {
    console.log("logout call")
    const { navigate } = this.props.navigation;

        // AsyncStorage.setItem('UserId','');
        AsyncStorage.clear();

        navigate('LogIn');

  }
  /**
  * logout alert.
  */
 logout = () => {

  Alert.alert(
    '',
    'Are you sure you want to  Logout ?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => this._LogOut()},
    ],
    { cancelable: false }
  )
}
  /**
  * view design with list view
  */  
  render() {

    return (
      <View style={Styles.container}>
        
        <TouchableOpacity style={Styles.view}>
          <Text style={Styles.mainText}>My Profile</Text>
          <Text style={Styles.subText}>Edit</Text>
          <Icon
            type="Feather"
            name='chevron-right'
            style={{marginVertical:width/30,fontSize:20,color:Colors.colorPrimary}}
            underlayColor={Colors.colorPrimary}/>
        </TouchableOpacity>

        <View style={{backgroundColor:Colors.lightGray,height:1}}/>

        <TouchableOpacity style={Styles.view}>
                
          <Text style={Styles.mainText}>Language</Text>
          <Text style={Styles.subText}>English</Text>
          <Icon
            type="Feather"
            name='chevron-right'
            style={{marginVertical:width/30,fontSize:20,color:Colors.colorPrimary}}
            underlayColor={Colors.colorPrimary}/>
        </TouchableOpacity>

        <View style={{backgroundColor:Colors.lightGray,height:1}}/>

        <TouchableOpacity style={Styles.view}>
                
          <Text style={Styles.mainText}>Push Notification</Text>
          <Switch 
            onValueChange={() => {
              this.setToggle(!this.state.toggled);
            }}
            value={ this.state.toggled } 
          /> 
        </TouchableOpacity>

        <View style={{backgroundColor:Colors.lightGray,height:1}}/>

        <TouchableOpacity style={Styles.view}>
                
          <Text style={Styles.mainText}>About Us</Text>
          <Icon
            type="Feather"
            name='chevron-right'
            style={{marginVertical:width/30,fontSize:20,color:Colors.colorPrimary}}
            underlayColor={Colors.colorPrimary}/>
        </TouchableOpacity>
      
        <View style={{backgroundColor:Colors.lightGray,height:1}}/>

        <TouchableOpacity style={Styles.view}>
          
          <Text style={Styles.mainText}>Privacy Policy</Text>
          <Icon
            type="Feather"
            name='chevron-right'
            style={{marginVertical:width/30,fontSize:20,color:Colors.colorPrimary}}
            underlayColor={Colors.colorPrimary}/>
        </TouchableOpacity>

        <View style={{backgroundColor:Colors.lightGray,height:1}}/>

        <TouchableOpacity style={Styles.buttonLogOut} onPress={() => this.logout()}>
          <Text style={Styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    
    );
  }
}