import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const countWords = (text = '') => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

const WordCountBadge = ({ count }) => (
  <View style={styles.badge}>
    <Label type="caption" weight="semiBold" color="textSecondary">
      {count} {count === 1 ? 'word' : 'words'}
    </Label>
  </View>
);

const ScriptContentInput = ({
  value,
  onChangeText,
  placeholder = "Type or paste your script here. Don't worry, you can edit the scrolling speed later...",
  label = 'Script Content',
  minHeight = hp(45),
}) => {
  const wordCount = useMemo(() => countWords(value), [value]);

  return (
    <View style={styles.wrapper}>
      {/* Header row: label + word count */}
      <View style={styles.headerRow}>
        <Label type="bodySmall" weight="semiBold" color="textSecondary">
          {label}
        </Label>
        <WordCountBadge count={wordCount} />
      </View>

      {/* Text area */}
      <View style={[styles.inputContainer, { minHeight }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary + '88'}
          multiline
          textAlignVertical="top"
          scrollEnabled={false} // let parent ScrollView handle scrolling
        />
      </View>
    </View>
  );
};

export default ScriptContentInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  badge: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: 20,
  },
  inputContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 14,
    padding: wp(4),
    borderWidth: 1,
    borderColor: colors.backgroundSecondary,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: RFValue(13),
    lineHeight: RFValue(24),
    padding: 0,
    margin: 0,
  },
});
