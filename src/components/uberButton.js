import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Button, Text } from 'native-base';
import uberLogo from '../../assets/img/uberLogo.png';
import { getUserLocation } from '../helpers/location.helper';
import config from '../../config';
const { uberClientID } = config;

const getUberDeepLink = (
  pickupLatitude,
  pickupLongitude,
  dropoffLatitude,
  dropoffLongitude
) =>
  `uber://?client_id=${uberClientID}&action=setPickup&pickup[latitude]=${pickupLatitude}&pickup[longitude]=${pickupLongitude}&dropoff[latitude]=${dropoffLatitude}&dropoff[longitude]=${dropoffLongitude}&link_text=DayDrinkingBars`;

const getUberUniversalLink = (
  pickupLatitude,
  pickupLongitude,
  dropoffLatitude,
  dropoffLongitude
) =>
  `https://m.uber.com/ul/?client_id=${uberClientID}&action=setPickup&pickup[latitude]=${pickupLatitude}&pickup[longitude]=${pickupLongitude}&dropoff[latitude]=${dropoffLatitude}&dropoff[longitude]=${dropoffLongitude}&link_text=DayDrinkingBars`;

const styles = {
  uberButton: {
    width: 105,
    height: 40,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 25,
    left: 15,
    marginBottom: 10,
    justifyContent: 'flex-end'
  }
};

export default class UberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0
    };
    this._getUserLocation();
    this.handleClick = this.handleClick.bind(this);
  }

  _getUserLocation() {
    getUserLocation().then(position => {
      console.log('position', position);
      this.setState({
        currentLatitude: position[0],
        currentLongitude: position[1]
      });
    });
  }

  handleClick() {
    const deepLink = getUberDeepLink(
      this.state.currentLatitude,
      this.state.currentLongitude,
      this.props.destination[0],
      this.props.destination[1]
    );
    const universalLink = getUberUniversalLink(
      this.state.currentLatitude,
      this.state.currentLongitude,
      this.props.destination[0],
      this.props.destination[1]
    );

    console.log('>> deepLink1', deepLink);
    console.log('>> deepuniversalLinkLink1', universalLink);

    Linking.canOpenURL(deepLink).then(supported => {
      console.log('supported', supported);
      if (supported) {
        return Linking.openURL(deepLink);
      } else {
        return Linking.openURL(universalLink);
      }
    });
  }

  render() {
    return (
      <Button style={styles.uberButton} onPress={this.handleClick}>
        <Image source={uberLogo} />
        <Text style={{ color: 'white' }}>Uber</Text>
      </Button>
    );
  }
}
