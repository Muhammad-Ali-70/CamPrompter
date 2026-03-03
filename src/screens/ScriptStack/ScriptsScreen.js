/**
 * ScriptsScreen.js
 * Scripts Library — searchable, filterable list of all user scripts.
 */
import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import ScriptLibraryCard from '../../components/ScriptTab/ScriptLibraryCard';
import IconButton from '../../components/Buttons/IconButton';
import SearchBar from '../../components/UI/SearchBar';
import FilterTabs from '../../components/ScriptTab/FilterTabs';

const SCRIPTS = [
  {
    id: '1',
    title: 'Product Launch Keynote',
    preview:
      'Welcome everyone. Today marks a significant milestone in our journey. We...',
    status: 'Ready',
    meta: 'Edited 2m ago',
    tag: 'Recent',
  },
  {
    id: '2',
    title: 'Instagram Story Update',
    preview:
      'Hey guys! Just wanted to hop on here quickly and give you a behind-the-...',
    status: 'Draft',
    meta: 'Edited 2h ago',
    tag: 'Recent',
  },
  {
    id: '3',
    title: 'Q3 Financial Report',
    preview:
      'The third quarter has shown resilient growth across all major sectors. Despit...',
    status: 'Review',
    meta: 'Oct 24, 2023',
    tag: 'Favorites',
  },
  {
    id: '4',
    title: 'Podcast Intro S4',
    preview:
      "Welcome back to another episode of 'The Future of Tech'. I'm your host, and ...",
    status: null,
    meta: 'Oct 20, 2023',
    tag: 'Favorites',
  },
  {
    id: '5',
    title: 'Team Sync Agenda',
    preview:
      "Good morning everyone. Let us quickly run through today's agenda and align on...",
    status: 'Draft',
    meta: 'Oct 15, 2023',
    tag: 'Recent',
  },
];

const ScriptsScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    return SCRIPTS.filter(s => {
      const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase());
      const matchesTab = activeTab === 'All' || s.tag === activeTab;
      return matchesQuery && matchesTab;
    });
  }, [query, activeTab]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ScriptLibraryCard
            {...item}
            onPress={() =>
              navigation?.navigate('ScriptEditorScreen', { script: item })
            }
          />
        )}
        ListHeaderComponent={
          <View>
            {/* Page header */}
            <View style={styles.header}>
              <Label type="h3" weight="extraBold" color="textPrimary">
                Scripts Library
              </Label>
              <IconButton
                iconName={'Plus'}
                iconSize={RFValue(22)}
                iconColor={colors.textPrimary}
                backgroundColor={colors.backgroundSecondary}
                size={wp(11)}
                onPress={() => navigation?.navigate('ScriptEditorScreen')}
              />
            </View>

            {/* Search */}
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search scripts..."
              style={styles.search}
            />

            {/* Filter tabs */}
            <FilterTabs activeTab={activeTab} onTabPress={setActiveTab} />

            <View style={styles.divider} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ScriptsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPrimary },
  list: { paddingHorizontal: wp(4), paddingBottom: hp(4) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
  },
  search: { marginBottom: hp(1.8) },
  divider: { height: hp(2) },
});
