/**
 * VideoPlayer.js
 * Video preview player component.
 *
 * Shows a video thumbnail with a centered play/pause overlay button
 * and a bottom-aligned progress bar with current/total time labels.
 *
 * ─── Library Recommendation ──────────────────────────────────────────────────
 * react-native-video  (most widely used, supports local + remote URIs)
 *   npm install react-native-video
 *   docs: https://github.com/TheWidlarzGroup/react-native-video
 *
 * Swap the <View style={styles.videoPlaceholder}> block with:
 *   import Video from 'react-native-video'
 *   <Video
 *     ref={videoRef}
 *     source={{ uri: videoUri }}
 *     style={StyleSheet.absoluteFill}
 *     resizeMode="cover"
 *     paused={!isPlaying}
 *     onProgress={({ currentTime }) => setCurrentTime(currentTime)}
 *     onLoad={({ duration }) => setDuration(duration)}
 *     onEnd={() => setIsPlaying(false)}
 *   />
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Props:
 *  videoUri   — local file URI from recording (passed via navigation params)
 *  isPlaying  — controlled externally from VideoPreviewScreen
 *  onTogglePlay
 *  currentTime — seconds (number)
 *  duration    — seconds (number)
 *  onSeek      — (value: number) => void
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatTime = (secs = 0) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// ── Sub-components ────────────────────────────────────────────────────────────

const PlayPauseOverlay = ({ isPlaying, onPress }) => (
  <TouchableOpacity
    style={styles.playOverlay}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={styles.playCircle}>
      {isPlaying ? (
        <Pause size={RFValue(26)} color="#fff" strokeWidth={2.5} fill="#fff" />
      ) : (
        <Play size={RFValue(26)} color="#fff" strokeWidth={2.5} fill="#fff" />
      )}
    </View>
  </TouchableOpacity>
);

const VideoProgressBar = ({ currentTime = 0, duration = 1, onSeek }) => {
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <View style={styles.progressContainer}>
      <Label
        type="caption"
        weight="semiBold"
        color="textPrimary"
        style={styles.timeLabel}
      >
        {formatTime(currentTime)}
      </Label>

      {/* Track */}
      <View style={styles.track}>
        <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
        {/* Thumb */}
        <View style={[styles.thumb, { left: `${progress * 100}%` }]} />
      </View>

      <Label
        type="caption"
        weight="semiBold"
        color="textPrimary"
        style={styles.timeLabel}
      >
        {formatTime(duration)}
      </Label>
    </View>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const VideoPlayer = ({
  videoUri,
  isPlaying = false,
  onTogglePlay,
  currentTime = 0,
  duration = 154, // 2:34 default for UI
  onSeek,
}) => {
  return (
    <View style={styles.container}>
      {/*
        ── Swap this block with <Video ... /> when react-native-video is installed ──
      */}
      <View style={styles.videoPlaceholder} />

      {/* Play / Pause overlay */}
      <PlayPauseOverlay isPlaying={isPlaying} onPress={onTogglePlay} />

      {/* Progress bar pinned to bottom of video */}
      <View style={styles.progressWrapper}>
        <VideoProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadiusPrimary,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2A2A2A',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    // nudge play icon slightly right for optical centering
    paddingLeft: 3,
  },
  progressWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: hp(1.5),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    gap: wp(2.5),
  },
  timeLabel: {
    minWidth: wp(8),
  },
  track: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.textPrimary,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textPrimary,
    top: '50%',
    marginTop: -5,
    marginLeft: -5,
  },
});
