import {Formik} from 'formik';
import {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, TextInput} from '../../components/atom';
import {postRegister, resetAuthRedux} from '../../redux/slice/authSlice';
import {Colors, FontFamily} from '../../styles';
import {AllertShow, schemaRegister} from '../../utils';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isSuccess, isError, isLoading, messageError} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isError && messageError) {
      AllertShow(messageError.error, 'danger');
    }
    if (isSuccess) {
      AllertShow('Login is Successfully', 'success');
      navigation.navigate('LoginScreen');
    }
    dispatch(resetAuthRedux());
  }, [isError, messageError, isSuccess]);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Feather name="users" size={72} color="#CC2B52" />
          <Text style={styles.title}>Daftar</Text>
          <Formik
            initialValues={{email: '', password: '', confirmPassword: ''}}
            validationSchema={schemaRegister}
            onSubmit={values => {
              const formData = {
                email: values.email,
                password: values.password,
              };
              console.log('formdata', formData);
              dispatch(postRegister(formData));
            }}>
            {({handleChange, handleSubmit, values, errors}) => (
              <View>
                <TextInput
                  lable="Email"
                  outlineColor={'red'}
                  placeholder={'Input Email'}
                  value={values.email}
                  errors={errors.email}
                  onChangeText={handleChange('email')}
                />
                <Gap height={12} />
                <TextInput
                  lable="Password"
                  outlineColor={'red'}
                  placeholder={'Input Password'}
                  value={values.password}
                  errors={errors.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={true}
                />
                <Gap height={12} />
                <TextInput
                  lable="Confirm Password"
                  outlineColor={'red'}
                  placeholder={'Input Confirm Password'}
                  value={values.confirmPassword}
                  errors={errors.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.notAccount}
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.textNotAcc}>Sudah Punya Akun ? </Text>
                  <Text style={styles.txtDaftar}>Login</Text>
                </TouchableOpacity>
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  title={'Submit'}
                  stylesContainer={{marginTop: 40}}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white01,
  },
  content: {
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: FontFamily[700],
    marginBottom: 30,
    marginTop: 14,
  },
  notAccount: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  textNotAcc: {
    color: Colors.black02,
    fontFamily: FontFamily[500],
  },
  txtDaftar: {
    color: Colors.red01,
    fontFamily: FontFamily[600],
  },
});
