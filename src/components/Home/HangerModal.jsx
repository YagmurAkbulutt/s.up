import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgLess from '../../assets/less';
import { height, style } from '../../utils/helpers';
import SvgFilter from "../../assets/filter";
import SvgBookmarkS from "../../assets/bookmarkS";

const HangerModal = ({ hangerModal, setHangerModal }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.image}>
        <Image source={item.photo} style={styles.photo} />
        <TouchableOpacity>
          <SvgBookmarkS style={styles.bookmark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.store}>{item.store}</Text>
      <Text style={styles.product} numberOfLines={1} ellipsizeMode="tail">{item.product}</Text>
      <Text style={styles.price}>₺{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={hangerModal}
      onRequestClose={() => setHangerModal(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View>
            <View style={styles.container}>
              <View style={styles.headerCont}>
                <Text style={styles.headerText}>Stile göz at</Text>
              </View>
              <TouchableOpacity
                onPress={() => setHangerModal(false)}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <SvgLess style={styles.closeBtn} />
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View style={styles.headerCont}>
                <Text style={styles.intheaderText}>Aynı veya benzer ürünler</Text>
              </View>
              <TouchableOpacity
                // onPress={() => setCollectionModal(false)}
                activeOpacity={0.7}
                style={styles.closeButton}
              >
                <SvgFilter style={styles.closeBtn} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={style}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.productList}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HangerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: height * 0.55,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 7,
  },
  headerCont: {
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  intheaderText: {
    fontSize: 14,
    fontWeight: '700',
  },
  closeButton: {
    right: 10,
  },
  closeBtn: {
    width: 24,
    height: 24,
  },
  card: {
    marginRight: 15,
    alignItems: 'center',
    gap: 10,  // Kartlar arasındaki boşluğu artırdım
  },
  photo: {
    width: 113,
    height: 165,
    resizeMode: 'contain',
    marginBottom: 10,
    position: 'relative',
  },
  store: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'left',  // Yazıyı sola yasladım
  },
  product: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
    textAlign: 'left',  // Yazıyı sola yasladım
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',  // Yazıyı sola yasladım
  },
  bookmark: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  productList: {
    gap: 3,
  },
});
