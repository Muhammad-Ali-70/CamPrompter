import React from 'react';
import RootNavigator from './src/navigations/RootNavigator.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { colors } from './src/constants/colors.js';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: colors.backgroundPrimary }}
      />

      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} barStyle={'light-content'} />
        <RootNavigator />
      </View>

      <SafeAreaView
        edges={['bottom']}
        style={{ backgroundColor: colors.backgroundSecondary }}
      />
    </SafeAreaProvider>
  );
};

export default App;
