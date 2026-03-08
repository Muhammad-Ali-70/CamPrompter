/**
 * VideoPreviewScreen.js
 *
 * Full-featured video preview screen.
 * Uses react-native-video for playback and @react-native-camera-roll/camera-roll for saving.
 *
 * Install dependencies:
 *   npm install react-native-video
 *   npm install @react-native-camera-roll/camera-roll
 *
 * Android permissions needed in AndroidManifest.xml:
 *   <uses-permission android:name="android.permission.READ_MEDIA_VIDEO"/>
 *   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
 *     android:maxSdkVersion="28"/>
 */
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import ScreenHeader from '../../components/UI/ScreenHeader';
import VideoPlayer from '../../components/PreviewScreen/VideoPlayer';
import RecordingCompleteInfo from '../../components/PreviewScreen/RecordingCompleteInfo';
import PreviewActionButtons from '../../components/PreviewScreen/PreviewActionButtons';

// ── Helpers ───────────────────────────────────────────────────────────────────

const requestAndroidStoragePermission = async () => {
  if (Platform.OS !== 'android') return true;
  // Android 13+ uses READ_MEDIA_VIDEO, below uses WRITE_EXTERNAL_STORAGE
  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const result = await PermissionsAndroid.request(permission, {
    title: 'Storage Permission',
    message: 'Needed to save video to gallery',
    buttonPositive: 'OK',
  });
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

// ── Screen ────────────────────────────────────────────────────────────────────

const VideoPreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const videoUri = route?.params?.videoUri ?? null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const videoRef = useRef(null);

  // ── Playback handlers ──────────────────────────────────────────────────────

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleProgress = useCallback(({ currentTime: ct }) => {
    setCurrentTime(ct);
  }, []);

  const handleLoad = useCallback(({ duration: d }) => {
    setDuration(d);
  }, []);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    videoRef.current?.seek(0);
  }, []);

  const handleSeek = useCallback(
    ratio => {
      const seekTo = ratio * duration;
      setCurrentTime(seekTo);
      videoRef.current?.seek(seekTo);
    },
    [duration],
  );

  // ── Action handlers ────────────────────────────────────────────────────────

  const handleDone = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  const handleSaveToGallery = useCallback(async () => {
    if (!videoUri) {
      Alert.alert('No video', 'Nothing to save yet.');
      return;
    }
    const hasPermission = await requestAndroidStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Storage permission is required to save videos.',
      );
      return;
    }
    try {
      setIsSaving(true);
      await CameraRoll.save(videoUri, { type: 'video' });
      Alert.alert('Saved ✓', 'Video saved to your gallery.');
    } catch (e) {
      console.error('Save error:', e);
      Alert.alert('Save failed', e?.message ?? 'Could not save the video.');
    } finally {
      setIsSaving(false);
    }
  }, [videoUri]);

  const handleRedo = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: 'Check out my recording!',
        ...(videoUri && { url: videoUri }),
      });
    } catch (e) {
      console.warn('Share error:', e);
    }
  }, [videoUri]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.safeArea}>
      <ScreenHeader
        title="Preview"
        onBack={() => navigation.goBack()}
        rightLabel="Done"
        onRightPress={handleDone}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <VideoPlayer
          ref={videoRef}
          videoUri={videoUri}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onProgress={handleProgress}
          onLoad={handleLoad}
          onEnd={handleEnd}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <View style={styles.infoBlock}>
          <RecordingCompleteInfo duration={duration} />
        </View>

        <PreviewActionButtons
          onSave={handleSaveToGallery}
          onRedo={handleRedo}
          onShare={handleShare}
          isSaving={isSaving}
        />
      </ScrollView>
    </View>
  );
};

export default VideoPreviewScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  infoBlock: {
    marginTop: hp(3),
    marginBottom: hp(0.5),
  },
});
