import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from '@react-native-firebase/firestore';

const scriptsCol = collection(db, 'scripts');

export const createScript = async data => {
  return await addDoc(scriptsCol, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 0,
  });
};

export const updateScript = async (id, data) => {
  const scriptRef = doc(db, 'scripts', id);
  return await updateDoc(scriptRef, { ...data, updatedAt: new Date() });
};

export const getAllScripts = async () => {
  const q = query(scriptsCol, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
