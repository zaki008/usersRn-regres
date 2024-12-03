import {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderPrimary, ItemDetail} from '../../components';
import {getDetailUser} from '../../redux/slice/userSlice';
import {Colors} from '../../styles';

const DetailUser = ({navigation, route}) => {
  const {id} = route?.params;
  const dispatch = useDispatch();
  const {detailUser, isLoading} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getDetailUser(id));
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        bgColor={Colors.red01}
        onPress={() => navigation.goBack()}
        title={'Detail User'}
      />
      {isLoading ? (
        <View style={{marginTop: 40}}>
          <ActivityIndicator color={Colors.red01} size={'large'} />
        </View>
      ) : (
        <View style={styles.content}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.bgImage}>
              <Image
                source={{uri: detailUser.data.avatar}}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.wpItemDetail}>
            <ItemDetail
              title={'First Name'}
              info={detailUser.data.first_name || '-'}
            />
            <ItemDetail
              title={'Last Name'}
              info={detailUser.data.last_name || '-'}
            />
            <ItemDetail title={'Email'} info={detailUser.data.email || '-'} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailUser;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white01,
  },
  content: {
    padding: 24,
    justifyContent: 'center',
  },
  bgImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: Colors.gray03,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  wpItemDetail: {
    marginVertical: 30,
  },
});
