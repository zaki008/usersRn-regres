import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {default as FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../styles';

const screenWidth = Dimensions.get('window').width;

const HeaderPrimary = ({
  title,
  onPress,
  onPressTow,
  bgColor,
  iconName,
  stylesTitle,
  IconType,
}) => {
  return (
    <View style={styles.container(bgColor)}>
      {onPress ? (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={onPress}
          activeOpacity={0.8}>
          <MaterialIcons
            name="arrow-back-ios"
            size={RFValue(24)}
            color={bgColor ? Colors.white01 : Colors.black02}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnBack} />
      )}
      <View style={styles.wpText}>
        <Text style={[styles.title(bgColor), stylesTitle]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {onPressTow ? (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={onPressTow}
          activeOpacity={0.8}>
          {IconType ? (
            <IconType
              name={iconName}
              size={RFValue(24)}
              color={bgColor ? Colors.white01 : Colors.black02}
            />
          ) : (
            <FontAwesome5
              name={iconName}
              size={RFValue(24)}
              color={bgColor ? '#fff' : '#000'}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.btnBack} />
      )}
    </View>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  container: bgColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(15),
    backgroundColor: bgColor ? bgColor : '#fff',

    zIndex: 999,
  }),
  btnBack: {
    width: RFValue(30),
    height: RFValue(30),
  },
  title: bgColor => ({
    fontSize: RFValue(16),
    fontFamily: 'Poppins-SemiBold',
    color: bgColor ? '#fff' : '#000',
    textTransform: 'capitalize',
  }),
  wpText: {
    flex: 1,
    alignItems: 'center',
  },
});
