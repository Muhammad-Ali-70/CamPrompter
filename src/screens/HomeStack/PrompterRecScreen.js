/**
 * PrompterRecScreen.js
 *
 * The orchestrator. Wires together:
 *   1. VisionCamera recording  (via cameraRef → CameraPreview)
 *   2. Speech recognition      (via useSpeechRecognition)
 *   3. Word matching           (via useWordMatcher)
 *   4. Teleprompter scroll     (via teleprompterRef → TeleprompterView)
 *
 * ── Data flow ────────────────────────────────────────────────────────────────
 *
 *  User speaks
 *    → useSpeechRecognition fires onPartialResult(text)
 *      → useWordMatcher.updateTranscript(text) returns highlightIndex
 *        → passed as prop to TeleprompterView
 *          → TeleprompterView calls scrollToWord(highlightIndex)
 *
 * ── Recording modes ──────────────────────────────────────────────────────────
 *
 *  SPEECH-TRACKING MODE (default when recording):
 *    - Speech recognition runs in parallel with video recording.
 *    - Teleprompter scrolls to track the spoken word.
 *    - Speed slider is hidden (scroll is driven by speech, not speed).
 *
 *  SPEED-BASED MODE (fallback — when speech is unavailable or user prefers):
 *    - Teleprompter auto-scrolls at a fixed speed set by the slider.
 *    - No speech recognition.
 *    - Toggle via the settings button (TODO: settings modal).
 *
 * Currently defaults to SPEECH-TRACKING MODE.
 * Set `USE_SPEECH_TRACKING = false` to use speed-based mode instead.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import TeleprompterView from '../../components/RecordingScreen/TeleprompterView';
import CameraPreview from '../../components/RecordingScreen/CameraPreview';
import RecordingHeader from '../../components/RecordingScreen/RecordingHeader';
import RecordingControls from '../../components/RecordingScreen/RecordingControls';

import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import useWordMatcher from '../../hooks/useWordMatcher';

const USE_SPEECH_TRACKING = true; // set false to use speed-based scroll only

const formatElapsed = seconds => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const requestAndroidMicPermission = async () => {
  if (Platform.OS !== 'android') return true;
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'Needed for speech-to-text word tracking',
        buttonPositive: 'OK',
      },
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
};

// ── Screen ────────────────────────────────────────────────────────────────────
const PrompterRecScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const script =
    route?.params?.script ??
    'Welcome to the teleprompter app. This is where your script will scroll. Look directly at the camera lens to maintain eye contact with your audience.';

  // ── UI state ───────────────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0.3);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const cameraRef = useRef(null);
  const teleprompterRef = useRef(null);
  const timerRef = useRef(null);

  // ── Word matching ──────────────────────────────────────────────────────────
  const {
    highlightIndex,
    updateTranscript,
    reset: resetMatcher,
  } = useWordMatcher(script);

  // ── Speech recognition ────────────────────────────────────────────────────
  const handlePartialResult = useCallback(
    text => {
      if (USE_SPEECH_TRACKING) updateTranscript(text);
    },
    [updateTranscript],
  );

  const handleFinalResult = useCallback(
    text => {
      if (USE_SPEECH_TRACKING) updateTranscript(text);
    },
    [updateTranscript],
  );

  const { startSpeech, stopSpeech } = useSpeechRecognition({
    onPartialResult: handlePartialResult,
    onFinalResult: handleFinalResult,
    lang: 'en-US',
  });

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // ── Record / Stop ──────────────────────────────────────────────────────────
  const handleRecord = useCallback(async () => {
    if (isRecording) {
      // ── STOP ──────────────────────────────────────────────────────────────
      cameraRef.current?.stopRecording(); // triggers onRecordingFinished
      teleprompterRef.current?.stopAutoScroll();
      if (USE_SPEECH_TRACKING) await stopSpeech();
      setIsRecording(false);
    } else {
      // ── START ─────────────────────────────────────────────────────────────
      setElapsedSeconds(0);
      resetMatcher();
      teleprompterRef.current?.resetScroll();

      // Request Android mic permission for speech recognition
      if (USE_SPEECH_TRACKING) await requestAndroidMicPermission();

      // Start video recording
      cameraRef.current?.startRecording({
        onRecordingFinished: video => {
          navigation.navigate('VideoPreviewScreen', { videoUri: video.path });
        },
        onRecordingError: err => {
          console.error('[Camera] recording error:', err);
          setIsRecording(false);
          teleprompterRef.current?.stopAutoScroll();
        },
      });

      if (USE_SPEECH_TRACKING) {
        // Start speech in parallel — slight delay for camera init
        setTimeout(() => startSpeech(), 20);
      } else {
        // Speed-based mode: start timed auto-scroll
        setTimeout(
          () => teleprompterRef.current?.startAutoScroll(scrollSpeed),
          1,
        );
      }

      setIsRecording(true);
    }
  }, [
    isRecording,
    scrollSpeed,
    navigation,
    startSpeech,
    stopSpeech,
    resetMatcher,
  ]);

  // ── Other handlers ─────────────────────────────────────────────────────────
  const handleFlipCamera = useCallback(() => setIsFrontCamera(p => !p), []);

  const handleClose = useCallback(() => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      teleprompterRef.current?.stopAutoScroll();
      stopSpeech();
      setIsRecording(false);
    }
    navigation.goBack();
  }, [isRecording, navigation, stopSpeech]);

  const handleSettings = useCallback(() => {
    // TODO: open settings modal (font size, speech on/off, speed, mirror)
  }, []);

  const handleDone = useCallback(() => {
    if (isRecording) {
      cameraRef.current?.stopRecording(); // will navigate via onRecordingFinished
      teleprompterRef.current?.stopAutoScroll();
      stopSpeech();
      setIsRecording(false);
    } else {
      navigation.navigate('VideoPreviewScreen');
    }
  }, [isRecording, navigation, stopSpeech]);

  const handleScrollSpeedChange = useCallback(
    newSpeed => {
      setScrollSpeed(newSpeed);
      // Only relevant in speed-based mode
      if (!USE_SPEECH_TRACKING && isRecording) {
        teleprompterRef.current?.setSpeed(newSpeed);
      }
    },
    [isRecording],
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar hidden />

      {/* TOP 55% — Teleprompter */}
      <View style={styles.teleprompterSection}>
        <TeleprompterView
          ref={teleprompterRef}
          script={script}
          highlightIndex={highlightIndex}
        />
      </View>

      {/* BOTTOM 45% — Camera */}
      <View style={styles.cameraSection}>
        <CameraPreview
          ref={cameraRef}
          scrollSpeed={scrollSpeed}
          onScrollSpeedChange={handleScrollSpeedChange}
          isFrontCamera={isFrontCamera}
        />
      </View>

      {/* OVERLAY — Header */}
      <RecordingHeader
        elapsed={formatElapsed(elapsedSeconds)}
        isRecording={isRecording}
        onClose={handleClose}
        onSettings={handleSettings}
      />

      {/* OVERLAY — Controls */}
      <View style={styles.controlsOverlay}>
        <RecordingControls
          isRecording={isRecording}
          onRecord={handleRecord}
          onFlipCamera={handleFlipCamera}
          onScript={() => {}}
          onDone={handleDone}
        />
      </View>
    </View>
  );
};

export default PrompterRecScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  teleprompterSection: { flex: 40 },
  cameraSection: { flex: 45 },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
