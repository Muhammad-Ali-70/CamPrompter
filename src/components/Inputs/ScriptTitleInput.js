import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const ScriptTitleInput = ({
  value,
  onChangeText,
  placeholder = 'Enter a catchy title...',
  label = 'Script Title',
}) => {
  return (
    <View style={styles.wrapper}>
      <Label
        type="bodySmall"
        weight="semiBold"
        color="textSecondary"
        style={styles.label}
      >
        {label}
      </Label>
      <View style={styles.inputContainer}>
        <Pencil
          size={RFValue(14)}
          color={colors.textSecondary}
          strokeWidth={1.8}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="done"
          maxLength={100}
        />
      </View>
    </View>
  );
};

export default ScriptTitleInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp(2),
  },
  label: {
    marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 14,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    gap: wp(3),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: RFValue(12),
    fontFamily: undefined, // will inherit or set from fonts
    padding: 0,
    margin: 0,
  },
});
