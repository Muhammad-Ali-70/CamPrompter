import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from './IconButton';
import { colors } from '../../constants/colors';
import { wp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const FAB = ({ onPress, iconName = 'Video' }) => {
  return (
    <IconButton
      iconName={iconName}
      iconSize={RFValue(24)}
      iconColor={colors.surface}
      backgroundColor={colors.primary}
      size={wp(15)}
      style={styles.fab}
      onPress={onPress}
    />
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: wp(5),
    right: wp(4),
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
