import * as firebase from 'react-native-firebase'; // use for firebase

export const firebaseApp = firebase.auth(); // firebase app reference
export const storageRef = firebase.storage(); // firebase storage reference

export const rootRef = firebase.database().ref(); // firebase database root reference
export const userRef = rootRef.child('Users'); // user table dreference
export const ReviewRef = rootRef.child('Review');
export const BarRef = rootRef.child('Bars');
