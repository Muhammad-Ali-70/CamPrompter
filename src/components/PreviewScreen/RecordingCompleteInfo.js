/**
 * RecordingCompleteInfo.js
 * Simple text block shown below the video player.
 * Title: "Recording Complete"
 * Subtitle: descriptive helper text
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { hp } from '../../constants/responsive';

const RecordingCompleteInfo = ({
  title = 'Recording Complete',
  subtitle = 'Review your take before saving or sharing with your audience.',
}) => {
  return (
    <View style={styles.container}>
      <Label type="h3" weight="bold" color="textPrimary" style={styles.title}>
        {title}
      </Label>
      <Label type="bodySmall" color="textSecondary" style={styles.subtitle}>
        {subtitle}
      </Label>
    </View>
  );
};

export default RecordingCompleteInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: hp(3),
  },
  title: {
    textAlign: 'center',
    marginBottom: hp(0.8),
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
