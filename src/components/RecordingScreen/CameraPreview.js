/**
 * CameraPreview.js
 * Live camera feed using react-native-vision-camera.
 * Defaults to front camera. Flips on isFrontCamera prop change.
 */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import ScrollSpeedSlider from './ScrollSpeedSlider';
import { colors } from '../../constants/colors';

const CameraPreview = ({
  scrollSpeed,
  onScrollSpeedChange,
  isFrontCamera = true,
}) => {
  const { hasPermission: hasCam, requestPermission: requestCam } =
    useCameraPermission();
  const { hasPermission: hasMic, requestPermission: requestMic } =
    useMicrophonePermission();

  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');

  if (!hasCam || !hasMic) {
    requestCam();
    requestMic();
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>Requesting camera & microphone access...</Text>
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
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />
      <ScrollSpeedSlider value={scrollSpeed} onChange={onScrollSpeedChange} />
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
