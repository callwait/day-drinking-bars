import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Modal
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
import { Content, Icon } from 'native-base';
import { Rating } from 'react-native-elements';
import styles from '../Home/styles';
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button'; // use for action button
import {
  firebaseApp,
  userRef,
  rootRef,
  BarRef
} from '../../components/Firebase'; // use for firebase
import FastImage from 'react-native-fast-image';
import PlacesApi from '../../api/places.api';
import UberButton from '../../components/uberButton';
import RatingsApi from '../../api/ratings.api';

const Places = new PlacesApi();
const Ratings = new RatingsApi();

const RATING_IMAGE = require('../../../assets/img/rating.png');

export default class BarDetail extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;

    this.state = {
      columns: 2,
      padding: 5,
      isLoading: false,
      id: state.params.id,
      placeInfo: {},
      rating: 0,
      showMore: false
    };
  }

  /**
   *  set navigation bar with icon
   */
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <Text style={Styles.navigationTitle}>{params.title}</Text>,
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
      ),
      headerTintColor: Colors.black,
      headerTitleStyle: { color: Colors.black },
      headerStyle: {
        backgroundColor: Colors.backgroundPrimary,
        borderBottomColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  componentWillMount() {
    Places.fetchPlace(this.state.id)
      .then(placeInfo => {
        this.setState({ placeInfo });
        this.props.navigation.setParams({
          title: placeInfo.title
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  /**
   * view design with list view
   */
  addRating = () => {
    const { id } = this.state.placeInfo;
    Ratings.add({ place: id }).then(e => {
      this.setState({ rating: e.count });
    });
  };
  render() {
    let loading = this.state.isLoading;
    const images = this.state.placeInfo.images;
    let bariImages = [];
    if (images) {
      for (let i of images) {
        if (i) {
          bariImages.push(i);
        }
      }
      console.log('bariImages', bariImages);
    }

    let mainImage = false;
    if (images && images[0]) {
      mainImage = images[0];
    }
    return (
      <View style={Styles.container}>
        <Text style={Styles.titleText}>{this.state.placeInfo.address}</Text>
        <View style={Styles.RateView}>
          <Rating
            readonly
            type="custom"
            ratingImage={RATING_IMAGE}
            ratingColor={Colors.colorPrimary}
            ratingBackgroundColor="#DAD9E2"
            ratingCount={5}
            imageSize={15}
            fractions={1}
            startingValue={0}
            onFinishRating={this.ratingCompleted}
            onStartRating={this.ratingStarted}
            style={{ paddingVertical: 8 }}
          />

          {/* <Image style={Styles.Starimage}
          source={require('../../../assets/img/ratingsimg.png')}
        /> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Review')}
          >
            <Text style={Styles.RatingText}>
              0.0/0.0 - ({this.state.rating} TOAST)
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={Styles.detailText}>
          {this.state.placeInfo.description || 'Description is empty'}
        </Text>

        <View style={Styles.galleryView}>
          <Text style={Styles.gallertText}>Bar Gallery</Text>

          <TouchableOpacity
            onPress={() => this.setState({ showMore: !this.state.showMore })}
          >
            <Text style={Styles.showmoreText}> Show More </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={Styles.atmosphereView}>
            <View>
              {bariImages[0] && (
                <FastImage
                  style={Styles.atmosphereImage}
                  source={{
                    uri: bariImages[0],
                    priority: FastImage.priority.normal
                  }}
                  onLoadEnd={() => {
                    this.setState({ isLoading: false });
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              )}
            </View>

            <View style={{ flexDirection: 'column' }}>
              <View>
                {bariImages[1] != null ? (
                  <FastImage
                    style={Styles.streetViewImage}
                    source={{
                      uri: bariImages[1],
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                ) : null}
              </View>
              <View style={{ flexDirection: 'row' }}>
                {bariImages[2] != null ? (
                  <FastImage
                    style={Styles.familyImage}
                    source={{
                      uri: bariImages[2],
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                ) : null}
                {bariImages[3] != null ? (
                  <FastImage
                    style={Styles.moreImage}
                    source={{
                      uri: bariImages[3],
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                ) : null}
              </View>
            </View>
          </View>

          {this.state.showMore && (
            <View style={Styles.atmosphereView}>
              <View>
                {bariImages[4] && (
                  <FastImage
                    style={Styles.atmosphereImage}
                    source={{
                      uri: bariImages[4],
                      priority: FastImage.priority.normal
                    }}
                    onLoadEnd={() => {
                      this.setState({ isLoading: false });
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                )}
              </View>
              <View>
                {bariImages[5] && (
                  <FastImage
                    style={Styles.atmosphereImageLast}
                    source={{
                      uri: bariImages[5],
                      priority: FastImage.priority.normal
                    }}
                    onLoadEnd={() => {
                      this.setState({ isLoading: false });
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                )}
              </View>
            </View>
          )}
        </View>

        <ActionButton
          buttonColor={Colors.black}
          icon={
            <Image
              style={Styles.beericonImage}
              source={require('../../../assets/img/beericon.png')}
            />
          }
          onPress={() =>
            //this.props.navigation.navigate('AddReview', { id: this.state.id })
            this.addRating()
          }
        />

        <UberButton
          destination={[
            this.state.placeInfo.latitude,
            this.state.placeInfo.longitude
          ]}
        />

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

        {/* <Masonry
            sorted
            bricks={this.state.data}
            columns={this.state.columns}
            customImageComponent={FastImage} /> */}
      </View>
    );
  }
}
