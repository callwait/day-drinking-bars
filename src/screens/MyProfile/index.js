import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ImageBackground
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
import LinearGradient from 'react-native-linear-gradient';

/**
*  set constuctor and initial configuration of page
*/
export default class MyProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "MyProfile",    
    headerTitleStyle: { color: '#fff'},
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
    },
    headerTintColor: '#fff',
  });


  /**
  * view design with list view
  */  
  render() {

    return (
      <View style={Styles.container}>  
      <View style={{height: '50%'}}>
        <LinearGradient colors={['#f5c32e', '#f0a422', '#e87511']} style={Styles.linearGradient}>
           <Image style={Styles.profileImg}
                  source={require('../../../assets/img/2.png')}
            />                
        </LinearGradient>
      </View>   
      <View style={Styles.detailView}>
        <Text style={Styles.titleText}>
          Anthony Gonzalez
        </Text>

        <Text style={Styles.detailText}>
          Whether you are shopping for the grin that's always in or eating a plate piled, you're gonna' have a good time at Eskimo Joe's
        </Text>
         <View style={{flexDirection: 'row'}}>
          <Image style={Styles.toastImg}
                  source={require('../../../assets/img/toasticon.png')}
          />     
          <Text style={{marginTop: 18, marginLeft: 5}}>
            Toast (85)
          </Text>   
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon type="Feather" name="mail"style={{marginTop: 18,color:"#D3D3D3",fontSize:15}}/>    
          <Text style={{marginTop: 16, marginLeft: 5}}>
            gonzalez@hotmail.com
          </Text>   
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon type="Feather" name="map-pin"  style={{marginTop: 18,color:"#D3D3D3",fontSize:15}}/>    
          <Text style={{marginTop: 18, marginLeft: 5, color: Colors.darkgray}}>
            Chicago, IL
          </Text>   
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row'}}>
            <Text style={{color: Colors.darkgray, marginTop: 6, marginRight: 5}}>Edit Profile</Text>
            <TouchableOpacity>
              <View style={Styles.CircleShapeView}>
                <Icon type="Feather" name="edit-2" style={{fontWeight: 'bold',color:"#fff",fontSize:20}} />
              </View>
            </TouchableOpacity>
            </View>
          </View>
      </View>         
    </View>
    );
  }
}