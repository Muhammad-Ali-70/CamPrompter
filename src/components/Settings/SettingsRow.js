/**
 * SettingsRow.js
 * A single settings row. Supports two modes:
 *  - type="navigate" → shows a chevron, calls onPress when tapped
 *  - type="toggle"   → shows a Switch, calls onToggle(newValue)
 *
 * Props:
 *  LucideIcon    — icon component
 *  iconBg        — icon background color
 *  iconColor     — icon tint
 *  label         — row title
 *  subtitle      — optional sub-label (value preview, description)
 *  type          — 'navigate' | 'toggle'
 *  value         — boolean (toggle state)
 *  onPress       — called for navigate rows
 *  onToggle      — called for toggle rows
 *  isLast        — hides the bottom divider on last row
 */
import React from 'react';
import { View, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const SettingsRow = ({
  LucideIcon,
  iconBg = colors.backgroundSecondary,
  iconColor = colors.primary,
  label,
  subtitle,
  type = 'navigate',
  value = false,
  onPress,
  onToggle,
  isLast = false,
}) => {
  const content = (
    <View style={[styles.row, !isLast && styles.border]}>
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        {LucideIcon && (
          <LucideIcon size={RFValue(18)} color={iconColor} strokeWidth={2} />
        )}
      </View>

      {/* Labels */}
      <View style={styles.textBlock}>
        <Label type="body" weight="semiBold" color="textPrimary">
          {label}
        </Label>
        {subtitle ? (
          <Label type="bodyXs" color="textSecondary" style={styles.subtitle}>
            {subtitle}
          </Label>
        ) : null}
      </View>

      {/* Right control */}
      {type === 'toggle' ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.backgroundPrimary, true: colors.primary }}
          thumbColor={colors.surface}
        />
      ) : (
        <ChevronRight
          size={RFValue(18)}
          color={colors.textSecondary}
          strokeWidth={2}
        />
      )}
    </View>
  );

  if (type === 'toggle') return content;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      {content}
    </TouchableOpacity>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(4),
    gap: wp(3),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundPrimary,
  },
  iconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: { flex: 1 },
  subtitle: { marginTop: hp(0.2) },
});
