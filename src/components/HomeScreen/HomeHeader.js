/**
 * HomeHeader.js
 * Top header for the Home screen with app logo/name and search icon.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../UI/Logo';
import IconButton from '../Buttons/IconButton';
import { Camera } from 'lucide-react-native';

const HomeHeader = ({ onSearchPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Logo height={hp(5)} />
      </View>

      <IconButton
        iconName="Search"
        iconSize={RFValue(20)}
        iconColor={colors.textPrimary}
        backgroundColor={colors.backgroundSecondary}
        size={wp(11)}
        onPress={onSearchPress}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: colors.backgroundPrimary,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
});
