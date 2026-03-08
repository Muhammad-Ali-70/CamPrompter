/**
 * RecordingCompleteInfo.js
 *
 * Shows "Recording Complete" title, formatted duration, and helper subtitle.
 *
 * Props:
 *   duration  — number (seconds), shown as "2:34"
 *   title     — override title string
 *   subtitle  — override subtitle string
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { hp } from '../../constants/responsive';

const formatTime = (secs = 0) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const RecordingCompleteInfo = ({
  duration = 0,
  title = 'Recording Complete',
  subtitle = 'Review your take before saving or sharing with your audience.',
}) => {
  return (
    <View style={styles.container}>
      <Label type="h3" weight="bold" color="textPrimary" style={styles.title}>
        {title}
      </Label>

      {duration > 0 && (
        <Label
          type="bodySmall"
          weight="semiBold"
          color="primary"
          style={styles.duration}
        >
          {formatTime(duration)}
        </Label>
      )}

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
    gap: hp(0.6),
  },
  title: {
    textAlign: 'center',
  },
  duration: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
