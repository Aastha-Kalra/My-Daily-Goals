import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import config from './config'


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
