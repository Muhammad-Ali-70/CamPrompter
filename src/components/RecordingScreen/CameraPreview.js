/**
 * CameraPreview.js
 *
 * Live camera feed. Exposes startRecording / stopRecording via forwardRef.
 * The parent screen (PrompterRecScreen) drives all recording logic.
 */
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import ScrollSpeedSlider from './ScrollSpeedSlider';
import { colors } from '../../constants/colors';

const CameraPreview = forwardRef(
  ({ scrollSpeed, onScrollSpeedChange, isFrontCamera = true }, ref) => {
    const { hasPermission: hasCam, requestPermission: requestCam } =
      useCameraPermission();
    const { hasPermission: hasMic, requestPermission: requestMic } =
      useMicrophonePermission();

    const cameraRef = useRef(null);
    const device = useCameraDevice(isFrontCamera ? 'front' : 'back');

    useEffect(() => {
      if (!hasCam) requestCam();
      if (!hasMic) requestMic();
    }, [hasCam, hasMic]);

    // ── Imperative handle ──────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      startRecording: ({ onRecordingFinished, onRecordingError }) => {
        cameraRef.current?.startRecording({
          onRecordingFinished,
          onRecordingError,
        });
      },
      stopRecording: () => {
        cameraRef.current?.stopRecording();
      },
    }));

    if (!hasCam || !hasMic) {
      return (
        <View style={styles.center}>
          <Text style={styles.msg}>Requesting camera & microphone access…</Text>
        </View>
      );
    }

    if (!device) {
      return (
        <View style={styles.center}>
          <Text style={styles.msg}>No camera found</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          video={true}
          audio={false}
        />
        <ScrollSpeedSlider value={scrollSpeed} onChange={onScrollSpeedChange} />
      </View>
    );
  },
);

export default CameraPreview;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
