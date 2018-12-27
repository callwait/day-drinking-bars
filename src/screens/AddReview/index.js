import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
import { Rating, AirbnbRating } from 'react-native-ratings';
import { firebaseApp, ReviewRef, rootRef, BarRef } from '../../components/Firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import Moment from 'moment';
import { Content, Icon } from 'native-base';
const RATING_IMAGE = require('../../../assets/img/rating.png');

/**
 *  set constuctor and initial configuration of page
 */
export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userfullname: '',
      reviewtitle: '',
      reviewdesc: '',
      createdate: '',
      updatedate: '',
      rating: 0.0,
      isLoading: false,
      titleerror: '',
      descerror: ''
    };
  }

  onPress = () => {
    alert('ads');
  };

  /**
   *  set navigation bar with icon
   */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Add Review',
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

  /**
   * reating
   */
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    this.setState({ rating: rating });
  }

  /**
   * call when view will ready to load
   */
  componentWillMount() {
    AsyncStorage.getItem('UserFullName').then(
      function(value) {
        console.log(value);
        this.setState({ userfullname: value });
      }.bind(this)
    );
  }
  /**
   * Add review method
   */
  _AddReview() {
    const { state } = this.props.navigation;
    const barid = state.params.bar_id;

    const { navigate } = this.props.navigation;
    Moment.locale('en');
    let createddate = new Date();
    this.state.createdate = createddate;
    const ReviewId = Moment(createdate).format('DDMMYYYYhhmmss');

    const {
      userfullname,
      reviewtitle,
      reviewdesc,
      createdate,
      updatedate,
      rating
    } = this.state;
    const newReview = {
      ReviewId: ReviewId,
      ReviewTitle: reviewtitle,
      ReviewDescription: reviewdesc,
      Rating: rating,
      UserInfo: userfullname,
      CreatedDate: createdate,
      UpdatedDate: updatedate
    };

    console.log('newReview', newReview);

    if (this.state.reviewtitle == '' && this.state.reviewdesc == '') {
      this.refs.toast.show('Review Title & Description is required');
    } else if (this.state.reviewtitle == '') {
      this.refs.toast.show('Review Title is required');
    } else if (this.state.reviewdesc == '') {
      this.refs.toast.show('Review Description is required');
    } else {
      ReviewRef.child(ReviewId).set(newReview);
      BarRef.on('value', dataSnapshot => {
        dataSnapshot.forEach(child => {
          if (child.key == barid) {
            BarRef.child(child.key)
              .child('Review_Info')
              .set({ ReviewId: ReviewId });
            console.log('bar listing called', child.key);
          }
        });
      });
      this.refs.toastsuccess.show('Review Added Successfully.');
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }
  }
  goBack() {
    this.props.navigation.goBack();
  }

  /**
   * validate recipe title.
   */
  checkTitle() {
    const { reviewtitle } = this.state;

    if (reviewtitle == '') {
      this.refs.toast.show('Review Title is required');
    } else {
      //this.setState({ titleerror: " " });
    }
  }

  /**
   * validate recipe description.
   */
  checkDesc() {
    const { reviewdesc } = this.state;

    if (reviewdesc == '') {
      this.refs.toast.show('Review Description is required');
    } else {
      //this.setState({ descerror: " " });
    }
  }
  /**
   * view design with list view
   */

  render() {
    return (
      <Content contentContainerStyle={Styles.container}>
        <View>
          <TextInput
            ref="txttitle"
            style={Styles.ReviewTitleText}
            onChangeText={text => this.setState({ text })}
            placeholder=" Review Title "
            returnKeyType={'next'}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onSubmitEditing={event => {
              this.refs.txtdesc.focus();
            }}
            onChangeText={reviewtitle => this.setState({ reviewtitle })}
            onBlur={() => this.checkTitle()}
          />
          <TextInput
            ref="txtdesc"
            numberOfLines={10}
            style={Styles.ReviewDescText}
            onChangeText={text => this.setState({ text })}
            placeholder=" Review Description.. "
            returnKeyType={'done'}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={reviewdesc => this.setState({ reviewdesc })}
            onBlur={() => this.checkTitle()}
          />
          <View style={Styles.RateView}>
            <Rating
              //showRating
              type="custom"
              ratingImage={RATING_IMAGE}
              ratingColor={Colors.colorPrimary}
              ratingBackgroundColor="#DAD9E2"
              ratingCount={5}
              imageSize={20}
              fractions={1}
              startingValue={0}
              onFinishRating={this.ratingCompleted.bind(this)}
              onStartRating={this.ratingStarted}
              style={{ paddingVertical: 0 }}
            />

            <Text style={Styles.RatingText}>{this.state.rating}/5.0</Text>
          </View>

          <TouchableOpacity
            style={Styles.buttonAddBar}
            onPress={this._AddReview.bind(this)}
          >
            <Text style={Styles.addBarText}>ADD Review</Text>
          </TouchableOpacity>

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
            ref="toastsuccess"
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
      </Content>
    );
  }
}
