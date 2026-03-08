/**
 * useAutoScroll.js
 *
 * Drives the teleprompter ScrollView in two modes:
 *
 *  MODE A — "speed-based" (manual speed slider, no speech)
 *    Increments scroll position by a fixed px/tick.
 *
 *  MODE B — "word-tracking" (speech recognition active)
 *    Scrolls to keep the currently highlighted word centred near the
 *    focus line. The parent passes `highlightIndex` and `wordPositions`
 *    (a Map of wordIndex → y-offset measured via onLayout).
 *
 * The hook exposes an imperative ref API that TeleprompterView passes
 * to its ScrollView, plus control functions the screen calls.
 *
 * Usage:
 *   const {
 *     scrollViewRef,
 *     onWordLayout,       // attach to each word's onLayout
 *     startAutoScroll,
 *     stopAutoScroll,
 *     resetScroll,
 *     setSpeed,
 *   } = useAutoScroll();
 *
 *   // In word-tracking mode, call:
 *   scrollToWord(highlightIndex);
 */

import { useRef, useCallback } from 'react';

// px added to scrollY per 16ms tick in speed-based mode
const MIN_PX = 0.3;
const MAX_PX = 5.0;
const TICK_MS = 16;

const speedToPx = speed =>
  MIN_PX + (MAX_PX - MIN_PX) * Math.max(0, Math.min(1, speed));

const useAutoScroll = () => {
  const scrollViewRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollYRef = useRef(0);
  const contentHRef = useRef(0); // total content height
  const containerHRef = useRef(0); // visible height
  const speedRef = useRef(0.3);

  // Map of wordIndex → measured y-offset from top of content
  const wordPositionsRef = useRef(new Map());

  // ── Internal tick ──────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const max = contentHRef.current - containerHRef.current;
    if (max <= 0) return;

    scrollYRef.current = Math.min(
      scrollYRef.current + speedToPx(speedRef.current),
      max,
    );
    scrollViewRef.current?.scrollTo({ y: scrollYRef.current, animated: false });

    if (scrollYRef.current >= max) stopAutoScroll();
  }, []);

  // ── Speed-based auto scroll ────────────────────────────────────────────────
  const startAutoScroll = useCallback(
    (speed = 0.3) => {
      speedRef.current = speed;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(tick, TICK_MS);
    },
    [tick],
  );

  const stopAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const resetScroll = useCallback(() => {
    stopAutoScroll();
    scrollYRef.current = 0;
    wordPositionsRef.current.clear();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [stopAutoScroll]);

  const setSpeed = useCallback(speed => {
    speedRef.current = speed;
    // If interval is running it will pick up new speed on next tick automatically
  }, []);

  // ── Word-tracking helpers ──────────────────────────────────────────────────

  /**
   * Call this from each word Text's onLayout to record its position.
   * @param {number} wordIndex
   * @param {object} layout - { y: number } from nativeEvent.layout
   */
  const onWordLayout = useCallback((wordIndex, layout) => {
    wordPositionsRef.current.set(wordIndex, layout.y);
  }, []);

  /**
   * Smoothly scroll so that `wordIndex` sits near the focus line (35% from top).
   * Call this whenever highlightIndex changes in word-tracking mode.
   * @param {number} wordIndex
   * @param {number} focusRatio - 0–1, default 0.35 (matches the focus line)
   */
  const scrollToWord = useCallback((wordIndex, focusRatio = 0.35) => {
    const wordY = wordPositionsRef.current.get(wordIndex);
    if (wordY == null) return;

    const targetY = Math.max(0, wordY - containerHRef.current * focusRatio);

    scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    scrollYRef.current = targetY;
  }, []);

  // ── Layout callbacks (attach these to the ScrollView's parent View) ────────
  const onContainerLayout = useCallback(e => {
    containerHRef.current = e.nativeEvent.layout.height;
  }, []);

  const onContentSizeChange = useCallback((_w, h) => {
    contentHRef.current = h;
  }, []);

  const onScroll = useCallback(e => {
    // Keep in sync with manual scrolling
    scrollYRef.current = e.nativeEvent.contentOffset.y;
  }, []);

  return {
    scrollViewRef,
    onWordLayout,
    scrollToWord,
    startAutoScroll,
    stopAutoScroll,
    resetScroll,
    setSpeed,
    onContainerLayout,
    onContentSizeChange,
    onScroll,
  };
};

export default useAutoScroll;
