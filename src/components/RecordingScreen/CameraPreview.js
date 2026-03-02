/**
 * CameraPreview.js
 * Bottom half of the recording screen — shows the live camera feed.
 *
 * ─── Library Recommendations ────────────────────────────────────────────────
 *
 * OPTION A — react-native-vision-camera  ✅ RECOMMENDED
 *   The modern, performant camera library. Supports:
 *   - Live camera preview (front/back)
 *   - Video recording (.mp4)
 *   - Frame processors (for AI/ML, e.g. speech detection)
 *   - React Native 0.71+, Expo (with plugin)
 *
 *   Install:
 *     npm install react-native-vision-camera
 *     # iOS: cd ios && pod install
 *     # Add camera + microphone permissions to Info.plist / AndroidManifest.xml
 *
 *   Basic usage (shown below as TODO):
 *     import { Camera, useCameraDevice } from 'react-native-vision-camera'
 *     const device = useCameraDevice('front')
 *     <Camera device={device} isActive={true} style={StyleSheet.absoluteFill} />
 *
 * OPTION B — expo-camera  (if using Expo managed workflow)
 *   Simpler API, good for basic recording, less powerful than VisionCamera.
 *   npm install expo-camera
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This file renders a PLACEHOLDER view (dark surface with "USER" label) so the
 * UI is complete and compilable today. Swap the <View style={styles.cameraBg}>
 * block for a real <Camera> component when the library is installed.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';

// Speed slider shown above the camera (scroll speed control)
import ScrollSpeedSlider from './ScrollSpeedSlider';

const MirroredBadge = () => (
  <View style={styles.mirroredBadge}>
    <Label
      type="caption"
      weight="bold"
      color="textPrimary"
      style={styles.mirroredText}
    >
      MIRRORED
    </Label>
  </View>
);

const UserBox = () => (
  <View style={styles.userBox}>
    <Label
      type="bodySmall"
      weight="bold"
      color="textPrimary"
      style={styles.userText}
    >
      USER
    </Label>
  </View>
);

const CameraPreview = ({
  scrollSpeed,
  onScrollSpeedChange,
  isMirrored = true,
}) => {
  return (
    <View style={styles.container}>
      {/*
        ── SWAP THIS BLOCK when react-native-vision-camera is installed ──
        import { Camera, useCameraDevice } from 'react-native-vision-camera'
        const device = useCameraDevice('front')
        <Camera
          device={device}
          isActive={true}
          style={StyleSheet.absoluteFill}
          isActive={isActive}
          video={true}
          audio={true}
        />
        ──────────────────────────────────────────────────────────────────
      */}
      <View style={styles.cameraBg}>
        {isMirrored && <MirroredBadge />}
        <UserBox />
      </View>

      {/* Scroll speed slider */}
      <ScrollSpeedSlider value={scrollSpeed} onChange={onScrollSpeedChange} />
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1826',
  },
  cameraBg: {
    flex: 1,
    backgroundColor: '#1A2535',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirroredBadge: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(4),
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 6,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  mirroredText: {
    letterSpacing: 1.5,
  },
  userBox: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
  },
  userText: {
    letterSpacing: 2,
  },
});
