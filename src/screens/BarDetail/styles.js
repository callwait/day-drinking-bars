import React, { Component } from 'react';
import { Platform, Dimensions, orientation } from 'react-native';
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import Colors from '../../styles/colors'; // use for style and color

export default {
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: width / 20,
    paddingTop: Platform.OS === 'ios' ? height / 60 : 0,
    paddingBottom:
      Platform.OS === 'ios'
        ? height == 812
          ? height / 35
          : height / 60
        : height / 70
  },
  navigationTitle: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '600'
  },
  titleText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '400'
  },
  RatingText: {
    fontSize: width / 25,
    color: Colors.darkgray,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 10,
    paddingTop: height / 90
  },
  Starimage: {
    height: height / 50,
    width: width / 5
  },
  RateView: {
    flexDirection: 'row'
  },
  detailText: {
    color: Colors.darkgray,
    fontWeight: 'bold',
    paddingTop: height / 50,
    fontSize: 14
  },
  galleryView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  gallertText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '400'
  },
  showmoreText: {
    color: Colors.darkgray,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: width / 2.5
  },
  atmosphereImage: {
    height: height / 5,
    width: width / 2.8,
    marginTop: 10,
    borderRadius: 8
  },
  atmosphereImageLast: {
    height: height / 5,
    width: width / 2.8,
    marginTop: 10,
    borderRadius: 8,
    marginLeft: 10
  },
  atmosphereView: {
    flexDirection: 'row'
  },
  streetViewImage: {
    height: height / 10,
    width: width / 1.9,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 8
  },
  familyImage: {
    height: height / 11.5,
    width: width / 3.2,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 8
  },
  moreImage: {
    height: height / 11.5,
    width: width / 5.3,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 8
  },
  beericonImage: {
    height: 30,
    width: 25
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
};
