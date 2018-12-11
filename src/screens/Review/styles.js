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
   // paddingHorizontal:width/40,
    paddingTop: Platform.OS === 'ios' ? height/60 : 0,
    paddingBottom: Platform.OS === 'ios' ? height == 812 ? height/35 : height/60 : height/70
  },
 
  box: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    //shadowColor: '#000',
   // shadowOffset: { width: 0, height: 1 },
   // shadowOpacity: 0.5,
    //shadowRadius: 5,
    padding: 10
    
},
  
 ReviewUserTitle:{
    fontSize: width/25,
    color: Colors.black,
    fontWeight: '400',
    textAlign:'center',
    fontSize: 20,
},
RatingText:{
  fontSize: width/25,
  color: Colors.darkgray,
  fontWeight: '900',
  fontSize: 12,
  marginLeft: 10
},
Starimage:{
  height: height/50,
  width: width/5,
},
RateView:{
  //paddingHorizontal: width/25,
  flexDirection:'row',
  height: 20,
  marginTop: 0,
},
Outof5Text: {
    marginLeft: width/4.5,
    height: 20,
    color: Colors.darkgray,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 0,
},
BigrateText:{
    marginLeft: width/6,
    height: 70,
    color: Colors.colorPrimary,
    fontSize: 60,
    fontWeight: '900',
    marginTop: 0,
},
mainview:
{
    flexDirection:'row',
    backgroundColor: '#F7F7F7',
    height: height/6,
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: width/30,
},
ListMainView:{
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal:width/40,
    marginTop: 20,
},
TotalrateText:{
    fontSize: width/25,
    color: Colors.darkgray,
    fontWeight: 'bold',
    fontSize: 12,
     height: 15,
   // marginLeft: 15
},

ReviewShortDesText:{
    fontSize: 20,
    color: Colors.black,
    fontWeight: '600',
    marginTop: 0,
    height: 25,
    textAlign:'left'
},
ReviewUserText:
{
    textAlign:'right',
    fontSize: 15,
    color: Colors.black,
    fontWeight: '400',
    marginTop: 0,
    height: 25,
    marginLeft: width/2.5
},
DisplpayDateText:{
    textAlign:'right',
    fontSize: 15,
    color: Colors.darkgray,
    fontWeight: 'bold',
    height: 30,
    marginLeft: width/8
},

};
