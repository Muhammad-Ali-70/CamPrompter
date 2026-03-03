// src/services/settingsService.js
import { db } from '../config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';

const settingsDocId = 'default';
const settingsRef = doc(db, 'userSettings', settingsDocId);

// Load settings
export const loadSettings = async () => {
  const snapshot = await getDoc(settingsRef);
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    // Return defaults if no doc exists
    return {
      fontSize: 36,
      scrollSpeed: 100,
      voiceActivation: false,
      mirrorText: false,
      updatedAt: new Date(),
    };
  }
};

// Save settings (overwrite all)
export const saveSettings = async settings => {
  return await setDoc(settingsRef, {
    ...settings,
    updatedAt: new Date(),
  });
};

// Update a single field (debounced)
export const updateSettingField = async (field, value) => {
  return await updateDoc(settingsRef, {
    [field]: value,
    updatedAt: new Date(),
  });
};
