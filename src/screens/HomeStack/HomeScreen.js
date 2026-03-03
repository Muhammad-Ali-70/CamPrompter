import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/responsive';

import HomeHeader from '../../components/HomeScreen/HomeHeader';
import RecentScriptsList from '../../components/HomeScreen/RecentScriptsList';
import FAB from '../../components/Buttons/FAB';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import MyScriptsList from '../../components/HomeScreen/MyScriptsList';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CirclePlus } from 'lucide-react-native';
import useScripts from '../../hooks/useScripts';

const HomeScreen = () => {
  const navigation = useNavigation();

  const { fetchScripts } = useScripts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchScripts();
    setRefreshing(false);
  }, [fetchScripts]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh]),
  );

  const handleSearch = () => {
    console.log('Search pressed');
  };

  const handleCreateScript = () => {
    navigation.navigate('ScriptEditorScreen');
    console.log('Create New Script pressed');
  };

  const handleScriptPress = script => {
    console.log('Script pressed:', script.title);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <HomeHeader onSearchPress={handleSearch} />

        <RecentScriptsList
          onViewAll={() => console.log('View all recent')}
          onScriptPress={handleScriptPress}
        />

        <View style={styles.ctaWrapper}>
          <PrimaryButton
            label="Create New Script"
            LucideIcon={CirclePlus}
            onPress={handleCreateScript}
            variant="outline"
          />
        </View>

        <MyScriptsList onScriptPress={handleScriptPress} />
      </ScrollView>

      <FAB onPress={() => console.log('FAB pressed')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(10),
  },
  ctaWrapper: {
    paddingHorizontal: wp(4),
    marginBottom: hp(3),
    marginTop: hp(0.5),
  },
});
