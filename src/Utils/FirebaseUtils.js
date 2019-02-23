import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAW7jFSM6aWo48-Y4wBW9R6YvjkV5WjTsQ',
    authDomain: 'tinder-pet-23dc3.firebaseapp.com',
    databaseURL: 'https://tinder-pet-23dc3.firebaseio.com',
    projectId: 'tinder-pet-23dc3',
    storageBucket: 'tinder-pet-23dc3.appspot.com',
    messagingSenderId: '1094795286183'
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
