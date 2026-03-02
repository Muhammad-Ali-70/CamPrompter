import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const VARIANT_STYLES = {
  solid: {
    background: colors.primary,
    textColor: colors.textPrimary,
    iconColor: colors.textPrimary,
    borderWidth: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  outline: {
    background: 'transparent',
    textColor: colors.primary,
    iconColor: colors.primary,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  secondary: {
    background: colors.backgroundSecondary,
    textColor: colors.textPrimary,
    iconColor: colors.textSecondary,
    borderWidth: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
};

const PrimaryButton = ({
  label = 'Button',
  LucideIcon,
  onPress,
  variant = 'solid',
  style,
  disabled = false,
}) => {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.solid;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: v.background,
          borderWidth: v.borderWidth,
          borderColor: v.borderColor,
          borderStyle: v.borderStyle,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {LucideIcon && (
        <LucideIcon size={RFValue(20)} color={v.iconColor} strokeWidth={2} />
      )}
      <Label type="body" weight="bold" style={{ color: v.textColor }}>
        {label}
      </Label>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadiusPrimary,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(6),
    gap: wp(2.5),
  },
});
