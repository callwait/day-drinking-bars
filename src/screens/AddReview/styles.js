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
    backgroundColor: '#fff',
    paddingHorizontal:width/50,
    paddingTop: Platform.OS === 'ios' ? height/60 : 0,
    paddingBottom: Platform.OS === 'ios' ? height == 812 ? height/35 : height/60 : height/70
  },
 
  ReviewTitleText: {
    marginTop: height/8,
    marginLeft: 15,
    height: 40,
    color: '#2F2F2F',
    fontSize:15,
    fontWeight: '600',
    borderColor: 'transparent'
  },
  ReviewDescText: {
   // marginTop: height/8,
    marginLeft: 15,
    height: 40,
    color: '#2F2F2F',
    fontSize: 15,
    fontWeight: '600',
    borderColor: 'transparent'
  },
  
  buttonAddBar: {
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
  },
  RateView:{
   
    flexDirection:'row',
    height: 20,
    marginTop: 20,
    marginLeft: 15,
  },
  RatingText: {
      marginLeft: 15,
      height: 20,
      color: Colors.darkgray,
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 0,
  },
};
