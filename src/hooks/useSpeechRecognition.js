/**
 * useSpeechRecognition.js
 *
 * Wraps @ascendtis/react-native-voice-to-text with an auto-restart loop.
 *
 * WHY AUTO-RESTART?
 *   Android's SpeechRecognizer stops itself after ~5s of silence and fires
 *   error code 7 ("No speech match"). This is normal behaviour — not a bug.
 *   We catch that error and immediately restart so recognition runs
 *   continuously for the whole recording session.
 *
 * Errors that are NOT restarted (real failures):
 *   code 5  — client-side error
 *   code 9  — insufficient permissions
 *   code 6  — speech recognizer busy
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import {
  startListening,
  stopListening,
  addEventListener,
} from '@ascendtis/react-native-voice-to-text';

// Android error codes that should trigger a restart
const RESTART_CODES = new Set([
  7, // ERROR_NO_MATCH  — no speech detected in window, normal on Android
  6, // ERROR_SPEECH_TIMEOUT — too much silence before speech
]);

const RESTART_DELAY_MS = 150; // small gap avoids hammering the recognizer

const useSpeechRecognition = ({
  onPartialResult,
  onFinalResult,
  onError,
  lang = 'en-US',
} = {}) => {
  const [isListening, setIsListening] = useState(false);

  // Stable callback refs so listeners don't need to re-register on re-render
  const onPartialRef = useRef(onPartialResult);
  const onFinalRef = useRef(onFinalResult);
  const onErrorRef = useRef(onError);
  const isActiveRef = useRef(false); // true while the session should be running
  const langRef = useRef(lang);

  useEffect(() => {
    onPartialRef.current = onPartialResult;
  }, [onPartialResult]);
  useEffect(() => {
    onFinalRef.current = onFinalResult;
  }, [onFinalResult]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  // ── Internal start (used both for initial start and restarts) ─────────────
  const _start = useCallback(async () => {
    try {
      await startListening(); // no args — matches the working example exactly
      console.log('[Speech] startListening called');
    } catch (err) {
      console.warn('[Speech] startListening threw:', err);
    }
  }, []);

  // ── Register listeners once on mount ─────────────────────────────────────
  useEffect(() => {
    // Mirror the working example: request permission on mount
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: 'Microphone Permission',
        message: 'Needed for speech recognition',
        buttonPositive: 'OK',
      }).then(r => console.log('[Speech] mic permission result:', r));
    }

    const listeners = [
      addEventListener('onSpeechStart', () => {
        console.log('[Speech] ✅ started');
        setIsListening(true);
      }),

      addEventListener('onSpeechEnd', () => {
        console.log('[Speech] 🔴 ended');
        setIsListening(false);

        // If session should still be active, restart immediately
        if (isActiveRef.current) {
          console.log('[Speech] 🔄 restarting after end...');
          setTimeout(_start, RESTART_DELAY_MS);
        }
      }),

      addEventListener('onSpeechPartialResults', e => {
        const text = Array.isArray(e.value) ? e.value[0] : e.value;
        console.log('[Speech] 🎤 partial:', text);
        if (text) onPartialRef.current?.(text);
      }),

      addEventListener('onSpeechResults', e => {
        const text = Array.isArray(e.value) ? e.value[0] : e.value;
        console.log('[Speech] ✅ final:', text);
        if (text) onFinalRef.current?.(text);
        // Don't setIsListening(false) here — onSpeechEnd will fire right after
      }),

      addEventListener('onSpeechError', e => {
        console.log('[Speech] ⚠️ error code:', e.code, '|', e.message);

        if (isActiveRef.current && RESTART_CODES.has(Number(e.code))) {
          // Normal Android timeout — silently restart
          console.log('[Speech] 🔄 restarting after error', e.code);
          setTimeout(_start, RESTART_DELAY_MS);
        } else {
          // Real error — surface it
          setIsListening(false);
          onErrorRef.current?.(e);
        }
      }),
    ];

    return () => {
      listeners.forEach(l => l?.remove?.());
    };
  }, [_start]);

  // ── Public API ────────────────────────────────────────────────────────────

  const startSpeech = useCallback(async () => {
    console.log('[Speech] startSpeech called');
    isActiveRef.current = true;
    await _start();
  }, [_start]);

  const stopSpeech = useCallback(async () => {
    console.log('[Speech] stopSpeech called');
    isActiveRef.current = false; // prevent any pending restart
    setIsListening(false);
    try {
      await stopListening();
    } catch (err) {
      // Safe to ignore — may already be stopped
      console.log('[Speech] stopListening error (safe to ignore):', err);
    }
  }, []);

  return { startSpeech, stopSpeech, isListening };
};

export default useSpeechRecognition;
