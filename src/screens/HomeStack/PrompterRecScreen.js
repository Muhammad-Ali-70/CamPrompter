/**
 * TeleprompterRecordingScreen.js
 *
 * Full-screen recording experience. Split into two halves:
 *   TOP (55%): TeleprompterView — scrolling script with word highlights
 *   BOTTOM (45%): CameraPreview — live camera feed (placeholder until VisionCamera installed)
 *
 * Overlay (absolute):
 *   - RecordingHeader (top: X / timer / settings)
 *   - RecordingControls (bottom: flip / record / script)
 *
 * ─── State managed here ──────────────────────────────────────────────────────
 *  isRecording    → toggled by the record button
 *  elapsed        → timer string "MM:SS", driven by setInterval
 *  highlightIndex → which script word is "active" (advanced by speech engine later)
 *  scrollSpeed    → 0–1 float for teleprompter speed
 *  isMirrored     → camera mirror toggle
 *
 * ─── Libraries to install for full functionality ─────────────────────────────
 *
 *  1. CAMERA & VIDEO RECORDING
 *     react-native-vision-camera  (v4)
 *     npm install react-native-vision-camera
 *     docs: https://react-native-vision-camera.com
 *     → Swap placeholder in CameraPreview.js
 *
 *  2. SPEECH RECOGNITION (word highlighting)
 *     @react-native-voice/voice
 *     npm install @react-native-voice/voice
 *     → Feed Voice.onSpeechPartialResults into highlightIndex state here
 *     → Use a fuzzy match against tokenised script words
 *
 *  3. SCROLL SPEED SLIDER
 *     @react-native-community/slider
 *     npm install @react-native-community/slider
 *     → Swap placeholder in ScrollSpeedSlider.js
 *
 *  4. PERMISSIONS (camera, microphone, speech)
 *     react-native-permissions
 *     npm install react-native-permissions
 *     → Request CAMERA, MICROPHONE, SPEECH_RECOGNITION on mount
 *
 *  5. AUTO-SCROLL (no library needed)
 *     Use a ref on TeleprompterView's ScrollView + setInterval
 *     scrollViewRef.current.scrollTo({ y: position, animated: true })
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import TeleprompterView from '../../components/RecordingScreen/TeleprompterView';
import CameraPreview from '../../components/RecordingScreen/CameraPreview';
import RecordingHeader from '../../components/RecordingScreen/RecordingHeader';
import RecordingControls from '../../components/RecordingScreen/RecordingControls';

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatElapsed = seconds => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

// ── Screen ───────────────────────────────────────────────────────────────────
const PrompterRecScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Script text passed from ScriptEditorScreen via navigation params
  const script =
    route?.params?.script ??
    'Welcome to the teleprompter app. This is where your script will scroll. Look directly at the camera lens to maintain eye contact with your audience.';

  // ── State ─────────────────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0.3);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const timerRef = useRef(null);

  // ── Timer logic ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleRecord = useCallback(() => {
    if (isRecording) {
      // TODO: call cameraRef.current.stopRecording() from VisionCamera
      setIsRecording(false);
    } else {
      setElapsedSeconds(0);
      setHighlightIndex(0);
      // TODO: call cameraRef.current.startRecording({ ... }) from VisionCamera
      // TODO: start Voice recognition from @react-native-voice/voice
      setIsRecording(true);
    }
  }, [isRecording]);

  const handleFlipCamera = useCallback(() => {
    setIsFrontCamera(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    if (isRecording) {
      // TODO: stop recording before leaving
      setIsRecording(false);
    }
    navigation.goBack();
  }, [isRecording, navigation]);

  const handleSettings = useCallback(() => {
    // TODO: open recording settings modal (font size, speed, mirror, etc.)
    console.log('Recording settings');
  }, []);

  const handleScript = useCallback(() => {
    // TODO: open script picker / editor overlay
    console.log('Script toggle');
  }, []);

  const handleDone = useCallback(() => {
    navigation.navigate('VideoPreviewScreen');
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar hidden />

      {/* TOP: Teleprompter script */}
      <View style={styles.teleprompterSection}>
        <TeleprompterView script={script} highlightIndex={highlightIndex} />
      </View>

      {/* BOTTOM: Camera preview */}
      <View style={styles.cameraSection}>
        <CameraPreview
          scrollSpeed={scrollSpeed}
          onScrollSpeedChange={setScrollSpeed}
          isMirrored={isMirrored}
          isFrontCamera={isFrontCamera}
        />
      </View>

      {/* OVERLAY: Header (absolute top) */}
      <RecordingHeader
        elapsed={formatElapsed(elapsedSeconds)}
        isRecording={isRecording}
        onClose={handleClose}
        onSettings={handleSettings}
      />

      {/* OVERLAY: Controls (absolute bottom) */}
      <View style={styles.controlsOverlay}>
        <RecordingControls
          isRecording={isRecording}
          onRecord={handleRecord}
          onFlipCamera={handleFlipCamera}
          onScript={handleScript}
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
  teleprompterSection: {
    flex: 50, // 55% of screen height
  },
  cameraSection: {
    flex: 45, // 45% of screen height
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
