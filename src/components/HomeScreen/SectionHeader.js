import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { hp } from '../../constants/responsive';

const SectionHeader = ({ title, actionLabel, onActionPress }) => {
  return (
    <View style={styles.container}>
      <Label type="h5" weight="bold" color="textPrimary">
        {title}
      </Label>

      {actionLabel && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Label type="bodySmall" weight="bold" color="primary">
            {actionLabel}
          </Label>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    marginTop: hp(1),
  },
});
