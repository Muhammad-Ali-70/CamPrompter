/**
 * ScrollSpeedSlider.js
 * Horizontal slider to control teleprompter scroll speed.
 * Left icon = slow (triangle/filter), Right icon = fast (grid/snowflake).
 *
 * Uses React Native's built-in <Slider> via @react-native-community/slider.
 *
 * Install:
 *   npm install @react-native-community/slider
 *
 * Placeholder <View> is rendered until installed — swap in the TODO block.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Filter, LayoutGrid } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const ScrollSpeedSlider = ({ value = 0.3, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Slow icon */}
      <Filter
        size={RFValue(16)}
        color={colors.textSecondary}
        strokeWidth={1.5}
      />

      {/*
        ── SWAP when @react-native-community/slider is installed ──
        import Slider from '@react-native-community/slider'
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.backgroundSecondary}
          thumbTintColor={colors.textPrimary}
        />
        ──────────────────────────────────────────────────────────
      */}
      <View style={styles.sliderPlaceholder}>
        <View style={[styles.sliderTrack, { width: `${value * 100}%` }]} />
      </View>

      <LayoutGrid
        size={RFValue(16)}
        color={colors.textSecondary}
        strokeWidth={1.5}
      />
    </View>
  );
};

export default ScrollSpeedSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    gap: wp(3),
  },
  sliderPlaceholder: {
    flex: 1,
    height: 3,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderTrack: {
    height: '100%',
    backgroundColor: colors.textSecondary,
    borderRadius: 2,
  },
});
