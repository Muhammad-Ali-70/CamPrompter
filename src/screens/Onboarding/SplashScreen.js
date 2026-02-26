import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import PrimaryLoader from '../../components/UI/PrimaryLoader.js';
import { colors } from '../../constants/colors';
import Logo from '../../components/UI/Logo.js';
import { useNavigation } from '@react-navigation/native';
import { wp } from '../../constants/responsive.js';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator'); // replace so user can't go back to splash
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <Logo width={wp(55)} />
      <PrimaryLoader marginTop={2} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
