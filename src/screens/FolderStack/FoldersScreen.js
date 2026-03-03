/**
 * FoldersScreen.js
 * 2-column grid of folder cards with search and manage footer.
 */
import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FolderPlus, Settings } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import IconButton from '../../components/Buttons/IconButton';
import SearchBar from '../../components/UI/SearchBar';
import FolderCard from '../../components/FolderTab/FolderCard';

const FOLDERS = [
  { id: '1', name: 'YouTube', scriptCount: 12, iconColor: '#EF5350' },
  { id: '2', name: 'Keynotes', scriptCount: 5, iconColor: '#7986CB' },
  { id: '3', name: 'Social Media', scriptCount: 28, iconColor: '#AB47BC' },
  { id: '4', name: 'Drafts', scriptCount: 3, iconColor: '#78909C' },
  { id: '5', name: 'Podcasts', scriptCount: 8, iconColor: colors.primary },
  { id: '6', name: 'Archive', scriptCount: 45, iconColor: '#78909C' },
];

const FoldersScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const filtered = FOLDERS.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  // Render two cards per row
  const renderRow = ({ item, index }) => {
    if (index % 2 !== 0) return null;
    const right = filtered[index + 1];
    return (
      <View style={styles.row}>
        <FolderCard {...item} onPress={() => {}} onMenuPress={() => {}} />
        {right ? (
          <FolderCard {...right} onPress={() => {}} onMenuPress={() => {}} />
        ) : (
          <View style={styles.ghost} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            {/* Page header */}
            <View style={styles.header}>
              <View>
                <Label
                  type="caption"
                  weight="semiBold"
                  color="primary"
                  style={styles.overline}
                >
                  ORGANIZATION
                </Label>
                <Label type="h3" weight="extraBold" color="textPrimary">
                  Script Folders
                </Label>
              </View>
              <IconButton
                iconName={'FolderPlus'}
                iconSize={RFValue(20)}
                iconColor={colors.surface}
                backgroundColor={colors.primary}
                size={wp(12)}
                onPress={() => {}}
              />
            </View>
            {/* Search */}
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search folders..."
              style={styles.search}
            />
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.manageRow} onPress={() => {}}>
            <Settings
              size={RFValue(15)}
              color={colors.primary}
              strokeWidth={2}
            />
            <Label type="bodySmall" weight="semiBold" color="primary">
              Manage Folders
            </Label>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default FoldersScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPrimary },
  list: { paddingHorizontal: wp(4), paddingBottom: hp(4) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(1.5),
    paddingBottom: hp(2.5),
  },
  overline: { letterSpacing: 1.5, marginBottom: hp(0.3) },
  search: { marginBottom: hp(2.5) },
  row: { flexDirection: 'row', gap: wp(3), marginBottom: hp(1.5) },
  ghost: { flex: 1 },
  manageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(2),
    paddingTop: hp(2.5),
  },
});
