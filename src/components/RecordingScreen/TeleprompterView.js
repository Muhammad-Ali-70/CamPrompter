/**
 * TeleprompterView.js
 *
 * Renders the script word-by-word so each word can be:
 *   - highlighted (currently spoken)  — blue
 *   - dimmed-past (already spoken)    — faded
 *   - normal-future (not yet spoken)  — default color
 *
 * Auto-scroll is handled via the useAutoScroll hook.
 * Word position tracking enables smooth scroll-to-word behavior.
 *
 * Imperative handle (parent accesses via ref):
 *   startAutoScroll(speed)   — begin speed-based scroll
 *   stopAutoScroll()         — pause
 *   resetScroll()            — jump to top, clear positions
 *   setSpeed(speed)          — update speed mid-scroll
 *   scrollToWord(index)      — scroll to keep word near focus line
 *
 * Props:
 *   script         : string
 *   highlightIndex : number  — word currently being spoken (from useWordMatcher)
 *   fontSize       : number
 */
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import useAutoScroll from '../../hooks/useAutoScroll';

// ── Tokenise preserving whitespace ────────────────────────────────────────────
const tokenise = (text = '') => text.split(/(\s+)/).filter(Boolean);

// ── Focus line ────────────────────────────────────────────────────────────────
const FocusLine = () => <View style={styles.focusLine} />;

// ── Component ─────────────────────────────────────────────────────────────────
const TeleprompterView = forwardRef(
  (
    {
      script = 'Your script will appear here. Look at the camera and speak naturally.',
      highlightIndex = 0,
      fontSize = RFValue(20),
    },
    ref,
  ) => {
    const {
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
    } = useAutoScroll();

    // ── Expose imperative API to parent screen ──────────────────────────────
    useImperativeHandle(ref, () => ({
      startAutoScroll,
      stopAutoScroll,
      resetScroll,
      setSpeed,
      scrollToWord,
    }));

    // ── Scroll to highlighted word whenever it changes ──────────────────────
    useEffect(() => {
      scrollToWord(highlightIndex);
    }, [highlightIndex, scrollToWord]);

    // ── Tokenise script (memoised) ──────────────────────────────────────────
    const tokens = useMemo(() => tokenise(script), [script]);

    let wordCount = -1;

    return (
      <View style={styles.container} onLayout={onContainerLayout}>
        <FocusLine />
        <ScrollView
          ref={scrollViewRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <Text style={[styles.scriptText, { fontSize }]}>
            {tokens.map((token, i) => {
              const isWhitespace = /^\s+$/.test(token);

              if (!isWhitespace) wordCount++;
              const wIdx = wordCount;

              const isHighlighted = !isWhitespace && wIdx === highlightIndex;
              const isPast = !isWhitespace && wIdx < highlightIndex;

              return (
                <Text
                  key={i}
                  onLayout={
                    !isWhitespace
                      ? e => onWordLayout(wIdx, e.nativeEvent.layout)
                      : undefined
                  }
                  style={[
                    styles.word,
                    isHighlighted && styles.wordHighlighted,
                    isPast && styles.wordPast,
                  ]}
                >
                  {token}
                </Text>
              );
            })}
          </Text>
        </ScrollView>
      </View>
    );
  },
);

TeleprompterView.displayName = 'TeleprompterView';
export default TeleprompterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  focusLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '35%',
    height: 2.5,
    backgroundColor: '#1A6BFF',
    zIndex: 5,
    opacity: 0.7,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(20),
    paddingBottom: hp(20),
  },
  scriptText: {
    color: colors.textPrimary,
    lineHeight: RFValue(42),
    textAlign: 'center',
    fontWeight: '700',
  },
  word: {
    color: colors.textPrimary,
  },
  wordHighlighted: {
    color: '#1A6BFF',
  },
  wordPast: {
    color: colors.textSecondary,
    opacity: 0.4,
  },
});
