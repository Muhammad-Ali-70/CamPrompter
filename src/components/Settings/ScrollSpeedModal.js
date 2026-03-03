import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import PrimaryButton from '../Buttons/PrimaryButton';
import Slider from '@react-native-community/slider';

const MIN = 50;
const MAX = 300;

const PRESETS = [
  { label: 'Slow', wpm: 80 },
  { label: 'Medium', wpm: 150 },
  { label: 'Fast', wpm: 220 },
];

const speedLabel = wpm => {
  if (wpm <= 90) return 'Slow';
  if (wpm <= 180) return 'Medium';
  return 'Fast';
};

const SliderPlaceholder = ({ value }) => {
  const pct = (value - MIN) / (MAX - MIN);
  return (
    <View style={slider.track}>
      <View style={[slider.fill, { width: `${pct * 100}%` }]} />
    </View>
  );
};

const ScrollSpeedModal = ({ visible, currentSpeed, onSave, onClose }) => {
  const [speed, setSpeed] = useState(currentSpeed);

  const handleSave = () => {
    onSave(speed);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Label
          type="h5"
          weight="bold"
          color="textPrimary"
          style={styles.heading}
        >
          Scroll Speed
        </Label>

        {/* Current speed display */}
        <View style={styles.speedDisplay}>
          <Label type="h2" weight="extraBold" color="primary">
            {speed}
          </Label>
          <Label type="bodySmall" color="textSecondary" style={styles.wpmLabel}>
            wpm
          </Label>
          <Label
            type="bodySmall"
            color="textSecondary"
            style={styles.speedName}
          >
            ({speedLabel(speed)})
          </Label>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={MIN}
          maximumValue={MAX}
          step={5}
          value={speed}
          onValueChange={v => setSpeed(Math.round(v))}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.backgroundPrimary}
          thumbTintColor={colors.primary}
        />

        <SliderPlaceholder value={speed} />

        <View style={styles.rangeRow}>
          <Label type="bodyXs" color="textSecondary">
            {MIN} wpm
          </Label>
          <Label type="bodyXs" color="textSecondary">
            {MAX} wpm
          </Label>
        </View>

        {/* Preset buttons */}
        <View style={styles.presets}>
          {PRESETS.map(p => (
            <TouchableOpacity
              key={p.wpm}
              style={[styles.preset, speed === p.wpm && styles.presetActive]}
              onPress={() => setSpeed(p.wpm)}
            >
              <Label
                type="bodySmall"
                weight="semiBold"
                style={{
                  color:
                    speed === p.wpm ? colors.surface : colors.textSecondary,
                }}
              >
                {p.label}
              </Label>
              <Label
                type="bodyXs"
                style={{
                  color:
                    speed === p.wpm ? colors.surface : colors.textSecondary,
                }}
              >
                {p.wpm} wpm
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

export default ScrollSpeedModal;

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
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
  speedDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: wp(1.5),
    marginBottom: hp(2),
  },
  wpmLabel: { alignSelf: 'flex-end', paddingBottom: 2 },
  speedName: { alignSelf: 'flex-end', paddingBottom: 2 },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    marginBottom: hp(2.5),
  },
  presets: {
    flexDirection: 'row',
    gap: wp(2.5),
    marginBottom: hp(3),
  },
  preset: {
    flex: 1,
    paddingVertical: hp(1.2),
    borderRadius: 12,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    gap: hp(0.3),
  },
  presetActive: { backgroundColor: colors.primary },
  btn: { width: '100%' },
});

const slider = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
});
