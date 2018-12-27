import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  Platform,
  Modal,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
// import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Moment from 'moment';
import { storageRef } from '../../components/Firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Content, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import PlacesApi from '../../api/places.api';
import { getUserLocation } from '../../helpers/location.helper';
const uuidv1 = require('uuid/v1');

const Places = new PlacesApi();

const defaultZoom = {
  latitudeDelta: 0.00922 * 0.1,
  longitudeDelta: 0.00421 * 0.1
};

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    const barimagesDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      mapRegion: null,
      barname: '',
      bardetails: '',
      baraddress: '',
      isLoading: false,
      images: [],
      dataSource: ds.cloneWithRows(['']),
      barimagesDataSource: barimagesDataSource
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Submit New Bar',
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ padding: 10 }}>
          <Icon
            type="Feather"
            name="arrow-left"
            style={{ color: Colors.black, fontSize: 25 }}
          />
        </View>
      </TouchableOpacity>
    )
  });

  onRegionChange(region) {
    this.setState({
      mapRegion: region
    });
  }

  uploadImage() {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true
    })
      .then(image => {
        this.setState({
          isLoading: true,

          avatarSource: {
            uri: image.path,
            dataSource: this.state.dataSource.cloneWithRows(image.path)
          }
        });
        const imageRef = storageRef.ref('images').child(uuidv1());
        let mime = 'image/jpg';
        imageRef
          .put(image.path, { contentType: mime })
          .then(() => {
            return imageRef.getDownloadURL();
          })
          .then(url => {
            console.log('URL', url);
            this.setState({
              images: [url],
              isLoading: false
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async _addBar() {
    this.setState({
      isLoading: true
    });
    var date = new Date().toString();
    const { navigate } = this.props.navigation;
    const barId = 1;

    Moment.locale('en');
    let createddate = new Date();
    this.state.createdate = createddate;
    const barid1 = Moment(createdate).format('DDMMYYYYhhmmss');

    const { barname, bardetails, baraddress, createdate, images } = this.state;

    const newBar = {
      title: barname,
      description: bardetails,
      address: baraddress,
      latitude: this.state.mapRegion.latitude,
      longitude: this.state.mapRegion.longitude,
      images
    };
    console.log('newBar', newBar);

    try {
      const bar = await Places.addPlace(newBar);
      this.refs.toastgreen.show('Bar Added Successfully!!');
      this.setState({
        isLoading: false
      });
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);
    } catch (e) {
      this.setState({
        isLoading: false
      });
    }
  }

  checkName() {
    const { barname } = this.state;
    if (barname == '') {
      this.refs.toast.show('Bar Name is required');
    }
  }

  checkBarDetails() {
    const { bardetails } = this.state;

    if (bardetails == '') {
      this.refs.toast.show('Bar detail is required');
    }
  }

  checkBarAddress() {
    const { baraddress } = this.state;

    if (baraddress == '') {
      this.refs.toast.show('Bar address is required');
    }
  }

  getCurrentPosition() {
    getUserLocation().then(position => {
      this.onRegionChange({
        latitude: position[0],
        longitude: position[1],
        ...defaultZoom
      });
    });
  }

  render() {
    let loading = this.state.isLoading;

    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.mapViewStyle}
          region={this.state.mapRegion}
          showsUserLocation={false}
          followUserLocation={true}
          onMapReady={this.getCurrentPosition.bind(this)}
          onRegionChange={this.onRegionChange.bind(this)}
          //onPress={this.onMapPress.bind(this)}
        />
        <Image
          style={Styles.centerMarker}
          source={require('../../../assets/img/marker.png')}
        />
        <Content>
          <View style={Styles.bottomView}>
            <TextInput
              style={Styles.barnameText}
              onChangeText={text => this.setState({ text })}
              placeholder="Bar Name..."
              placeholderTextColor="#787686"
              underlineColorAndroid="transparent"
              ref="txtbname"
              returnKeyType={'next'}
              onSubmitEditing={event => {
                this.refs.txtdesc.focus();
              }}
              onChangeText={barname => (this.state.barname = barname)}
              onBlur={() => this.checkName()}
            />

            <TextInput
              style={Styles.addressText}
              onChangeText={text => this.setState({ text })}
              placeholder="Tell us more about this bar"
              placeholderTextColor="#787686"
              underlineColorAndroid="transparent"
              ref="txtdesc"
              returnKeyType={'next'}
              onSubmitEditing={event => {
                this.refs.txtaddress.focus();
              }}
              onChangeText={bardetails => (this.state.bardetails = bardetails)}
              onBlur={() => this.checkBarDetails()}
            />

            <TextInput
              style={Styles.addressText}
              onChangeText={text => this.setState({ text })}
              placeholder="Bar Address"
              placeholderTextColor="#787686"
              underlineColorAndroid="transparent"
              ref="txtaddress"
              returnKeyType={'done'}
              onChangeText={baraddress => (this.state.baraddress = baraddress)}
              onBlur={() => this.checkBarAddress()}
            />

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={this.uploadImage.bind(this)}>
                <Image
                  style={Styles.addPhotoImage}
                  source={
                    this.state.avatarSource == null
                      ? require('../../../assets/img/defaultaddPhoto.png')
                      : this.state.avatarSource
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.addView}>
              <ListView
                removeClippedSubviews={false}
                horizontal={true}
                dataSource={this.state.dataSource}
                renderRow={data => (
                  <TouchableOpacity onPress={this.uploadImage.bind(this)}>
                    <View style={Styles.addView}>
                      <Image
                        style={Styles.addDefaultImage}
                        source={
                          this.state.avatarSource == null
                            ? require('../../../assets/img/addDefaultImage.png')
                            : { uri: data.url }
                        }
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <TouchableOpacity
              style={Styles.buttonAddBar}
              onPress={this._addBar.bind(this)}
            >
              <Text style={Styles.addBarText}>ADD BAR</Text>
            </TouchableOpacity>
          </View>
        </Content>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          onRequestClose={() => {
            console.log('close modal');
          }}
        >
          <View style={Styles.modalBackground}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={Colors.colorPrimary}
            />
          </View>
        </Modal>

        <Toast
          ref="toast"
          style={{
            backgroundColor: 'red',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          position="top"
          positionValue={70}
          fadeInDuration={750}
          fadeOutDuration={3000}
          opacity={0.8}
        />

        <Toast
          ref="toastgreen"
          style={{
            backgroundColor: '#167c04',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          position="top"
          positionValue={70}
          fadeInDuration={750}
          fadeOutDuration={3000}
          opacity={0.8}
        />
      </View>
    );
  }
}
