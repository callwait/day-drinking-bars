import React, { Component } from 'react';
import { Platform, Dimensions, orientation } from 'react-native';
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import Colors from '../../styles/colors'; // use for style and color

export default {
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
    ///  paddingHorizontal:width/50,
    //paddingTop: Platform.OS === 'ios' ? height/60 : 0,
    // paddingBottom: Platform.OS === 'ios' ? height == 812 ? height/35 : height/60 : height/70
  },
  mapViewStyle: {
    height: '40%',
    width: '100%'
  },
  bottomView: {
    flex: 1,
    padding: width / 50
  },
  barnameText: {
    flex: 1,
    height: 50,
    color: '#2F2F2F',
    fontSize: 24,
    fontWeight: '500',
    borderColor: 'transparent'
  },
  addressText: {
    flex: 1,
    height: 40,
    color: '#2F2F2F',
    fontSize: 16,
    fontWeight: '500',
    borderColor: 'transparent'
  },
  addPhotoImage: {
    height: height / 5,
    width: width / 1.09,
    marginVertical: height / 50
  },
  buttonAddBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    marginHorizontal: width / 12,
    backgroundColor: Colors.colorPrimary,
    marginTop: height / 25,
    borderRadius: 30,
    elevation: 4,
    justifyContent: 'center'
  },
  addBarText: {
    flex: 1,
    color: Colors.colorSecondary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  addDefaultImage: {
    height: height / 14,
    width: width / 7.0,
    marginLeft: 15,
    borderRadius: 3
  },
  addView: {
    flexDirection: 'row',
    height: 100
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  centerMarker: {
    left: '50%',
    marginLeft: -16,
    marginTop: -16,
    position: 'absolute',
    top: '20%',
    width: 32,
    height: 32
  }
};
