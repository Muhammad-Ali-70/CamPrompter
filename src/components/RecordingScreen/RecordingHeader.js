/**
 * RecordingHeader.js
 * Minimal overlay header for the recording screen.
 *
 * Left:    X (close/stop)
 * Center:  ● 00:00 timer pill
 * Right:   Settings gear icon
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import IconButton from '../Buttons/IconButton';

const RECORDING_DOT_COLOR = '#FF3B30';

const TimerPill = ({ elapsed = '00:00', isRecording = false }) => (
  <View style={styles.timerPill}>
    <View
      style={[
        styles.dot,
        { backgroundColor: isRecording ? RECORDING_DOT_COLOR : '#888' },
      ]}
    />
    <Label
      type="bodySmall"
      weight="bold"
      color="textPrimary"
      style={styles.timerText}
    >
      {elapsed}
    </Label>
  </View>
);

const RecordingHeader = ({ elapsed, isRecording, onClose, onSettings }) => {
  return (
    <View style={styles.container}>
      <IconButton
        iconName="X"
        iconSize={RFValue(20)}
        iconColor={colors.textPrimary}
        backgroundColor={colors.backgroundSecondary}
        size={wp(10)}
        onPress={onClose}
      />

      {/* Timer */}
      <TimerPill elapsed={elapsed} isRecording={isRecording} />

      <IconButton
        iconName="Settings"
        iconSize={RFValue(20)}
        iconColor={colors.textPrimary}
        backgroundColor={colors.backgroundSecondary}
        size={wp(10)}
        onPress={onSettings}
      />
    </View>
  );
};

export default RecordingHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    padding: hp(0),
    paddingBottom: hp(0.5),
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
    gap: wp(1.5),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timerText: {
    letterSpacing: 1,
  },
});
