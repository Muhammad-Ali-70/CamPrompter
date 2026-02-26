import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import * as Icons from 'lucide-react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const PrimaryButton = ({
  label = 'Button',
  iconName,
  onPress,
  variant = 'outline',
  style,
}) => {
  const isSolid = variant === 'solid';
  const IconComponent = iconName ? Icons[iconName] : null; // get lucide icon dynamically

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, isSolid ? styles.solid : styles.outline, style]}
    >
      {IconComponent && (
        <View style={styles.iconWrapper}>
          <IconComponent
            size={RFValue(22)}
            color={isSolid ? colors.backgroundPrimary : colors.primary}
          />
        </View>
      )}
      <Label
        type="body"
        weight="bold"
        color={isSolid ? 'textOnLight' : 'primary'}
      >
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
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    gap: wp(2),
  },
  solid: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    backgroundColor: colors.backgroundSecondary,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
