import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ImageBackground,
  ActivityIndicator,Modal
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
import { Rating } from 'react-native-elements';
import styles from '../Home/styles';
import { Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button'; // use for action button
import { firebaseApp,userRef,rootRef,BarRef } from '../Firebase/Firebase';// use for firebase
import FastImage from 'react-native-fast-image'

const RATING_IMAGE = require('../../../assets/img/rating.png');
// import FastImage from 'react-native-fast-image';
// import Masonry from 'react-native-masonry';

// let data = [
//   {
//     data: {
//       caption: '',
//       user: {
//         name: ''
//       },
//     },
//     uri: 'https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiB_9eZ0ezeAhXQWisKHRtOB3IQjRx6BAgBEAU&url=https%3A%2F%2Fwww.buddhabar.com%2F&psig=AOvVaw1C4a84T_sQs7dpWycMqLPb&ust=1543135316525910',   
//     renderHeader: (data) => {
//       return (
//         <View key='brick-footer' style={styles.headerTop}>
//           <Image
//             source={require('../../../assets/img/Experience.png')}
//             style={styles.userPic}/>         
//         </View>
//       )
//     }
//   },
//   // {
//   //   uri: 'https://s-media-cache-ak0.pinimg.com/736x/b1/21/df/b121df29b41b771d6610dba71834e512.jpg',
//   // },
//   // {
//   //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpD8mz-2Wwix8hHbGgR-mCFQVFTF7TF7hU05BxwLVO1PS5j-rZA',
//   // },
//   // {
//   //   uri: 'https://s-media-cache-ak0.pinimg.com/736x/5a/15/0c/5a150cf9d5a825c8b5871eefbeda8d14.jpg'
//   // }  
// ];


/**
*  set constuctor and initial configuration of page
*/
export default class BarDetail extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      columns: 2,
      padding: 5,
      barName : '',
      barAddress : '',
      barDesctiprion: '',
      bariImages:[],
      isLoading: false,
    };
  }

 

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Text style={Styles.navigationTitle}>{params.barText}</Text>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{padding: 10}}>      
            <Icon type="Feather" name="arrow-left" style={{color:Colors.black,fontSize:25}} />
          </View>
        </TouchableOpacity>
      ),    
      headerTintColor: Colors.black,
      headerTitleStyle: { color: Colors.black},
      headerStyle: {
        backgroundColor: Colors.backgroundPrimary,
        borderBottomColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
      },
  };
}

  componentWillMount() {

    this.getBarDetail();

  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  /**
  * get bar data
  */
 getBarDetail() {
  const { state } = this.props.navigation;
 
  const id = state.params.bar_id;

  console.log('Bar Detail', id);
  BarRef.orderByChild("bar_id").equalTo(id).on('value', (dataSnapshot) => {
    dataSnapshot.forEach((child) => {
      console.log('Bar Detail', child.val());
      this.setState({barName : child.val().bar_name});
      this.setState({barAddress : child.val().bar_address});
      this.setState({barDesctiprion : child.val().bar_description});
      this.setState({bariImages : child.val().bar_gallery.imageUrl});

      this.props.navigation.setParams({
        barText: this.state.barName,
      });
    });
  });
}


  /**
  * view design with list view
  */  
  render() {

    let loading = this.state.isLoading;
    const { state } = this.props.navigation;
     const barid = state.params.bar_id; 

    return (
      <View style={Styles.container}>
        <Text style={Styles.titleText}>{this.state.barAddress}</Text>
        <View style={Styles.RateView}>

        <Rating
          readonly
          type='custom'
          ratingImage={RATING_IMAGE}
          ratingColor={Colors.colorPrimary}
          ratingBackgroundColor='#DAD9E2'
          ratingCount={5}
          imageSize={15}
          fractions={1}
          startingValue={4}
          onFinishRating={this.ratingCompleted}
          onStartRating={this.ratingStarted}
          style={{ paddingVertical: 8 }}
        />

        {/* <Image style={Styles.Starimage}
          source={require('../../../assets/img/ratingsimg.png')}
        /> */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Review')}>
        <Text style={Styles.RatingText}>
               4.0/5.0 - (249 TOAST)
        </Text>
        </TouchableOpacity>

        </View>
        
        <Text style={Styles.detailText}>
               {this.state.barDesctiprion}
        </Text>

        <View style={Styles.galleryView}>
          <Text style={Styles.gallertText}>
            Bar Gallery
          </Text>

          <TouchableOpacity>
            <Text style={Styles.showmoreText}> Show More </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={Styles.atmosphereView}>

            <View>
            {this.state.bariImages[0] != null ?
              <FastImage
                style={Styles.atmosphereImage}
                source={{
                  uri: this.state.bariImages[0],
                  priority: FastImage.priority.normal,
                }}
                onLoadEnd={ ()=>{ this.setState({ isLoading: false }) }}
                resizeMode={FastImage.resizeMode.stretch}
              />    
              : null}  
            </View>

            
            <View style={{flexDirection: 'column'}}>
              <View>
                {this.state.bariImages[1] != null ?
                  <FastImage
                    style={Styles.streetViewImage}
                    source={{
                      uri: this.state.bariImages[1],
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />    
                : null}  
              </View>            
              <View style={{flexDirection: 'row'}}>
                {this.state.bariImages[2] != null ?
                  <FastImage
                  style={Styles.familyImage}
                  source={{
                    uri: this.state.bariImages[2],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />    
                : null}
                {this.state.bariImages[3] != null ?
                  <FastImage
                  style={Styles.moreImage}
                  source={{
                    uri: this.state.bariImages[3],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />    
                : null}
              </View>
            </View>            
          </View>                 
        </View>

        <ActionButton
            buttonColor={Colors.black}
            icon={<Image style={Styles.beericonImage}
             source={require('../../../assets/img/beericon.png')}
              /> }            
              onPress={() => this.props.navigation.navigate('AddReview',{bar_id : barid})}/>

              <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {console.log('close modal')}}>
                  <View style={Styles.modalBackground}>
                      <ActivityIndicator
                        animating={loading} size="large" color={Colors.colorPrimary} />
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