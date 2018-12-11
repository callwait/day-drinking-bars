import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    orientation,
    StyleSheet
} from 'react-native';
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import Colors from '../../styles/colors'; // use for style and color

export default {
 container: {
    flex: 1,
    height: '100%',
    width: '100%',
  //  backgroundColor: Colors.backgroundSecondary,
  ///  paddingHorizontal:width/50,
//paddingTop: Platform.OS === 'ios' ? height/60 : 0,
   // paddingBottom: Platform.OS === 'ios' ? height == 812 ? height/35 : height/60 : height/70
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButton: {
   width: 75,
   height: 75,
   borderRadius: 85/2,
   backgroundColor: 'rgba(252, 253, 253, 0.9)',
   justifyContent: 'center',
   alignItems: 'center',
   shadowColor: 'black',
   shadowRadius: 8,
   shadowOpacity: 0.12,
   opacity: .6,
   zIndex: 10,
},

};
