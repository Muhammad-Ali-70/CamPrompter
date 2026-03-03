/**
 * useFolders.js
 * Simple CRUD for folders. No real-time listeners. Just fetch when needed.
 */
import { useState, useEffect } from 'react';
import {
  createFolder,
  getFolders,
  deleteFolder,
} from '../services/folderService';

const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all folders
  const fetchFolders = async () => {
    setLoading(true);
    const data = await getFolders();
    setFolders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // Add a folder and refresh list
  const addFolder = async ({ name, iconColor }) => {
    await createFolder({ name, iconColor });
    await fetchFolders();
  };

  // Remove a folder and refresh list
  const removeFolder = async id => {
    await deleteFolder(id);
    await fetchFolders();
  };

  return { folders, loading, addFolder, removeFolder, fetchFolders };
};

export default useFolders;
