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
    backgroundColor: '#fff'
  },
  gradientView: {
    backgroundColor: '#F0A322',
  },
  linearGradient: {
    flex: 1,    
    paddingLeft: 15,
    paddingRight: 15,    
  },
  profileImg: {
    position: 'absolute',
    width: width/1.06,
    height: height/3.5,
    bottom: -6,
    marginLeft:10,
    marginRight: 10,    
    borderRadius: 8,    
  },
  detailText:{
    color: Colors.darkgray,
    fontWeight: '400',
    paddingTop: height/50,
    fontSize: 14,        
  },
  titleText: {    
    color: Colors.black,
    fontSize: 18,
    fontWeight:'400',    
  },   
  detailView: {
    backgroundColor: Colors.backgroundPrimary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    shadowColor: Colors.darkgray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingBottom: 10,
    marginLeft: 11,
    marginRight: 11,
    padding: 25,
  },
  toastImg:{
    marginTop: 18,
    height: 15,
    width: 15
  },
  CircleShapeView: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: Colors.colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
