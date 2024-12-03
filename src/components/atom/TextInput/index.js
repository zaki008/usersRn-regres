import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput as TextInputRN,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, FontFamily} from '../../../styles';
const screenWidth = Dimensions.get('window').width;
const TextInput = ({
  type,
  placeholder,
  lable,
  stylesTextInput,
  stylesLabel,
  errors,
  touched,
  ...restProps
}) => {
  return (
    <View>
      {lable && <Text style={[styles.lable, stylesLabel]}>{lable}</Text>}
      <TextInputRN
        style={[styles.input, stylesTextInput]}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray03}
        {...restProps}
      />
      {errors && touched && <Text style={styles.txtError}>{errors}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - RFValue(32),
  },
  wpTextInput: {
    width: screenWidth - RFValue(32) - RFValue(55),
  },
  input: {
    minHeight: hp('6%'),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(8),
    borderWidth: RFValue(1),
    borderColor: Colors.gray01,
    fontSize: RFValue(11),
    fontFamily: 'Poppins-Medium',
    color: Colors.black02,
  },
  lable: {
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Medium',
    color: Colors.black02,
  },
  wpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - RFValue(32) - RFValue(10),
    height: RFValue(50),
    marginTop: RFValue(10),
  },
  txtError: {
    fontSize: 10,
    fontFamily: FontFamily[500],
    color: Colors.red01,
    marginTop: 2,
  },
});
