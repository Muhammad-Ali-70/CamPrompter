/**
 * SettingsContext.js
 * Global settings state for the app.
 *
 * Provides:
 *  - fontSize        (number) — teleprompter font size in px
 *  - scrollSpeed     (number) — words per minute (50–300)
 *  - voiceActivation (bool)   — auto-scroll when speaking
 *  - mirrorText      (bool)   — mirror teleprompter text horizontally
 *
 * Usage anywhere in the app:
 *   import { useSettings } from '../context/SettingsContext';
 *   const { fontSize, setFontSize } = useSettings();
 */
import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(48);
  const [scrollSpeed, setScrollSpeed] = useState(150); // wpm
  const [voiceActivation, setVoiceActivation] = useState(true);
  const [mirrorText, setMirrorText] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        scrollSpeed,
        setScrollSpeed,
        voiceActivation,
        setVoiceActivation,
        mirrorText,
        setMirrorText,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
};
