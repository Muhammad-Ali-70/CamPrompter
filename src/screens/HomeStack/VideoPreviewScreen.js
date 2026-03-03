/**
 * VideoPreviewScreen.js
 *
 * Shown after a recording is completed.
 * Lets the user review, save, redo, or share their take.
 *
 * ─── Navigation params expected ──────────────────────────────────────────────
 *  videoUri  — local file URI of the recorded video
 *  duration  — total duration in seconds
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ─── State ───────────────────────────────────────────────────────────────────
 *  isPlaying    → VideoPlayer play/pause toggle
 *  currentTime  → advances via react-native-video onProgress callback
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Share, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import ScreenHeader from '../../components/UI/ScreenHeader';
import VideoPlayer from '../../components/PreviewScreen/VideoPlayer';
import RecordingCompleteInfo from '../../components/PreviewScreen/RecordingCompleteInfo';
import PreviewActionButtons from '../../components/PreviewScreen/PreviewActionButtons';

const VideoPreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const videoUri = route?.params?.videoUri ?? null;
  const duration = route?.params?.duration ?? 154; // fallback 2:34

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleDone = useCallback(() => {
    navigation.popToTop(); // go back to Home
  }, [navigation]);

  const handleSaveToGallery = useCallback(() => {
    /**
     * TODO: save to device gallery
     * import { CameraRoll } from '@react-native-camera-roll/camera-roll'
     * await CameraRoll.save(videoUri, { type: 'video' })
     */
    Alert.alert('Saved', 'Video saved to gallery.');
  }, [videoUri]);

  const handleRedo = useCallback(() => {
    navigation.goBack(); // return to TeleprompterRecordingScreen
  }, [navigation]);

  const handleShare = useCallback(async () => {
    try {
      /**
       * Native Share sheet — no extra library needed.
       * When videoUri is available, pass it as `url`.
       */
      await Share.share({
        message: 'Check out my recording!',
        ...(videoUri && { url: videoUri }),
      });
    } catch (e) {
      console.warn('Share error:', e);
    }
  }, [videoUri]);

  const handleSeek = useCallback(
    value => {
      setCurrentTime(value * duration);
      /**
       * TODO: seek video to position
       * videoRef.current.seek(value * duration)
       */
    },
    [duration],
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.safeArea}>
      {/* Header: ← Preview  Done */}
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
        {/* Video player */}
        <VideoPlayer
          videoUri={videoUri}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />

        {/* "Recording Complete" info block */}
        <View style={styles.infoBlock}>
          <RecordingCompleteInfo />
        </View>

        {/* Action buttons */}
        <PreviewActionButtons
          onSave={handleSaveToGallery}
          onRedo={handleRedo}
          onShare={handleShare}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    gap: hp(0), // spacing handled by individual components
  },
  infoBlock: {
    marginTop: hp(3),
    marginBottom: hp(0.5),
  },
});
