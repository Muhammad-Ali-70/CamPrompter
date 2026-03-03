/**
 * SettingsScreen.js
 * App settings screen. All values read from / written to SettingsContext.
 *
 * Sections:
 *  ACCOUNT       — Personal Information (navigate)
 *  TELEPROMPTER  — Font Size (modal), Scroll Speed (modal), Voice Activation (toggle), Mirror Text (toggle)
 *  APP           — Help & Support (navigate), Log Out (destructive)
 */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  User,
  Type,
  Gauge,
  Mic,
  FlipHorizontal,
  HelpCircle,
} from 'lucide-react-native';

import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';

import UserProfileCard from '../../components/Settings/UserProfileCard';
import SettingsGroup from '../../components/Settings/SettingsGroup';
import SettingsRow from '../../components/Settings/SettingsRow';
import FontSizeModal from '../../components/Settings/FontSizeModal';
import ScrollSpeedModal from '../../components/Settings/ScrollSpeedModal';
import { useSettings } from '../../contexts/SettingsContext';

const SettingsScreen = ({ navigation }) => {
  const {
    fontSize,
    setFontSize,
    scrollSpeed,
    setScrollSpeed,
    voiceActivation,
    setVoiceActivation,
    mirrorText,
    setMirrorText,
  } = useSettings();

  const [fontModalVisible, setFontModalVisible] = useState(false);
  const [speedModalVisible, setSpeedModalVisible] = useState(false);

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => console.log('Logged out'),
      },
    ]);
  };

  const speedLabel = wpm => {
    if (wpm <= 90) return `Slow (${wpm} wpm)`;
    if (wpm <= 180) return `Medium (${wpm} wpm)`;
    return `Fast (${wpm} wpm)`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Label type="h4" weight="bold" color="textPrimary">
          Settings
        </Label>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile */}
        <UserProfileCard />

        {/* Account */}
        <SettingsGroup title="ACCOUNT">
          <SettingsRow
            LucideIcon={User}
            iconBg="#E8EAF6"
            iconColor="#5C6BC0"
            label="Personal Information"
            type="navigate"
            onPress={() => {}}
            isLast
          />
        </SettingsGroup>

        {/* Teleprompter */}
        <SettingsGroup title="TELEPROMPTER">
          <SettingsRow
            LucideIcon={Type}
            iconBg="#E3F2FD"
            iconColor="#1565C0"
            label="Default Font Size"
            subtitle={`${fontSize}px`}
            type="navigate"
            onPress={() => setFontModalVisible(true)}
          />
          <SettingsRow
            LucideIcon={Gauge}
            iconBg="#E8F5E9"
            iconColor="#2E7D32"
            label="Scroll Speed"
            subtitle={speedLabel(scrollSpeed)}
            type="navigate"
            onPress={() => setSpeedModalVisible(true)}
          />
          <SettingsRow
            LucideIcon={Mic}
            iconBg="#FCE4EC"
            iconColor="#C62828"
            label="Voice Activation"
            subtitle="Auto-scrolls when you speak"
            type="toggle"
            value={voiceActivation}
            onToggle={setVoiceActivation}
          />
          <SettingsRow
            LucideIcon={FlipHorizontal}
            iconBg="#F3E5F5"
            iconColor="#6A1B9A"
            label="Mirror Text"
            subtitle="Flip script horizontally"
            type="toggle"
            value={mirrorText}
            onToggle={setMirrorText}
            isLast
          />
        </SettingsGroup>

        {/* App */}
        <SettingsGroup title="APP">
          <SettingsRow
            LucideIcon={HelpCircle}
            iconBg="#E0F7FA"
            iconColor="#00838F"
            label="Help & Support"
            type="navigate"
            onPress={() => {}}
            isLast
          />
        </SettingsGroup>

        {/* Log Out */}
        <TouchableOpacity onPress={handleLogOut} style={styles.logOutBtn}>
          <Label type="body" weight="semiBold" style={styles.logOutText}>
            Log Out
          </Label>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <FontSizeModal
        visible={fontModalVisible}
        currentSize={fontSize}
        onSave={setFontSize}
        onClose={() => setFontModalVisible(false)}
      />
      <ScrollSpeedModal
        visible={speedModalVisible}
        currentSpeed={scrollSpeed}
        onSave={setScrollSpeed}
        onClose={() => setSpeedModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.backgroundPrimary },
  headerBar: {
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(6),
  },
  logOutBtn: {
    alignItems: 'center',
    paddingVertical: hp(1.5),
    marginTop: hp(1),
  },
  logOutText: {
    color: '#EF5350',
  },
});
