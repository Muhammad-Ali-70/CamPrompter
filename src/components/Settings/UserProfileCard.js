/**
 * UserProfileCard.js
 * Top section of Settings screen — avatar circle, name, email.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';
import { Label } from '../../constants/globalstyle';
import { colors } from '../../constants/colors';
import { wp, hp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const UserProfileCard = ({
  name = 'Alex Morgan',
  email = 'alex.morgan@example.com',
}) => (
  <View style={styles.container}>
    {/* Avatar */}
    <View style={styles.avatarRing}>
      <View style={styles.avatar}>
        <User size={RFValue(36)} color={colors.surface} strokeWidth={1.5} />
      </View>
    </View>

    {/* Info */}
    <View style={styles.info}>
      <Label type="h4" weight="extraBold" color="textPrimary">
        {name}
      </Label>
      <Label type="bodySmall" color="primary" style={styles.email}>
        {email}
      </Label>
    </View>
  </View>
);

export default UserProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    gap: wp(4),
  },
  avatarRing: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: '#5C6BC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, gap: hp(0.5) },
  email: { marginTop: hp(0.2) },
});
