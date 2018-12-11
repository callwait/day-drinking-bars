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
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal:width/20,
    paddingTop: Platform.OS === 'ios' ? height/50 : 0,
    paddingBottom: Platform.OS === 'ios' ? height == 812 ? height/35 : height/60 : height/70
  },
  mainText: {
    flex:1,
    marginVertical:width/25,
    fontSize: 14,
    color:Colors.textPrimary,
    fontWeight: '400'
  },
  subText: {
    marginVertical:width/25,
    fontSize: 14,
    color:Colors.darkgray,
  },
  buttonLogOut: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#C4C5CB',
    marginTop:height/25,
    borderRadius: 30,
    elevation: 4,
    justifyContent:'center',
  },
  logoutText: {
    flex : 1,
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold'
  },
  view:{
    flexDirection:'row',
    alignItems:'center'
  }
};
