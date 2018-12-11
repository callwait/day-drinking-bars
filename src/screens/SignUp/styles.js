import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    orientation
} from 'react-native';
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import Colors from '../../styles/colors'; // use for style and color

export default {
 container: {
    flex: 1,
    alignItems: 'center',
    height:height,
    backgroundColor: Colors.backgroundPrimary,
  },
  logo:{
    marginTop : height/10,
    width : 150,
    height : 133
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: width/12,
    backgroundColor: '#F5F5F5'
  },
  textInput:{
    flex:1,
    fontSize: 16,
  },
  buttonSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    marginHorizontal: width/12,
    backgroundColor: Colors.colorPrimary,
    marginTop:height/25,
    borderRadius: 30,
    elevation: 4,
    justifyContent:'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: '#D3D3D3',
  },
  signupText: {
    flex : 1,
    color: Colors.colorSecondary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold'
  },
  memberText: {
    color: '#787686',
    fontSize: 16,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? height/9 : height/30,
  },
  linkText:{
    flex : 1,
    color: Colors.colorPrimary,
    fontSize: 16,
    textAlign: 'center',
    marginTop:15,
    fontWeight:'bold',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
};
