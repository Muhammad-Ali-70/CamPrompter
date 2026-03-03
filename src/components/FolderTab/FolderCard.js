/**
 * FolderCard.js - Grid card for a single folder.
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Folder, MoreVertical } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const FolderCard = ({
  name,
  scriptCount,
  iconColor = colors.primary,
  onPress,
  onMenuPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress} hitSlop={8}>
      <MoreVertical
        size={RFValue(16)}
        color={colors.textSecondary}
        strokeWidth={2}
      />
    </TouchableOpacity>
    <View style={[styles.iconWrap, { backgroundColor: iconColor + '22' }]}>
      <Folder size={RFValue(24)} color={iconColor} strokeWidth={1.8} />
    </View>
    <Label type="body" weight="bold" color="textPrimary" style={styles.name}>
      {name}
    </Label>
    <Label type="bodyXs" color="textSecondary">
      {scriptCount} {scriptCount === 1 ? 'script' : 'scripts'}
    </Label>
  </TouchableOpacity>
);

export default FolderCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: wp(3),
    paddingTop: wp(3),
    minHeight: hp(10),
    justifyContent: 'flex-end',
  },
  menuBtn: {
    position: 'absolute',
    top: wp(3),
    right: wp(3),
  },
  iconWrap: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  name: { marginBottom: hp(0.3) },
});
