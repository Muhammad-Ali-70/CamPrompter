/**
 * ScriptEditorScreen.js
 * Create or edit a script. Wired to Firestore via useScripts hook.
 */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video, Save } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import ScreenHeader from '../../components/UI/ScreenHeader';
import ScriptTitleInput from '../../components/Inputs/ScriptTitleInput';
import ScriptContentInput from '../../components/Inputs/ScriptContentInput';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import useScripts from '../../hooks/useScripts';

const ScriptEditorScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addScript, editScript } = useScripts();

  const existingScript = route?.params?.script ?? null;
  const isEditing = existingScript != null;

  const [title, setTitle] = useState(existingScript?.title ?? '');
  const [content, setContent] = useState(existingScript?.content ?? '');
  const [saving, setSaving] = useState(false);

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      Alert.alert('Title required', 'Please add a title before saving.');
      return;
    }
    try {
      setSaving(true);
      if (isEditing) {
        await editScript(existingScript.id, {
          title,
          content,
          status: 'draft',
        });
      } else {
        await addScript({ title, content, status: 'draft' });
      }
      navigation.goBack();
    } catch (e) {
      console.log(e);

      Alert.alert('Error', 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartRecording = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert(
        'Script incomplete',
        'Please add a title and content before recording.',
      );
      return;
    }
    try {
      setSaving(true);
      let scriptId = existingScript?.id;
      // if (isEditing) {
      //   await editScript(scriptId, { title, content, status: 'ready' });
      // } else {
      //   const ref = await addScript({ title, content, status: 'ready' });
      //   scriptId = ref.id;
      // }
      navigation.navigate('PrompterRecScreen', { scriptId, title, content });
    } catch (e) {
      Alert.alert('Error', 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
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
          onRightPress={() => {}}
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
        <View style={styles.bottomBar}>
          <PrimaryButton
            label={saving ? 'Saving...' : 'Start Recording'}
            LucideIcon={Video}
            variant="solid"
            onPress={handleStartRecording}
            disabled={saving}
            style={styles.btn}
          />
          <PrimaryButton
            label={saving ? 'Saving...' : 'Save Draft'}
            LucideIcon={Save}
            variant="secondary"
            onPress={handleSaveDraft}
            disabled={saving}
            style={styles.btn}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ScriptEditorScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.backgroundPrimary },
  flex: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(4),
  },
  bottomBar: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(7),
    backgroundColor: colors.backgroundPrimary,
    gap: hp(1.2),
    borderTopWidth: 1,
    borderTopColor: colors.backgroundSecondary,
  },
  btn: { width: '100%' },
});
