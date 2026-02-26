/**
 * StatusTag.js
 * A small badge/tag used on script cards to show status (e.g. "Ready").
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';

const STATUS_COLORS = {
  Ready: '#00C48C', // green
  Draft: colors.primary, // orange
  Review: '#FFD700', // yellow
  Default: 'blue',
};

const StatusTag = ({ status = 'Ready', style }) => {
  const tagColor = STATUS_COLORS[status] || STATUS_COLORS.Default;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tagColor + '22', borderColor: tagColor },
        style,
      ]}
    >
      <Label type="bodyXs" weight="semiBold" style={{ color: tagColor }}>
        {status}
      </Label>
    </View>
  );
};

export default StatusTag;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
