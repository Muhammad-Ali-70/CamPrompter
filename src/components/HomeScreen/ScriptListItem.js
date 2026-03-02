import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const ScriptListItem = ({
  title = 'Untitled Script',
  date = '',
  time = '',
  duration = '',
  onPress,
}) => {
  const DocumentIcon = Icons['FileText']; // Lucide icon

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Left: Icon */}
      <View style={styles.iconWrapper}>
        <DocumentIcon size={RFValue(20)} color={colors.textSecondary} />
      </View>

      {/* Middle: Title + Meta */}
      <View style={styles.textBlock}>
        <Label
          type="bodySmall"
          weight="semiBold"
          color="textPrimary"
          numberOfLines={1}
        >
          {title}
        </Label>
        <Label type="bodyXs" color="textSecondary">
          {date}
          {time ? `  •  ${time}` : ''}
        </Label>
      </View>

      {/* Right: Duration */}
      {duration && (
        <View style={styles.durationBlock}>
          <Label type="bodySmall" weight="bold" color="textPrimary">
            {duration}
          </Label>
          <Label type="caption" color="textSecondary">
            min
          </Label>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ScriptListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadiusPrimary,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    marginBottom: hp(1.2),
    gap: wp(3),
  },
  iconWrapper: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    backgroundColor: colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    gap: hp(0.3),
  },
  durationBlock: {
    alignItems: 'flex-end',
  },
});
