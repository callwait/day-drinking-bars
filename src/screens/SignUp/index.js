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
import Colors from '../../styles/colors';  // use for style and color
import {firebaseApp,userRef,rootRef} from '../../components/Firebase'; // use for firebase
import { Content, Icon } from "native-base";
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import {FormValidationMessage } from 'react-native-elements' // use for form elements

/**
*  set constuctor and initial configuration of page
*/
export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
      fullname: '',
      email: '',
      pass:'',
      aboutme: '',
      language: '',
      bar: '',
      review: '',
      isallownotification: false,
      createdate: '',
      updatedate: '',
      isLoading: false,
      nameerror: '' ,
      emailerror: '' ,
      passerror: '' ,      
    };
  }

/**
  * regular expression for email.
  */
 validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/**
  * validate user name.
  */
 checkName()
 {
   const { name} = this.state;

   if(name == "")
   {
     //this.setState({ namebordercolor:'red'});
     this.setState({ nameerror: "Name is required" });
   }
   else
   {
     //this.setState({  namebordercolor:'transparent'});
     this.setState({ nameerror: " " });
   }
 }

 /**
 * validate user email.
 */
 checkEmail()
 {
   const { email} = this.state;

   if(email == "")
   {
    // this.setState({ emailbordercolor:'red'});
     this.setState({ emailerror: "Email is required" });
   }
   else if(!this.validateEmail(email)){
     // this.setState({ emailbordercolor:'red'});
     this.setState({ emailerror: "Invalid Email Address" });
   }
   else
   {
     //this.setState({  emailbordercolor:'transparent'});
     this.setState({ emailerror: " " });
   }
 }

  /**
 * validate user password.
 */
 checkPass()
 {
   const { pass} = this.state;

   if(pass == "")
   {
     //this.setState({ passbordercolor:'red'});
     this.setState({ passerror: "Password is required" });
   }
   else if(pass.length<6){
      //this.setState({ passbordercolor:'red'});
      this.setState({ passerror: "Password length must be > 6" });
   }
   else
   {
     //this.setState({  passbordercolor:'transparent'});
     this.setState({ passerror: " " });
   }
 }


 _registration() {
  console.log("registration called");
  const { navigate } = this.props.navigation;
  //const userId=rootRef.push().key;
  let createddate = new Date();
  this.state.createdate = createddate;

  const { fullname,email,pass,aboutme,language,bar,review,isallownotification,createdate,updatedate} = this.state;

  if (fullname.length===0) {
    this.setState({ nameerror: "Name is required" });
    alert("Name is required");
  }
  else if(email.length===0){
    this.setState({ emailerror: "Email is required" });
    alert("Email is required");
  }
  else if(!this.validateEmail(email)){
    this.setState({ emailerror: "Invalid Email Address" });
    alert("Invalid Email Address");
  }
  else if(pass.length===0){
    this.setState({ passerror: "Password is required" });
    alert("Password is required");
  }
  else if(pass.length<6){
    this.setState({ passerror: "Password length must be > 6" });
    alert("Password length must be > 6");
  }
  else {

    let _this=this;
    this.setState({
      isLoading: true,
    });
    firebaseApp.createUserWithEmailAndPassword(email,pass).then(function(firebaseUser){
     
      console.log("Successfully created new user:", firebaseUser.user.uid);
      let UID = firebaseUser.user.uid;
    
      const newUser = {
        FullName:fullname,
        Email:email,
        Password:pass,
        UserId:UID,
        AboutMe:aboutme,
        Language:language,
        Bar:bar,
        Review:review,
        IsAllowNotification:isallownotification,
        CreatedDate:createdate,
        UpdatedDate:updatedate
        }; 

        userRef.child(UID).set(newUser);

          AsyncStorage.setItem('UserId',UID);
          AsyncStorage.setItem('UserFullName',fullname);
          AsyncStorage.setItem('Email',email);

           _this.setState({
              isLoading: false,
            });

            navigate('TabStack');

    }).catch(function(error){
      var errorMessage = error.message;
      _this.setState({
              isLoading: false,
            });
            setTimeout( () => {
              alert(errorMessage);
         }, 200)
  
              console.log("firebase error",errorMessage);
    });
  }
   
}

  /**
  * view design with list view
  */  
  render() {

    const {navigation} = this.props
    let loading = this.state.isLoading

    return (
      <ScrollView  keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
      
          <View style={Styles.container}>
            <Image style={Styles.logo} source={require('../../../assets/img/Logo.png')} resizeMode='stretch'/>
        
        
        <View style={[Styles.SectionStyle,{marginTop:height/15,}]}>
          <Icon name="user" type="Feather" style={{padding:10,color:'#D3D3D3', fontSize:20}}/>
          <TextInput
              style={Styles.textInput}
              placeholder="Full Name"
              placeholderTextColor="#787686"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref= 'txtfname' 
              returnKeyType = { "next" }
              onSubmitEditing={(event) => {                   
                  this.refs.txtemail.focus(); 
              }}
              onChangeText={(fullname)=> this.state.fullname = fullname}
              // onBlur={ () => this.checkName() }
          />
        </View>

        <View style={[Styles.SectionStyle,{marginTop:5,}]}>
          <Icon name="mail" type="Feather" style={{padding:10,color:'#D3D3D3', fontSize:20}}/>
          <TextInput
              style={Styles.textInput}
              placeholder="Email address"
              placeholderTextColor="#787686"
              ref= 'txtemail' 
              autoCorrect={false}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType = { "next" }
              onSubmitEditing={(event) => {                   
                  this.refs.txtpwd.focus(); 
              }}
              onChangeText={(email)=> this.state.email = email}
              // onBlur={ () => this.checkEmail() }
          />
        </View>

        <View style={[Styles.SectionStyle,{marginTop:5,}]}>
          <Icon name="eye" type="Feather" style={{padding:10,color:'#D3D3D3', fontSize:20}}/>
          <TextInput
              style={Styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#787686"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref= 'txtpwd' 
              returnKeyType = { "done" }              
              onChangeText={(pass)=> this.state.pass = pass}
              // onBlur={ () => this.checkPass() }
          />
        </View>

        <TouchableOpacity style={Styles.buttonSignUp} onPress={this._registration.bind(this)}>
          <Text style={Styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>

        <Text style={Styles.memberText}>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          < Text style={Styles.linkText}>Login</Text>
        </TouchableOpacity>

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

      </ScrollView>

    );
  }
}