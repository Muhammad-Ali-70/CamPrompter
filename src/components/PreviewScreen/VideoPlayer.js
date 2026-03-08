/**
 * VideoPlayer.js
 *
 * Full video playback using react-native-video.
 * Accepts a ref forwarded from VideoPreviewScreen so the parent
 * can call videoRef.current.seek(seconds).
 *
 * npm install react-native-video
 */
import React, { forwardRef, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
} from 'react-native';
import Video from 'react-native-video';
import { Play, Pause } from 'lucide-react-native';
import { borderRadiusPrimary, Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatTime = (secs = 0) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// ── Progress bar (tap to seek) ────────────────────────────────────────────────

const VideoProgressBar = ({ currentTime = 0, duration = 1, onSeek }) => {
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const trackRef = React.useRef(null);
  const trackWidthRef = React.useRef(0);

  const seekFromX = useCallback(
    pageX => {
      if (!trackRef.current || trackWidthRef.current === 0) return;
      trackRef.current.measure((_fx, _fy, _w, _h, px) => {
        const ratio = Math.max(
          0,
          Math.min(1, (pageX - px) / trackWidthRef.current),
        );
        onSeek?.(ratio);
      });
    },
    [onSeek],
  );

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

      <View
        ref={trackRef}
        style={styles.track}
        onLayout={e => {
          trackWidthRef.current = e.nativeEvent.layout.width;
        }}
        onStartShouldSetResponder={() => true}
        onResponderGrant={e => seekFromX(e.nativeEvent.pageX)}
        onResponderMove={e => seekFromX(e.nativeEvent.pageX)}
      >
        <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
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

const VideoPlayer = forwardRef(
  (
    {
      videoUri,
      isPlaying = false,
      onTogglePlay,
      onProgress,
      onLoad,
      onEnd,
      currentTime = 0,
      duration = 0,
      onSeek,
    },
    ref,
  ) => {
    return (
      <View style={styles.container}>
        {videoUri ? (
          <Video
            ref={ref}
            source={{ uri: videoUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            paused={!isPlaying}
            onProgress={onProgress}
            onLoad={onLoad}
            onEnd={onEnd}
            repeat={false}
          />
        ) : (
          // No video yet — dark placeholder
          <View style={styles.placeholder} />
        )}

        {/* Tap anywhere on video to play/pause */}
        <TouchableOpacity
          style={styles.playOverlay}
          onPress={onTogglePlay}
          activeOpacity={0.85}
        >
          <View style={styles.playCircle}>
            {isPlaying ? (
              <Pause
                size={RFValue(26)}
                color="#fff"
                strokeWidth={2.5}
                fill="#fff"
              />
            ) : (
              <Play
                size={RFValue(26)}
                color="#fff"
                strokeWidth={2.5}
                fill="#fff"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Progress bar pinned to bottom */}
        <View style={styles.progressWrapper}>
          <VideoProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
          />
        </View>
      </View>
    );
  },
);

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadiusPrimary,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  placeholder: {
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
    paddingLeft: 3, // optical centering for play icon
  },
  progressWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: hp(1.5),
    // Subtle gradient feel via semi-transparent background
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingTop: hp(1),
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
    justifyContent: 'center',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.textPrimary,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textPrimary,
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
});
