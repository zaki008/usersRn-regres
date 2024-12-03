import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontFamily} from '../../../styles';

const ItemDetail = ({title, info}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>: {info}</Text>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily[700],
    fontSize: 14,
    color: Colors.black02,
    width: 100,
  },
  info: {
    fontFamily: FontFamily[600],
    fontSize: 14,
    color: Colors.gray03,
  },
});
