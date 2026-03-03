/**
 * SettingsGroup.js
 * A labeled card container that wraps one or more SettingsRow components.
 *
 * Props:
 *  title    — section heading (e.g. "TELEPROMPTER")
 *  children — SettingsRow components
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';

const SettingsGroup = ({ title, children }) => (
  <View style={styles.container}>
    <Label type="caption" weight="bold" color="primary" style={styles.title}>
      {title}
    </Label>
    <View style={styles.card}>{children}</View>
  </View>
);

export default SettingsGroup;

const styles = StyleSheet.create({
  container: { marginBottom: hp(2.5) },
  title: {
    letterSpacing: 1.5,
    marginBottom: hp(1),
    paddingHorizontal: wp(1),
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
