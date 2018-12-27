import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
import { Icon } from 'native-base';
import { Rating } from 'react-native-elements';
const RATING_IMAGE = require('../../../assets/img/rating.png');
import FastImage from 'react-native-fast-image';

var allBars = [];

/**
 *  set constuctor and initial configuration of page
 */
export default class BarList extends React.Component {
  constructor(props) {
    super(props);

    const BarlistDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    let places = this.props.navigation.getParam('places');
    if (places) {
      places = places.slice(0, 50);
    } else {
      places = [];
    }
    this.state = {
      isLoading: false,
      paginate: 0,
      places: BarlistDataSource.cloneWithRows(places)
    };
  }

  /**
   *  set navigation bar with icon
   */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'List View',
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
  });

  componentWillMount() {}

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  /**
   * view design with list view
   */

  renderRow = (rowData, sectionID, rowID) => {
    const { navigate } = this.props.navigation;
    console.log('rowData', rowData);
    let mainImage = require('../../../assets/img/default-photo.png');
    if (rowData.images && rowData.images[0]) {
      mainImage = { uri: rowData.images[0] };
    }
    return (
      <TouchableOpacity
        style={Styles.box}
        onPress={() => navigate('BarDetail', { id: rowData.id })}
      >
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            style={Styles.cardimage}
            source={mainImage}
            onLoadEnd={() => {
              this.setState({ isLoading: false });
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>

        <Text style={Styles.cardTitle}>{rowData.title}</Text>
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
            style={{ paddingVertical: 10 }}
          />
          {/* <Image style={Styles.Starimage}
          source={require('../../../assets/img/ratingsimg.png')}
          /> */}

          <Text style={Styles.RatingText}>0.0/0.0 - (0 TOAST)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _onEndReached() {
    if (!this.state.isLoading) {
      //this.getBarList(this.state.paginate);
    }
  }

  render() {
    let loading = this.state.isLoading;

    return (
      <View style={Styles.container}>
        <ListView
          removeClippedSubviews={false}
          dataSource={this.state.places}
          showsVerticalScrollIndicator={false}
          onEndReached={this._onEndReached.bind(this)}
          renderRow={this.renderRow.bind(this)}
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
      </View>
    );
  }
}
