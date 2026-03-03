import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import ScriptEditorScreen from '../screens/HomeStack/ScriptEditorScreen';
import PrompterRecScreen from '../screens/HomeStack/PrompterRecScreen';
import VideoPreviewScreen from '../screens/HomeStack/VideoPreviewScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ScriptEditorScreen" component={ScriptEditorScreen} />
      <Stack.Screen name="PrompterRecScreen" component={PrompterRecScreen} />
      <Stack.Screen name="VideoPreviewScreen" component={VideoPreviewScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
