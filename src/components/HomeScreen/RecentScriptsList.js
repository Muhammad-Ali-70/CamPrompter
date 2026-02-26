/**
 * RecentScriptsList.js
 * Horizontal scrollable list of RecentScriptCard items.
 */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import SectionHeader from './SectionHeader';
import RecentScriptCard from './RecentScriptCard';

const RECENT_SCRIPTS = [
  {
    id: '1',
    title: 'Product Launch Keynote',
    editedLabel: 'Edited 2m ago',
    readTime: '5 min read',
    iconName: 'Mic',
    status: 'Ready',
  },
  {
    id: '2',
    title: 'Instagram Reel Script',
    editedLabel: 'Edited 2h ago',
    readTime: '2 min read',
    iconName: 'Video',
    status: 'Draft',
  },
  {
    id: '3',
    title: 'Podcast Intro',
    editedLabel: 'Edited 1d ago',
    readTime: '1 min read',
    iconName: 'Podcast',
    status: 'Review',
  },
];

const RecentScriptsList = ({ onViewAll, onScriptPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader
          title="Recent Scripts"
          actionLabel="View All"
          onActionPress={onViewAll}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {RECENT_SCRIPTS.map(script => (
          <RecentScriptCard
            key={script.id}
            {...script}
            onPress={() => onScriptPress && onScriptPress(script)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentScriptsList;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2.5),
  },
  header: {
    paddingHorizontal: wp(4),
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(0.5),
  },
});
