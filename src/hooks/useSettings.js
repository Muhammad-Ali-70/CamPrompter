/**
 * useSettings.js
 * Loads settings from Firestore once on mount.
 * Saves whenever a value changes (debounced).
 */
import { useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from '@react-native-firebase/firestore';
import { useSettings } from '../context/SettingsContext';

const DOC_ID = 'default';

const useSettingsSync = () => {
  const {
    fontSize,
    scrollSpeed,
    voiceActivation,
    mirrorText,
    setFontSize,
    setScrollSpeed,
    setVoiceActivation,
    setMirrorText,
  } = useSettings();

  const isFirstLoad = useRef(true);
  const debounceRef = useRef(null);

  // Load once on mount
  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'userSettings', DOC_ID));
      if (snap.exists()) {
        const d = snap.data();
        if (d.fontSize) setFontSize(d.fontSize);
        if (d.scrollSpeed) setScrollSpeed(d.scrollSpeed);
        if (d.voiceActivation !== undefined)
          setVoiceActivation(d.voiceActivation);
        if (d.mirrorText !== undefined) setMirrorText(d.mirrorText);
      }
      isFirstLoad.current = false;
    };
    load();
  }, []);

  // Save on every change (debounced 600ms)
  useEffect(() => {
    if (isFirstLoad.current) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDoc(
        doc(db, 'userSettings', DOC_ID),
        { fontSize, scrollSpeed, voiceActivation, mirrorText },
        { merge: true },
      );
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [fontSize, scrollSpeed, voiceActivation, mirrorText]);
};

export default useSettingsSync;
