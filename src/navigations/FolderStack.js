import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FoldersScreen from '../screens/FolderStack/FoldersScreen';
import ScriptEditorScreen from '../screens/HomeStack/ScriptEditorScreen';

const Stack = createStackNavigator();

const FolderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FoldersScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FoldersScreen" component={FoldersScreen} />
      <Stack.Screen name="ScriptEditorScreen" component={ScriptEditorScreen} />
    </Stack.Navigator>
  );
};

export default FolderStack;
