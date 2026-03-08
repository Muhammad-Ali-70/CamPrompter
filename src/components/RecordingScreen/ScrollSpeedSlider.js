import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
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

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.backgroundSecondary}
        thumbTintColor={colors.textPrimary}
      />

      {/* Fast icon */}
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
  slider: {
    flex: 1,
  },
});
