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
import ActionButton from 'react-native-action-button'; // use for action button
import Moment from 'moment';
import { firebaseApp, BarRef, rootRef, storageRef } from '../Firebase/Firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Content, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const uploadImage = uri => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storageRef.ref('images').child(`${sessionId}` + '.jpg');
    let mime = 'image/jpg';
    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(uri, { contentType: mime });
        //  return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
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
      lastLat: null,
      lastLong: null,
      barid: '',
      barname: '',
      bardetails: '',
      baraddress: '',
      createdate: '',
      updatedate: '',
      isLoading: false,
      imageUrl: [''],
      img1: [''],
      dataSource: ds.cloneWithRows(['', '']),
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

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        // alert(JSON.stringify(position));
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => console.log(error)
    );
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  uploadImage1() {
    this.setState({
      isLoading: true
    });

    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log('No of images ...', images);
      var img = [''];
      var newimg = [];
      for (var i = 0; i < images.length; i++) {
        console.log('No of images ...', images[i].path);

        newimg.push({ url: images[i].path });

        if (i === 0) {
          const source = { uri: images[i].path };
          this.setState({
            avatarSource: source
          });
        }

        // uploadImage(images[i].path)
        //   .then(url => {
        //     img.push(url);
        //   })
        //   .catch(error => console.log(error));
      }

      this.setState({
        img1: newimg
      });

      this.getdata();

      this.setState({
        imageUrl: img,
        isLoading: false
      });
    });
  }

  getdata() {
    var newDs = [];
    newDs = this.state.img1.slice();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.img1),
      img1: newDs
    });
    console.log(this.state.dataSource);
  }

  _addBar() {
    this.setState({
      isLoading: true
    });
    var date = new Date().toString();
    const { navigate } = this.props.navigation;
    const barId = rootRef.push().key;

    Moment.locale('en');
    let createddate = new Date();
    this.state.createdate = createddate;
    const barid1 = Moment(createdate).format('DDMMYYYYhhmmss');

    const {
      barname,
      bardetails,
      baraddress,
      createdate,
      updatedate,
      imageUrl
    } = this.state;

    const newBar = {
      bar_id: barid1,
      bar_name: barname,
      bar_description: bardetails,
      bar_address: baraddress,
      created_date: createddate,
      updated_date: createddate,
      bar_gallery: {
        imageUrl: imageUrl
      }
    };

    console.log('newBar', newBar);

    let _this = this;
    setTimeout(() => {
      //BarRef.child(barid1).set(newBar);

      _this.setState({
        isLoading: false
      });

      this.refs.toastgreen.show('Bar Added Successfully!!');
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);
    }, 5000);
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

  render() {
    let loading = this.state.isLoading;

    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.mapViewStyle}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}
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
              <TouchableOpacity onPress={this.uploadImage1.bind(this)}>
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
