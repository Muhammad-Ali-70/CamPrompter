/**
 * RecordingControls.js
 * Bottom control bar with:
 *  - Camera flip (left)
 *  - Record/Stop button (center, large red circle)
 *  - Script viewer toggle (right)
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import IconButton from '../Buttons/IconButton';

const RecordButton = ({ isRecording, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={styles.recordOuter}
  >
    <View
      style={[styles.recordInner, isRecording && styles.recordInnerActive]}
    />
  </TouchableOpacity>
);

const RecordingControls = ({
  isRecording = false,
  onRecord,
  onFlipCamera,
  onScript,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        iconName="RefreshCw"
        iconSize={RFValue(15)}
        iconColor={colors.textPrimary}
        backgroundColor={colors.backgroundSecondary}
        size={wp(12)}
        onPress={onFlipCamera}
      />

      {/* Record / Stop */}
      <RecordButton isRecording={isRecording} onPress={onRecord} />

      {/* Script toggle */}

      <IconButton
        iconName="FileText"
        iconSize={RFValue(15)}
        iconColor={colors.textPrimary}
        backgroundColor={colors.backgroundSecondary}
        size={wp(12)}
        onPress={onScript}
      />
    </View>
  );
};

export default RecordingControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    paddingVertical: hp(2),
    backgroundColor: colors.backgroundPrimary,
  },
  recordOuter: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    backgroundColor: 'rgba(255, 59, 48, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInner: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: '#FF3B30',
  },
  recordInnerActive: {
    // When recording, inner becomes a rounded square (stop icon)
    borderRadius: wp(2),
    width: wp(9),
    height: wp(9),
  },
});
