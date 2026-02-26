import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { wp } from '../../constants/responsive';
import { RFValue } from 'react-native-responsive-fontsize';

const IconButton = ({
  iconName,
  iconSize = RFValue(20),
  iconColor = colors.textPrimary,
  backgroundColor = colors.backgroundSecondary,
  size = wp(10),
  borderRadius,
  onPress,
  style,
}) => {
  const IconComponent = iconName ? Icons[iconName] : null;

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius !== undefined ? borderRadius : size / 2,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle, style]}
      activeOpacity={0.75}
    >
      {IconComponent && <IconComponent size={iconSize} color={iconColor} />}
    </TouchableOpacity>
  );
};

export default IconButton;
