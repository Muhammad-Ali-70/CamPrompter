/**
 * FilterTabs.js
 * Horizontal pill-style filter tabs: All | Recent | Favorites
 */
import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';

const TABS = ['All', 'Recent', 'Favorites'];

const FilterTabs = ({ activeTab, onTabPress }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {TABS.map(tab => {
      const isActive = activeTab === tab;
      return (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onTabPress(tab)}
          activeOpacity={0.8}
        >
          <Label
            type="bodySmall"
            weight={isActive ? 'bold' : 'regular'}
            style={{
              color: isActive ? colors.textOnLight : colors.textSecondary,
            }}
          >
            {tab}
          </Label>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: wp(2),
    paddingVertical: hp(0.5),
  },
  tab: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.9),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.backgroundSecondary,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
