// src/services/folderService.js
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  increment,
} from '@react-native-firebase/firestore';

const foldersCol = collection(db, 'folders');

// Create a new folder
export const createFolder = async ({ name, iconColor }) => {
  return await addDoc(foldersCol, {
    name,
    iconColor,
    scriptCount: 0,
    createdAt: new Date(),
  });
};

// Get all folders, ordered by name
export const getFolders = async () => {
  const q = query(foldersCol, orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete a folder by ID
export const deleteFolder = async id => {
  const folderRef = doc(db, 'folders', id);
  return await deleteDoc(folderRef);
};

// Increment/decrement scriptCount
export const updateFolderScriptCount = async (folderId, delta) => {
  const folderRef = doc(db, 'folders', folderId);
  return await updateDoc(folderRef, {
    scriptCount: increment(delta),
  });
};
