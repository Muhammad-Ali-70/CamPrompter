/**
 * PreviewActionButtons.js
 * Bottom CTA buttons on the video preview screen.
 *
 *  Row 1: "Save to Gallery"  (full-width, solid blue)
 *  Row 2: "Redo" (half) + "Share" (half)  — secondary outlined style
 *
 * Reuses PrimaryButton with appropriate variants and Lucide icons.
 *
 * ─── Library for Save / Share ────────────────────────────────────────────────
 *  Save to Gallery → react-native-cameraroll  or  expo-media-library
 *    npm install @react-native-camera-roll/camera-roll
 *
 *  Share           → React Native built-in Share API (no install needed)
 *    import { Share } from 'react-native'
 *    Share.share({ url: videoUri, message: 'Check out my video!' })
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Download, RotateCcw, Share2 } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import PrimaryButton from '../Buttons/PrimaryButton';

const PreviewActionButtons = ({ onSave, onRedo, onShare }) => {
  return (
    <View style={styles.container}>
      {/* Save to Gallery — full width solid */}
      <PrimaryButton
        label="Save to Gallery"
        LucideIcon={Download}
        variant="solid"
        onPress={onSave}
        style={styles.fullWidth}
      />

      {/* Redo + Share — side by side secondary */}
      <View style={styles.row}>
        <PrimaryButton
          label="Redo"
          LucideIcon={RotateCcw}
          variant="secondary"
          onPress={onRedo}
          style={styles.halfButton}
        />
        <PrimaryButton
          label="Share"
          LucideIcon={Share2}
          variant="secondary"
          onPress={onShare}
          style={styles.halfButton}
        />
      </View>
    </View>
  );
};

export default PreviewActionButtons;

const styles = StyleSheet.create({
  container: {
    gap: hp(1.4),
  },
  fullWidth: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: wp(3),
  },
  halfButton: {
    flex: 1,
  },
});
