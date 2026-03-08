/**
 * PreviewActionButtons.js
 *
 * Action buttons on the video preview screen.
 *
 *  Row 1: "Save to Gallery"  — full-width solid, shows loading while saving
 *  Row 2: "Redo" + "Share"   — half-width secondary
 *
 * Props:
 *   onSave    — async handler, triggers CameraRoll.save in parent
 *   onRedo    — navigates back to recording screen
 *   onShare   — opens native Share sheet
 *   isSaving  — boolean, disables Save button and shows loading label
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Download, RotateCcw, Share2 } from 'lucide-react-native';
import { hp, wp } from '../../constants/responsive';
import PrimaryButton from '../Buttons/PrimaryButton';

const PreviewActionButtons = ({
  onSave,
  onRedo,
  onShare,
  isSaving = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Save to Gallery — full width */}
      <PrimaryButton
        label={isSaving ? 'Saving…' : 'Save to Gallery'}
        LucideIcon={Download}
        variant="solid"
        onPress={onSave}
        disabled={isSaving}
        style={styles.fullWidth}
      />

      {/* Redo + Share — side by side */}
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
