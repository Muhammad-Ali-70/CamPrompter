import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScriptsScreen from '../screens/ScriptStack/ScriptsScreen';
import FoldersScreen from '../screens/FolderStack/FoldersScreen';

const Stack = createStackNavigator();

const ScriptStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ScriptScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ScriptScreen" component={ScriptsScreen} />
      <Stack.Screen name="FoldersScreen" component={FoldersScreen} />
    </Stack.Navigator>
  );
};

export default ScriptStack;
