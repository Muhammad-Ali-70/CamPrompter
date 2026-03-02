import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const ScreenHeader = ({
  title,
  onBack,
  rightLabel,
  rightIcon: RightIcon,
  onRightPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <ChevronLeft
              size={RFValue(22)}
              color={colors.textPrimary}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Label type="body" weight="bold" color="textPrimary">
          {title}
        </Label>
      </View>

      <View style={[styles.side, styles.rightSide]}>
        {rightLabel && (
          <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
            <Label type="body" weight="semiBold" color="primary">
              {rightLabel}
            </Label>
          </TouchableOpacity>
        )}
        {!rightLabel && RightIcon && (
          <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
            <RightIcon size={RFValue(22)} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  side: {
    width: wp(18),
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: wp(1),
    marginLeft: -wp(1),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
