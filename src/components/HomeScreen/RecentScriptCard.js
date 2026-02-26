import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import StatusTag from '../UI/StatusTag';
import IconButton from '../Buttons/IconButton';

const RecentScriptCard = ({
  title = 'Untitled Script',
  editedLabel = 'Edited just now',
  readTime = '',
  iconName = 'Mic',
  status,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.topRow}>
        <IconButton
          iconName={iconName}
          iconSize={20}
          iconColor={colors.textPrimary}
          backgroundColor={colors.backgroundPrimary}
          size={wp(12)}
          borderRadius={borderRadiusPrimary}
        />
        {status && <StatusTag status={status} />}
      </View>

      <View style={styles.bottomBlock}>
        <Label
          type="bodySmall"
          weight="bold"
          color="textPrimary"
          numberOfLines={2}
        >
          {title}
        </Label>
        <Label type="bodyXs" color="textSecondary" style={styles.meta}>
          {editedLabel}
          {readTime ? ` • ${readTime}` : ''}
        </Label>
      </View>
    </TouchableOpacity>
  );
};

export default RecentScriptCard;

const styles = StyleSheet.create({
  card: {
    width: wp(52),
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadiusPrimary,
    padding: wp(4),
    marginRight: wp(3),
    justifyContent: 'space-between',
    minHeight: hp(16),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  bottomBlock: {
    gap: hp(0.5),
  },
  meta: {
    marginTop: hp(0.3),
  },
});
