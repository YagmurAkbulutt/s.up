import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import MasonryList from 'react-native-masonry-list';
import {imageData} from '../../utils/helpers';
import ImageCarousel from '../../components/Home/ImageCarousel';
import HomeSkeleton from '../../components/Home/HomeSkeleton';
import Header from '../../components/Home/Header';
import FullPostScreen from './FullPostScreen';
import Loader from '../../components/Loader';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const [formattedImages, setFormattedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const flatListRef = useRef(null);

  const loadImages = async () => {
    setLoading(true);
    const updatedImages = imageData.map(item => ({
      id: item.id,
      uri: Image.resolveAssetSource(item.images[0]).uri,
      width: width,
      height: height,
      images: item.images,
      isCarousel: item.images.length > 1,
      username: item.username,
      description: item.description,
      tags: item.tags,
    }));

    setTimeout(() => {
      setFormattedImages(updatedImages);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlePress = item => {
    console.log('Seçilen resim:', item);
    setSelectedImage(item);

    const index = formattedImages.findIndex(img => img.id === item.id);
    if (flatListRef.current && index !== -1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({index, animated: false});
      }, 100);
    }
  };

  const customImageComponent = useMemo(
    () => item => {
      const foundItem = formattedImages.find(i => i.uri === item.source.uri);
      return foundItem ? (
        <ImageCarousel
          item={foundItem}
          onPress={() => handlePress(foundItem)}
        />
      ) : null;
    },
    [formattedImages],
  );

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <HomeSkeleton />
      ) : (
        <MasonryList
          images={formattedImages}
          customImageComponent={customImageComponent}
          columns={2}
          spacing={1}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ✅ Çalışan Swipe Destekli Modal */}
      <Modal
        visible={!!selectedImage}
        animationType="slide"
        onRequestClose={() => setSelectedImage(null)}>
        <View style={styles.modalContainer}>
          {formattedImages.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={formattedImages}
              keyExtractor={item => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={
                formattedImages.findIndex(
                  img => img.id === selectedImage?.id,
                ) || 0
              }
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({item}) => (
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.uri}} style={styles.image} />
                </View>
              )}
            />
          ) : (
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
