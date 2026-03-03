// src/config/firebase.js
import { getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';

const app = getApp();
const db = getFirestore(app);

export { db };
