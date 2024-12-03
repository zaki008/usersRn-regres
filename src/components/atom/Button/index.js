import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../../styles';
const Button = ({
  type,
  title,
  onPress,
  icon,
  kind,
  likes,
  stylesButton,
  stylesText,
  isLike,
  loadingLike,
  loading,
  disabled,
  colorLoading,
  stylesContainer,
}) => {
  if (kind === 'btn-text-icon') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}>
        <View style={[styles.container(type), styles.wpTxtIcon, stylesButton]}>
          {icon}
          <Text
            style={[styles.lable(type), {marginLeft: RFValue(8)}, stylesText]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (kind === 'btn-icon') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.containerBtnIcon}>
          {loadingLike ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : isLike ? (
            <AntDesign name="heart" size={RFValue(18)} color="#fff" />
          ) : (
            <AntDesign name="hearto" size={RFValue(18)} color="#fff" />
          )}
          {loadingLike ? null : <Text style={styles.text}>{likes}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  const Icons = () => {
    return (
      <>
        {loading ? (
          <ActivityIndicator size={'small'} color={colorLoading || '#fff'} />
        ) : (
          <Text style={[styles.lable(type), stylesText]}>{title}</Text>
        )}
        {icon && <View>{icon}</View>}
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={stylesContainer}
      activeOpacity={0.8}
      disabled={disabled}>
      <View style={[styles.container(type), stylesButton]}>{Icons()}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: type === 'secondary' ? Colors.white01 : Colors.red01,
    borderRadius: RFValue(13),
    paddingVertical: RFValue(9),
    paddingHorizontal: RFValue(10),
    borderWidth: RFValue(1),
    borderColor: type === 'secondary' ? Colors.red01 : Colors.white01,
  }),
  lable: type => ({
    fontSize: RFValue(14),
    textAlign: 'center',
    color: type === 'secondary' ? Colors.red01 : Colors.white01,
    fontFamily: 'Poppins-SemiBold',
  }),

  containerBtnIcon: {
    backgroundColor: Colors.red01,
    borderRadius: RFValue(13),
    paddingVertical: RFValue(9),
    paddingHorizontal: RFValue(10),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginTop: RFValue(3),
    color: Colors.white01,
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(18),
    marginLeft: RFValue(8),
  },
  wpTxtIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: RFValue(22),
    marginLeft: RFValue(8),
  },
});
