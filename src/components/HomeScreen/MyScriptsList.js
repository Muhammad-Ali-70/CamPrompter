/**
 * MyScriptsList.js
 * Vertical list of all scripts — live from Firestore.
 */
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import { colors } from '../../constants/colors';
import ScriptListItem from './ScriptListItem';
import SectionHeader from './SectionHeader';
import { Label } from '../../constants/globalstyle';
import useScripts from '../../hooks/useScripts';

const MyScriptsList = ({ onScriptPress }) => {
  const { scripts, loading } = useScripts();

  return (
    <View style={styles.container}>
      <SectionHeader title="My Scripts" />

      {loading ? (
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      ) : scripts.length === 0 ? (
        <Label type="bodySmall" color="textSecondary" style={styles.empty}>
          No scripts yet. Create your first one!
        </Label>
      ) : (
        scripts.map(script => (
          <ScriptListItem
            key={script.id}
            title={script.title}
            date={formatDate(script.createdAt)}
            time={formatTime(script.createdAt)}
            duration={
              script.wordCount ? `${Math.ceil(script.wordCount / 130)}:00` : ''
            }
            onPress={() => onScriptPress && onScriptPress(script)}
          />
        ))
      )}
    </View>
  );
};

const formatDate = ts => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = ts => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export default MyScriptsList;

const styles = StyleSheet.create({
  container: { paddingHorizontal: wp(4), marginBottom: hp(2) },
  loader: { marginTop: hp(2) },
  empty: { marginTop: hp(1), textAlign: 'center' },
});
