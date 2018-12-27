import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
import { Icon } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AdMobBanner } from 'react-native-admob';
import ActionButton from 'react-native-action-button'; // use for action button
import PlacesApi from '../../api/places.api';
import { getUserLocation } from '../../helpers/location.helper';

const Places = new PlacesApi();
const defaultZoom = {
  latitudeDelta: 0.00922 * 1.5,
  longitudeDelta: 0.00421 * 1.5
};
let debounce = false;
// import flagPinkImg from '../../assets/flagPinkImg';

/**
 * set banner
 */
const BannerExample = ({ style, title, children, ...props }) => (
  <View
    {...props}
    style={[
      {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
      },
      style
    ]}
  >
    {/* <Text style={{margin:10,fontSize:20}}>{title}</Text> */}
    <View>{children}</View>
  </View>
);
/**
 *  set constuctor and initial configuration of page
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      bars: [],
      username: false
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('UserFullName').then(
      function(value) {
        this.setState({ username: value });
        this.props.navigation.setParams({
          getCurrentPosition: this.getCurrentPosition.bind(this),
          username: value
        });
      }.bind(this)
    );
  }

  getCurrentPosition() {
    getUserLocation().then(position => {
      this.onRegionChange({
        latitude: position[0], // 41.890312,
        longitude: position[1], // -87.630767
        ...defaultZoom
      });
    });
  }

  getPlaces(lat, long) {
    const diff = new Date() - debounce;
    if (diff < 200) {
      return;
    }
    debounce = new Date();
    Places.getNearPlaces(lat, long)
      .then(bars => {
        console.log('ger bars2');
        this.setState({ bars });
        this.props.navigation.setParams({
          places: bars
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onRegionChange(mapRegion) {
    if (typeof mapRegion.latitude !== 'number') return;
    this.setState({ mapRegion });
    console.log('mapRegion', mapRegion);
    this.getPlaces(mapRegion.latitude, mapRegion.longitude);
  }

  onPress = () => {
    alert('ads');
  };

  /**
   *  set navigation bar with icon
   */
  static navigationOptions = ({ navigation, screenProps }) => {
    const name = navigation.getParam('username');
    return {
      title: name ? 'Welcome Back, ' + name : '',
      headerTitleStyle: { color: Colors.black },
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        position: 'absolute',
        height: 50,
        top: 0,
        left: 0,
        right: 0
      },
      headerTintColor: '#fff',
      headerLeft: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BarList', {
              places: navigation.state.params.places
            })
          }
        >
          <View style={{ padding: 10 }}>
            <Icon
              type="Feather"
              name="menu"
              style={{ color: '#000', fontSize: 25 }}
            />
          </View>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.state.params.getCurrentPosition()}
        >
          <View style={{ padding: 10 }}>
            <Image
              style={{ height: 20, width: 20, paddingRight: 5 }}
              source={require('../../../assets/img/direction.png')}
            />
          </View>
        </TouchableOpacity>
      )
    };
  };

  /**
   * view design with list view
   */

  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onMapReady={this.getCurrentPosition.bind(this)}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        >
          {this.state.bars.map(bar => (
            <MapView.Marker
              key={bar.id}
              coordinate={{
                latitude: bar.loc.coordinates[1],
                longitude: bar.loc.coordinates[0]
              }}
              title={bar.title}
              description={bar.description}
            >
              <MapView.Callout tooltip>
                <TouchableHighlight
                  onPress={() => navigate('BarDetail', { id: bar.id })}
                  underlayColor="#dddddd"
                >
                  <View style={{ backgroundColor: 'orange' }}>
                    <Text>
                      {bar.title}
                      {'\n'}
                      {bar.description}
                    </Text>
                  </View>
                </TouchableHighlight>
              </MapView.Callout>
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
          onPress={() => this.props.navigation.navigate('AddBar')}
        >
          <Icon
            type="Feather"
            name="plus"
            style={{ color: Colors.colorPrimary, fontSize: 25 }}
          />
        </ActionButton>
      </View>
    );
  }
}
