/**
 * MyScriptsList.js
 * Vertical list of scripts shown in the "My Scripts" section on HomeScreen.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import ScriptListItem from './ScriptListItem';
import SectionHeader from './SectionHeader';

const MY_SCRIPTS = [
  {
    id: '1',
    title: 'Q3 Financial Report',
    date: 'Oct 24, 2023',
    time: '12:30 PM',
    duration: '10:45',
  },
  {
    id: '2',
    title: 'Marketing Strategy 2024',
    date: 'Oct 22, 2023',
    time: '09:15 AM',
    duration: '05:20',
  },
  {
    id: '3',
    title: 'Client Welcome Video',
    date: 'Oct 18, 2023',
    time: '03:45 PM',
    duration: '02:15',
  },
  {
    id: '4',
    title: 'Team Sync Agenda',
    date: 'Oct 15, 2023',
    time: '11:00 AM',
    duration: '08:30',
  },
];

const MyScriptsList = ({ onScriptPress }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="My Scripts" />
      {MY_SCRIPTS.map(script => (
        <ScriptListItem
          key={script.id}
          {...script}
          onPress={() => onScriptPress && onScriptPress(script)}
        />
      ))}
    </View>
  );
};

export default MyScriptsList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
});
