import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDvxIgxF2qB4avzXChMGSZJ5yu6SneQ-rs',
  authDomain: 'foodapp-8c126.firebaseapp.com',
  projectId: 'foodapp-8c126',
  storageBucket: 'foodapp-8c126.appspot.com',
  messagingSenderId: '9853375785',
  appId: '1:9853375785:web:f5939e66438bb14ff6d338',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};
