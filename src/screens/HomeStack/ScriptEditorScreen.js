import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import ScreenHeader from '../../components/UI/ScreenHeader';
import ScriptTitleInput from '../../components/Inputs/ScriptTitleInput';
import ScriptContentInput from '../../components/Inputs/ScriptContentInput';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

import { Video, Save } from 'lucide-react-native';

const ScriptEditorScreen = ({ route }) => {
  const navigation = useNavigation();
  const isEditing = route?.params?.script != null;

  const [title, setTitle] = useState(route?.params?.script?.title ?? '');
  const [content, setContent] = useState(route?.params?.script?.content ?? '');

  const handleStartRecording = () => {
    navigation.navigate('PrompterRecScreen');
    // TODO: navigate to recording screen
    console.log('Start Recording:', { title, content });
  };

  const handleSaveDraft = () => {
    // TODO: persist draft
    console.log('Save Draft:', { title, content });
    navigation.goBack();
  };

  const handleSettings = () => {
    console.log('Settings pressed');
  };

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={hp(2)}
      >
        <ScreenHeader
          title={isEditing ? 'Edit Script' : 'New Script'}
          onBack={() => navigation.goBack()}
          rightLabel="Settings"
          onRightPress={handleSettings}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScriptTitleInput value={title} onChangeText={setTitle} />
          <ScriptContentInput value={content} onChangeText={setContent} />
        </ScrollView>

        {/* Sticky bottom actions */}
        <View style={styles.bottomBar}>
          <PrimaryButton
            label="Start Recording"
            LucideIcon={Video} // Pass the component, not a string
            variant="solid"
            onPress={handleStartRecording}
            style={styles.primaryBtn}
          />

          {/* <PrimaryButton
            label="Save Draft"
            LucideIcon={Save} // Pass the component, not a string
            variant="secondary"
            onPress={handleSaveDraft}
            style={styles.secondaryBtn}
          /> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ScriptEditorScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(4),
  },
  bottomBar: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
    backgroundColor: colors.backgroundPrimary,
    gap: hp(1.2),
    borderTopWidth: 1,
    borderTopColor: colors.backgroundSecondary,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
});
