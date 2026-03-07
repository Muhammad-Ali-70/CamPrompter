import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors } from '../constants/colors';
import { Label } from '../constants/globalstyle';
import { wp, hp } from '../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

// import ScriptsScreen from '../screens/Scripts/ScriptsScreen';
// import FoldersScreen from '../screens/Folders/FoldersScreen';
// import SettingsScreen from '../screens/Settings/SettingsScreen';
import Dummy from '../screens/Dummy';
import HomeStack from './HomeStack';
import ScriptStack from './ScriptStack';
import FolderStack from './FolderStack';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: 'Home',
  Scripts: 'FileText',
  Folders: 'Folder',
  Settings: 'Settings',
};

const TabIcon = ({ name, focused }) => {
  const IconComponent = Icons[TAB_ICONS[name]];
  const iconColor = focused ? colors.primary : colors.textSecondary;

  return (
    <View style={styles.tabIconContainer}>
      <IconComponent size={RFValue(20)} color={iconColor} />
      <Label
        type="caption"
        color={focused ? 'primary' : 'textSecondary'}
        style={styles.tabLabel}
      >
        {name}
      </Label>
    </View>
  );
};

const getTabBarStyle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

  if (routeName === 'PrompterRecScreen' || routeName === 'ScriptEditorScreen') {
    return { display: 'none' };
  }

  return styles.tabBar;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: getTabBarStyle(route),
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Scripts" component={ScriptStack} />
      <Tab.Screen name="Folders" component={FolderStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: wp(1),
    right: wp(1),
    bottom: wp(-1),

    backgroundColor: colors.backgroundSecondary,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    height: hp(7.5),
    paddingTop: hp(0.8),
    paddingBottom: hp(0.5),

    borderTopWidth: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(0.3),
  },
  tabLabel: {
    marginTop: hp(0.2),
  },
});
