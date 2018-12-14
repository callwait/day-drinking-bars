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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
import { Rating } from 'react-native-elements';
const RATING_IMAGE = require('../../../assets/img/rating.png');
import { firebaseApp,userRef,rootRef,BarRef } from '../Firebase/Firebase';// use for firebase
import { sampleApi } from '../RNFetchBlob/RNFetchBlob';
import FastImage from 'react-native-fast-image'

var allBars=[];

/**
*  set constuctor and initial configuration of page
*/
export default class BarList extends React.Component {
  constructor(props) {
    super(props)

    const BarlistDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      BarlistDataSource: BarlistDataSource,
      isLoading: true,
      paginate: 0
    };
  }

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "ListView",
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
  });

  componentWillMount() {

    this.getBarList(this.state.paginate);

  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  //get all bars.
  async getBarList(paginate) {
    sampleApi(paginate).then(result => {
      result.data.items.forEach((child) => {
        allBars.push({
          Bar_id:child.id,
          Bar_name: child.title,
          Bar_address: child.address,
          Bar_description:child.description,
          Bar_image:child.featured
        });
      });
      this.setState({
        BarlistDataSource: this.state.BarlistDataSource.cloneWithRows(allBars),
        isLoading: false,
        paginate: this.state.paginate + 1
      });
    }).catch(err => {
      console.log(err);
    })
  }
  
  /**
  * view design with list view
  */ 
 renderRow = (rowData,sectionID,rowID) =>  {

  const {navigate} = this.props.navigation

  return (
    <TouchableOpacity style={Styles.box} onPress={() => navigate('BarDetail',{bar_id : rowData.Bar_id})}>
       
      <View style={{flexDirection:'row'}}>
        

        {/* {this.state.isLoading == true ? <Image style={Styles.cardimage} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} resizeMode='stretch' onLoadEnd={ ()=>{ this.setState({ isLoading: false }) }}/> : <Image style={Styles.cardimage} source={{uri: rowData.Bar_image}} resizeMode='stretch'/> } */}
        <FastImage
          style={Styles.cardimage}
          source={{
            uri: rowData.Bar_image,
            priority: FastImage.priority.normal,
          }}
          onLoadEnd={ ()=>{ this.setState({ isLoading: false }) }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
  
      <Text style={Styles.cardTitle}>
              {rowData.Bar_name}
      </Text>
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
        style={{ paddingVertical: 10 }}
      />
          {/* <Image style={Styles.Starimage}
          source={require('../../../assets/img/ratingsimg.png')}
          /> */}

      <Text style={Styles.RatingText}>
              4.0/5.0 - (249 TOAST)
      </Text>
      </View>  
    </TouchableOpacity>
  );
};

_onEndReached() {
  if (!this.state.isLoading) {
    this.getBarList(this.state.paginate);
  }
}

  render() {

    let loading = this.state.isLoading

    return (
      <View style={Styles.container}>
        <ListView
          removeClippedSubviews={false}
          dataSource={this.state.BarlistDataSource}
          showsVerticalScrollIndicator={false}
          onEndReached={this._onEndReached.bind(this)}
          renderRow={this.renderRow.bind(this)}
        />


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
      </View>
    
    );
  }
}