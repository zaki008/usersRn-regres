import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, FontFamily} from '../../styles';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getDataLocal();
    }, 3000);
  }, []);

  const getDataLocal = async () => {
    try {
      const token = await getData('tokenLogin');
      console.log('token', token);
      if (token) {
        return navigation.navigate('HomeScreen');
      }
      return navigation.navigate('LoginScreen');
    } catch (err) {
      console.log('loacal datang', err);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <Feather name="users" size={62} color="#CC2B52" />
        <Text style={styles.title}>SplashScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white01,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily[700],
    fontSize: 24,
    marginTop: 8,
  },
});
