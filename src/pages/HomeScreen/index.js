import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap} from '../../components';
import {getUsers, updateData} from '../../redux/slice/userSlice';
import {Colors, FontFamily} from '../../styles';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, isLoading} = useSelector(state => state.user);
  const [numberOfItemsPerPageList] = useState([2, 5, 10, 20]);

  const handlePerPage = pageSize => {
    dispatch(updateData({per_page: pageSize, page: 1}));
  };

  const handlePageChange = page => {
    dispatch(updateData({page: page + 1}));
  };

  const from = (data?.page - 1) * data?.per_page || 0;
  const to = Math.min(data?.page * data?.per_page || 0, data?.total || 0);

  useEffect(() => {
    dispatch(getUsers(data));
  }, [data.per_page, data.page]);

  const handleLogout = async () => {
    AsyncStorage.multiRemove(['tokenLogin']).then(res => {
      dispatch({type: 'DESTROY_SESSION'});
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>List User</Text>
          <Button
            title={'Logout'}
            stylesText={{fontSize: RFValue(11)}}
            onPress={handleLogout}
          />
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              Image
            </DataTable.Title>
            <DataTable.Title
              style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
              Email
            </DataTable.Title>
            <DataTable.Title
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              Action
            </DataTable.Title>
          </DataTable.Header>
          {isLoading ? (
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={'large'} color={Colors.red01} />
            </View>
          ) : data?.data?.length ? (
            data.data.map(item => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.avatar}}
                    style={{width: 50, height: 50}}
                  />
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {item.email}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    title={'View'}
                    stylesButton={{backgroundColor: '#3D5300'}}
                    onPress={() =>
                      navigation.navigate('DetailUser', {id: item.id})
                    }
                    stylesText={{fontSize: 10}}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.notFound}>Data Belum Tersedia</Text>
          )}
          <Gap height={8} />
          {data?.data?.length && !isLoading && (
            <DataTable.Pagination
              page={data.page - 1}
              numberOfPages={Math.ceil(data.total / data.per_page)}
              onPageChange={handlePageChange}
              label={`${from + 1}-${to} of ${data.total}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={data.per_page}
              onItemsPerPageChange={handlePerPage}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          )}
        </DataTable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white01,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily[700],
    color: Colors.black02,
  },
  notFound: {
    fontSize: 14,
    fontFamily: FontFamily[600],
    color: Colors.black02,
    textAlign: 'center',
    marginTop: 20,
  },
});
