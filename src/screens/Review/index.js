import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  TouchableOpacity
  } from 'react-native';

import Styles from './styles'; // importing style file

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import Colors from '../../styles/colors';  // use for style and color
import { Content, Icon } from "native-base";
import { Rating, AirbnbRating } from 'react-native-ratings';
const RATING_IMAGE = require('../../../assets/img/ratingsGrey.png');
/**
*  set constuctor and initial configuration of page
*/
export default class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      BarlistDataSource: ds.cloneWithRows([
      "",
      "",])
    };
  }

  /**
  *  set navigation bar with icon 
  */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Estime Joes",
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

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  
  /**
  * view design with list view
  */ 
 ListViewItemSeparator = () => {

  const {navigate} = this.props.navigation

  return (
    <View style={Styles.box}>
       <View style={{flexDirection:'row'}}>
            <Text style={Styles.ReviewShortDesText}>
                Best Place
            </Text>
            <Text style={Styles.ReviewUserText}>
                Alex Stevson
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
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
            />
            
            <Text style={Styles.RatingText}>
                  4.0/5.0 - (249 TOAST)
            </Text>
            </View>  
            <Text style={Styles.DisplpayDateText}>
                Nov 2017
            </Text>
        </View>
        <Text numberOfLines={10}>
            Lorem ipsum dolor sit amet, sed do eiusmod.Ut enim ad minim veniam,quis aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
       
    </View>
  );
};

  render() {

    return (
      <View style={Styles.container}>
        <Text style={Styles.ReviewUserTitle}>
            ESKIMO JOES - TOAST SCORE
        </Text>
        <View style={Styles.mainview}>
            <View>
                <Text style={Styles.BigrateText}>
                     4.0
                </Text>
                <Text style={Styles.Outof5Text}>
                    out of 5
                </Text>
            </View>
            <View style={{marginLeft: 15}}>
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
                        style={{ paddingVertical: 0 }}
                      />

                      <Text style={Styles.RatingText}>
                          4.0/5.0
                      </Text>

                    </View>
                    <Text style={Styles.TotalrateText}>
                                    TOTAL: (249 TOAST)
                     </Text>
            </View>
              
        </View>
        <View style={Styles.ListMainView}>
        <ListView
          removeClippedSubviews={false}
          dataSource={this.state.BarlistDataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={ rowData => ( <Text style={Styles.rowViewContainer}>{rowData}</Text> )}
        />
        </View>
      </View>
    
    );
  }
}