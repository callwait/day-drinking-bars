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
    paddingHorizontal:width/50
  },
  box: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 2,
    shadowColor: Colors.darkgray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingBottom: 10,
    elevation: 3,
    marginHorizontal: width/40,
    marginBottom: width/40,
    },
  cardimage:{
    flex:1,
    height: height/4,
  },
  cardTitle:{
    fontSize: width/25,
    color: Colors.black,
    paddingHorizontal: width/25,
    fontWeight: '400',
    paddingTop: height/40,
    fontSize: 18,
  },
  RatingText:{
    fontSize: width/25,
    color: Colors.darkgray,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 10,
    paddingTop: height/70
  },
  Starimage:{
    height: height/50,
    width: width/5,
  },
  RateView:{
    paddingHorizontal: width/25,
    flexDirection:'row',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
};
