/**
 * TeleprompterView.js
 * The top half of the recording screen.
 *
 * Displays the script as large, readable text that scrolls automatically.
 * Words are individually rendered so each can be highlighted as the user speaks.
 *
 * ─── Library recommendations (install when adding functionality) ───────────────
 *
 * 1. AUTO-SCROLL
 *    No extra library needed. Use a ref to a <ScrollView> and call:
 *      scrollViewRef.current.scrollTo({ y: offsetY, animated: true })
 *    Drive this with a setInterval timer keyed to scrollSpeed (words per min).
 *
 * 2. SPEECH RECOGNITION / WORD HIGHLIGHTING
 *    → @react-native-voice/voice  (most mature, iOS + Android)
 *      npm install @react-native-voice/voice
 *    Gives you a live `results` array of partial transcripts. Compare each
 *    recognised word against the script tokens and advance `highlightIndex`.
 *
 *    Alternative: expo-speech-recognition (if on Expo SDK 51+)
 *
 * 3. TEXT TOKENISATION
 *    No library needed — split on /\s+/ yourself (done below).
 *    For punctuation-aware splitting use `@stdlib/nlp-tokenize` if needed.
 *
 * Props:
 *  - script: string  — the full script text
 *  - highlightIndex: number — index of the currently spoken word (0-based)
 *  - scrollSpeed: number — future: px/sec for auto-scroll
 */
import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

// Tokenise script into words, preserving spaces as separate tokens so layout looks natural
const tokenise = (script = '') => script.split(/(\s+)/).filter(Boolean);

// Focus line indicator — the horizontal blue line showing where to read
const FocusLine = () => <View style={styles.focusLine} />;

const TeleprompterView = ({
  script = 'Welcome to the teleprompter app. This is where your script will scroll. Look directly at the camera lens to maintain eye contact with your audience.',
  highlightIndex = 0,
  fontSize = RFValue(20),
}) => {
  const scrollRef = useRef(null);

  const tokens = tokenise(script);

  let wordCount = -1;

  return (
    <View style={styles.container}>
      <FocusLine />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        <Text style={[styles.scriptText, { fontSize }]}>
          {tokens.map((token, i) => {
            const isWhitespace = /^\s+$/.test(token);
            if (!isWhitespace) wordCount++;
            const wIdx = wordCount;

            const isHighlighted = !isWhitespace && wIdx === highlightIndex;
            const isPast = !isWhitespace && wIdx < highlightIndex;
            const isFuture = !isWhitespace && wIdx > highlightIndex;

            return (
              <Text
                key={i}
                style={[
                  isHighlighted && styles.wordHighlighted,
                  isPast && styles.wordPast,
                  isFuture && styles.wordFuture,
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
};

export default TeleprompterView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    position: 'relative',
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
  wordHighlighted: {
    color: colors.primary,
  },
  wordPast: {
    color: colors.textSecondary,
    opacity: 0.45,
  },
  wordFuture: {
    color: colors.textSecondary,
    opacity: 0.7,
  },
});
