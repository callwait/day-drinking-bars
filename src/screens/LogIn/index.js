import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  ScrollView
} from 'react-native';

import Styles from './styles'; // importing style file
import Colors from '../../styles/colors'; // use for style and color
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import { SocialIcon, FormValidationMessage } from 'react-native-elements'; // use for social icon
import { NavigationActions } from 'react-navigation';
import { firebaseApp, userRef } from '../../components/Firebase'; // use for firebase
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import { Content, Icon } from 'native-base';

/**
 *  set constuctor and initial configuration of page
 */
// use to navigate the user to userhome page
const actionToDispatchuser = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'TabStack' })]
});

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      pass: '',
      aboutme: '',
      language: '',
      bar: '',
      review: '',
      isallownotification: false,
      createdate: '',
      updatedate: '',
      isLoading: false,
      emailerror: '',
      passerror: '',
      validationMessage: '',
      isValidatePwd: false,
      isInvalidEmail: false,
      isInvalidPwd: false,
      isValidateEmail: false
    };
  }

  /**
   * call when view will ready to load
   */
  componentWillMount() {
    // const { dispatch } = this.props.navigation;
    // AsyncStorage.getItem('UserId').then(function(value) {
    //   if (value == null || value == "" || value.equalTo(''))
    //   {
    //     //this._login.bind(this);
    //   }
    //   else
    //   {
    //     console.log('user already login');
    //     dispatch(actionToDispatchuser)
    //   }
    // }.bind(this));
  }

  /**
   * call when view will ready to unload
   */
  componentWillUnmount() {
    // this.unsubscribe()
  }

  /**
   * regular expression for email.
   */
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   * validate user email.
   */
  checkEmail() {
    const { email } = this.state;

    if (email == '') {
      // this.setState({ emailbordercolor:'red'});
      this.setState({ emailerror: 'Email is required' });
    } else if (!this.validateEmail(email)) {
      // this.setState({ emailbordercolor:'red'});
      this.setState({ emailerror: 'Invalid Email Address' });
    } else {
      //this.setState({  emailbordercolor:'transparent'});
      this.setState({ emailerror: ' ' });
    }
  }

  /**
   * validate user password.
   */
  checkPass() {
    const { pass } = this.state;

    if (pass == '') {
      //this.setState({ passbordercolor:'red'});
      this.setState({ passerror: 'Password is required' });
    } else if (pass.length < 6) {
      //this.setState({ passbordercolor:'red'});
      this.setState({ passerror: 'Password length must be > 6' });
    } else {
      //this.setState({  passbordercolor:'transparent'});
      this.setState({ passerror: ' ' });
    }
  }

  /**
   * method for handle user login.
   */
  _login() {
    const { dispatch } = this.props.navigation;
    const { email, pass } = this.state;

    if (email.length === 0) {
      this.setState({ emailerror: 'Email is required' });
      alert('Email is required');
    } else if (!this.validateEmail(email)) {
      this.setState({ emailerror: 'Invalid Email Address' });
      alert('Invalid Email Address');
    } else if (pass.length === 0) {
      this.setState({ passerror: 'Password is required' });
      alert('Password is required');
    } else {
      let _this = this;
      this.setState({
        isLoading: true
      });

      if (this.state.email.length !== 0 || this.state.pass.length !== 0) {
        firebaseApp
          .signInWithEmailAndPassword(email, pass)
          .then(function(firebaseUser) {
            userRef
              .orderByChild('Email')
              .equalTo(email)
              .once('value', dataSnapshot => {
                dataSnapshot.forEach(child => {
                  userRef
                    .child(child.val().UserId)
                    .child('Password')
                    .set(pass);

                  AsyncStorage.setItem('UserId', child.val().UserId);
                  AsyncStorage.setItem('UserFullName', child.val().FullName);
                  AsyncStorage.setItem('Email', child.val().Email);

                  firebaseApp.onAuthStateChanged(function(user) {
                    if (user) {
                      user.getIdToken().then(function(data) {
                        console.log('>>>>>> token', data);
                        AsyncStorage.setItem('token', data);
                      });
                    }
                  });

                  _this.setState({
                    isLoading: false
                  });

                  dispatch(actionToDispatchuser);
                });
              });
          })
          .catch(function(error) {
            var errorMessage = error.message;

            _this.setState({
              isLoading: false
            });

            setTimeout(() => {
              alert(errorMessage);
            }, 200);
          });
      }
    }
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    const { dispatch } = this.props.navigation;
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + JSON.stringify(result));

      AsyncStorage.setItem('UserId', result.id);
      AsyncStorage.setItem('UserFullName', result.name);
      AsyncStorage.setItem('Email', result.email);

      this.setState({
        isLoading: false
      });
      setTimeout(() => {
        dispatch(actionToDispatchuser);
      }, 2000);
    }
  }

  /**
   * method for handle login with facebook.
   */
  fbLogin() {
    let _this = this;
    const facebookParams = 'id,name,email,picture.width(600).height(800)';
    this.setState({
      isLoading: true
    });

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else if (result.deniedPermissions) {
          throw new Error('We need the requested permissions');
        } else {
          console.log(
            'Login success with permissions: ' + JSON.stringify(result)
          );
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: facebookParams
                }
              }
            },
            _this._responseInfoCallback.bind(_this)
          );

          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  createUser = (uid, userData, dp) => {
    const { dispatch } = this.props.navigation;
    const newUser = {
      Name: userData.name,
      Email: userData.email,
      UserId: uid,
      ImageURL: dp
    };

    console.log('user datya', userData);
    this.setState({
      isLoading: false
    });

    dispatch(
      NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      })
    );
  };

  /**
   * view design with list view
   */

  render() {
    const { navigate } = this.props.navigation;
    let loading = this.state.isLoading;

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.container}>
          <Image
            style={Styles.logo}
            source={require('../../../assets/img/Logo.png')}
            resizeMode="stretch"
          />

          <View style={[Styles.SectionStyle, { marginTop: height / 15 }]}>
            <Icon
              name="mail"
              type="Feather"
              style={{ padding: 10, color: '#D3D3D3', fontSize: 20 }}
            />
            <TextInput
              style={Styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#787686"
              underlineColorAndroid="transparent"
              ref="txtemail"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType={'next'}
              onSubmitEditing={event => {
                this.refs.txtpwd.focus();
              }}
              onChangeText={email => (this.state.email = email)}
              onBlur={() => this.checkEmail()}
            />
          </View>

          <View style={[Styles.SectionStyle, { marginTop: 5 }]}>
            <Icon
              name="eye"
              type="Feather"
              style={{ padding: 10, color: '#D3D3D3', fontSize: 20 }}
            />
            <TextInput
              style={Styles.textInput}
              placeholder="Password"
              placeholderTextColor="#787686"
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref="txtpwd"
              returnKeyType={'done'}
              onChangeText={pass => (this.state.pass = pass)}
              onBlur={() => this.checkPass()}
            />
          </View>

          <TouchableOpacity
            style={Styles.buttonLogIn}
            onPress={this._login.bind(this)}
          >
            <Text style={Styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <SocialIcon
            title="Login with Facebook"
            button
            type="facebook"
            style={Styles.buttonFB}
            fontStyle={{ fontSize: 16 }}
            fontWeight="bold"
            onPress={this.fbLogin.bind(this)}
          />

          <Text style={Styles.memberText}>Not a member yet?</Text>

          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Text style={Styles.linkText}>Register</Text>
          </TouchableOpacity>

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
      </ScrollView>
    );
  }
}
