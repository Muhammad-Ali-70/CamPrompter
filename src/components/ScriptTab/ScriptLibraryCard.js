/**
 * ScriptLibraryCard.js
 * Row card for a single script in the Scripts Library.
 * Shows title, truncated preview text, status badge, and meta (date/time).
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import StatusTag from '../UI/StatusTag';

const ScriptLibraryCard = ({ title, preview, status, meta, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Label
      type="bodySmall"
      weight="bold"
      color="textPrimary"
      numberOfLines={1}
      style={styles.title}
    >
      {title}
    </Label>
    <Label
      type="bodyXs"
      color="textSecondary"
      numberOfLines={2}
      style={styles.preview}
    >
      {preview}
    </Label>
    <View style={styles.footer}>
      {status && <StatusTag status={status} />}
      <Label type="bodyXs" color="textSecondary">
        {meta}
      </Label>
    </View>
  </TouchableOpacity>
);

export default ScriptLibraryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadiusPrimary,
    padding: wp(3),
    marginBottom: hp(1),
  },
  title: {
    marginBottom: hp(0.6),
  },
  preview: {
    lineHeight: 20,
    marginBottom: hp(1.2),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
});
