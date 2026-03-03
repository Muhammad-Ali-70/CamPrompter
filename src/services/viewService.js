// src/services/viewService.js
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  increment,
} from '@react-native-firebase/firestore';

const scriptViewsCol = collection(db, 'scriptViews');
const scriptsCol = collection(db, 'scripts');

// Log a new recording session
export const logView = async ({
  scriptId,
  durationSeconds = 0,
  completed = false,
}) => {
  // Add session to scriptViews
  const viewRef = await addDoc(scriptViewsCol, {
    scriptId,
    recordedAt: new Date(),
    durationSeconds,
    completed,
  });

  // Increment script's viewCount
  const scriptRef = doc(db, 'scripts', scriptId);
  await updateDoc(scriptRef, { viewCount: increment(1) });

  return viewRef;
};

// Update a recording session (if needed)
export const updateView = async (viewId, { durationSeconds, completed }) => {
  const viewRef = doc(db, 'scriptViews', viewId);
  return await updateDoc(viewRef, {
    durationSeconds,
    completed,
  });
};
