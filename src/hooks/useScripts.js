/**
 * useScripts.js
 * Simple CRUD for scripts. No real-time listeners. Just fetch when needed.
 */
import { useState, useEffect } from 'react';
import {
  createScript,
  updateScript,
  deleteScript,
  getAllScripts,
} from '../services/scriptService';

const useScripts = () => {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all scripts
  const fetchScripts = async () => {
    setLoading(true);
    const data = await getAllScripts();
    setScripts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  // Add a new script and refresh list
  const addScript = async data => {
    await createScript(data);
    await fetchScripts();
  };

  // Update a script and refresh list
  const editScript = async (id, data) => {
    await updateScript(id, data);
    await fetchScripts();
  };

  // Delete a script and refresh list
  const removeScript = async id => {
    await deleteScript(id);
    await fetchScripts();
  };

  return {
    scripts,
    loading,
    addScript,
    editScript,
    removeScript,
    fetchScripts,
  };
};

export default useScripts;
