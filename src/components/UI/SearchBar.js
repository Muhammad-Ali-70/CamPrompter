/**
 * SearchBar.js
 * Reusable search input with a search icon on the left.
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderRadiusPrimary } from '../../constants/globalstyle';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Search size={RFValue(16)} color={colors.textSecondary} strokeWidth={2} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadiusPrimary,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    gap: wp(2.5),
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: RFValue(12),
    padding: 0,
    margin: 0,
  },
});
