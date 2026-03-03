/**
 * RecentScriptsList.js
 * Shows the 5 most recent scripts from Firestore.
 */
import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { colors } from '../../constants/colors';
import SectionHeader from './SectionHeader';
import RecentScriptCard from './RecentScriptCard';
import useScripts from '../../hooks/useScripts'; // ← default import, no curly braces

const formatEdited = ts => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `Edited ${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `Edited ${Math.floor(diff / 3600)}h ago`;
  return `Edited ${Math.floor(diff / 86400)}d ago`;
};

const RecentScriptsList = ({ onViewAll, onScriptPress }) => {
  const { scripts, loading } = useScripts();
  const recent = scripts.slice(0, 5); // just take first 5

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader
          title="Recent Scripts"
          actionLabel="View All"
          onActionPress={onViewAll}
        />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {recent.map(script => (
            <RecentScriptCard
              key={script.id}
              title={script.title}
              editedLabel={formatEdited(script.updatedAt)}
              readTime={
                script.wordCount
                  ? `${Math.ceil(script.wordCount / 130)} min read`
                  : ''
              }
              iconName={script.iconName || 'Mic'}
              status={script.status}
              onPress={() => onScriptPress && onScriptPress(script)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default RecentScriptsList;

const styles = StyleSheet.create({
  container: { marginBottom: hp(2.5) },
  header: { paddingHorizontal: wp(4) },
  scrollContent: { paddingHorizontal: wp(4), paddingBottom: hp(0.5) },
  loader: { marginTop: hp(2) },
});
