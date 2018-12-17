import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ListView,  
  Dimensions,
  Image,
  AsyncStorage,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import Styles from './styles'; // importing style file
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AdMobBanner } from 'react-native-admob';
import ActionButton from 'react-native-action-button'; // use for action button
const { width, height } = Dimensions.get('window'); 
import { getBarByLocation } from '../RNFetchBlob/RNFetchBlob-mock';
// import flagPinkImg from '../../assets/flagPinkImg';

/**
 * set banner
 */
const BannerExample = ({ style, title, children, ...props }) => (
  <View {...props} style={{paddingVertical: height/1.18, alignItems: 'center',style}}>
    {/* <Text style={{margin:10,fontSize:20}}>{title}</Text> */}
    <View>
      {children}
    </View>
  </View>
);
/**
*  set constuctor and initial configuration of page
*/
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      bars: []
    };
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      getBarByLocation().then(result => {
        var bars = result.data.items.map(item => {
          // item.latitude  = region.latitude;
          // item.longitude  = region.longitude;
          return item;
        })
        this.setState({
          bars: bars
        })
      })
    this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }

     /**
  * call when view will ready to load 
  */
 async componentWillMount() {
  var value = await AsyncStorage.getItem('UserId');
  console.log("UserId....", value);
  this.setState({
    FirstLogin: value,
  });
   
} 

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      // mapRegion: region,
      // If there are no new values set the current ones
      // lastLat: lastLat,
      // lastLong: lastLong
    });
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  onPress = () => {
    alert("ads");
  }

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Welcome Back, Anthony",    
    headerTitleStyle: { color: Colors.black},    
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
    },
    headerTintColor: '#fff',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('BarList')}>
        <View style={{padding: 10}}>      
          <Icon type="Feather" name="menu" style={{color:"#000",fontSize:25}} />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
      onPress={() => alert('This is a button!')}
     >
      <View style={{padding: 10}}>      
      <Image style={{height: 20, width: 20, paddingRight: 5}}
          source={require('../../../assets/img/direction.png')}
        />
      </View>
      </TouchableOpacity>
    ),
  });


  /**
  * view design with list view
  */  
  render() {
    let navigate = this.props;
    return (
      <View style={Styles.container}>
       <MapView
          style={Styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}>
          {this.state.bars.map(bar => (
            <MapView.Marker
              coordinate={{latitude: bar.latitude, longitude: bar.longitude}}
              title={bar.title}
              description={bar.description}>
              {/* <MapView.Callout tooltip>
                <TouchableHighlight onPress= {() => navigate('BarDetail',{bar_id : bar.id})} underlayColor='#dddddd'>
                    <View style={{backgroundColor: "orange"}}>
                        <Text>{bar.title}{"\n"}{bar.description}</Text>
                    </View>
                </TouchableHighlight>
              </MapView.Callout> */}
            </MapView.Marker>
          ))}
        </MapView>
        <BannerExample>
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              onAdFailedToLoad={this.BannerErrorHandler}
              //testDevices={[AdMobBanner.simulatorId]}
            />

            </BannerExample>
      <ActionButton
            buttonColor={Colors.black}
            icon={<Icon type="Feather"  name='plus' style={{color:Colors.colorPrimary, fontSize:25}}/>}            
            onPress={() => this.props.navigation.navigate('AddBar')}/>
      </View>
    
    );
  }
}
