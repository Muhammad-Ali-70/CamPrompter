/**
 * FontSizeModal.js
 * Bottom sheet modal for adjusting the teleprompter font size.
 *
 * Uses @react-native-community/slider for the slider control.
 * Install: npm install @react-native-community/slider
 *
 * Shows a live preview of the selected size with sample text.
 */
import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import PrimaryButton from '../Buttons/PrimaryButton';

const MIN = 24;
const MAX = 72;

const FontSizeModal = ({ visible, currentSize, onSave, onClose }) => {
  const [size, setSize] = useState(currentSize);

  const handleSave = () => {
    onSave(size);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Sheet */}
      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        <Label
          type="h5"
          weight="bold"
          color="textPrimary"
          style={styles.heading}
        >
          Font Size
        </Label>

        {/* Live preview */}
        <View style={styles.preview}>
          <Label
            type="body"
            weight="bold"
            color="textPrimary"
            style={{ fontSize: size, lineHeight: size * 1.3 }}
            numberOfLines={1}
          >
            Sample Text
          </Label>
        </View>

        {/* Size value */}
        <Label
          type="body"
          weight="semiBold"
          color="primary"
          style={styles.sizeLabel}
        >
          {size}px
        </Label>

        <Slider
          style={styles.slider}
          minimumValue={MIN}
          maximumValue={MAX}
          step={2}
          value={size}
          onValueChange={v => setSize(Math.round(v))}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.backgroundPrimary}
          thumbTintColor={colors.primary}
        />

        {/* Min / Max labels */}
        <View style={styles.rangeRow}>
          <Label type="bodyXs" color="textSecondary">
            Small ({MIN}px)
          </Label>
          <Label type="bodyXs" color="textSecondary">
            Large ({MAX}px)
          </Label>
        </View>

        {/* Preset quick-picks */}
        <View style={styles.presets}>
          {[28, 36, 48, 60].map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.preset, size === p && styles.presetActive]}
              onPress={() => setSize(p)}
            >
              <Label
                type="bodySmall"
                weight="semiBold"
                style={{
                  color: size === p ? colors.surface : colors.textSecondary,
                }}
              >
                {p}px
              </Label>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          label="Save"
          variant="solid"
          onPress={handleSave}
          style={styles.btn}
        />
      </View>
    </Modal>
  );
};

export default FontSizeModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: wp(5),
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(3),
  },
  handle: {
    width: wp(10),
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
    alignSelf: 'center',
    marginBottom: hp(2),
    opacity: 0.4,
  },
  heading: { textAlign: 'center', marginBottom: hp(2) },
  preview: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 12,
    padding: wp(4),
    alignItems: 'center',
    marginBottom: hp(1.5),
    minHeight: hp(10),
    justifyContent: 'center',
  },
  sizeLabel: { textAlign: 'center', marginBottom: hp(1.5) },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    marginBottom: hp(2.5),
  },
  presets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(2),
    marginBottom: hp(3),
  },
  preset: {
    flex: 1,
    paddingVertical: hp(1),
    borderRadius: 10,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
  },
  presetActive: {
    backgroundColor: colors.primary,
  },
  btn: { width: '100%' },
});

const slider = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
