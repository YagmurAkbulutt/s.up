import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  RefreshControl,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import MasonryList from 'react-native-masonry-list';
import {imageData, width} from '../../utils/helpers';
import ImageCarousel from '../../components/Home/ImageCarousel';
import HomeSkeleton from '../../components/Home/HomeSkeleton';
import Header from '../../components/Home/Header';
import FullPostScreen from './FullPostScreen';
import Loader from '../../components/Loader';

const getImageSize = async image => {
  return {
    width: Math.floor((width - 30) / 2),
    height: Math.floor(Math.random() * 100) + 250,
  };
};

const HomeScreen = () => {
  const [formattedImages, setFormattedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [firstRefresh, setFirstRefresh] = useState(true);

  const handleRefresh = () => {
    setFirstRefresh(false);
    onRefresh();
  };

  const loadImages = async () => {
    setLoading(true);
    const updatedImages = await Promise.all(
      imageData.map(async item => {
        const firstImage = item.images[0];
        const {width, height} = await getImageSize(firstImage);

        return {
          id: item.id,
          uri: Image.resolveAssetSource(firstImage).uri,
          width: width,
          height: height,
          images: item.images,
          isCarousel: item.images.length > 1,
          username: item.username,
          description: item.description,
          tags: item.tags,
        };
      }),
    );

    setTimeout(() => {
      setFormattedImages(updatedImages);
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoaderVisible(true);
    loadImages();
  }, []);

  const onScroll = event => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY < 100) {
      setLoaderVisible(true);
    } else {
      setLoaderVisible(false);
    }
  };

  const customImageComponent = useMemo(
    () => item => {
      const foundItem = formattedImages.find(i => i.uri === item.source.uri);

      const handlePress = (item, index) => {
        setSelectedImage(item);
      };

      return foundItem ? (
        <ImageCarousel item={foundItem} onPress={handlePress} />
      ) : null;
    },
    [formattedImages],
  );

  const dataToScroll = formattedImages.map(image => ({
    username: image.username,
    description: image.description,
    tags: image.tags ? image.tags.join(', ') : '',
  }));
  const masonryRef = useRef(null);
  console.log('Modal açıldı, formattedImages:', formattedImages);
  console.log('Modal açılınca selectedImage:', selectedImage);

  return (
    <View style={styles.container}>
      <Header />
      <>
        {loading ? (
          <HomeSkeleton />
        ) : (
          <>
            {refreshing && !firstRefresh ? (
              <View style={styles.loaderContainer}>
                <Loader />
              </View>
            ) : null}

            <ScrollView
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              scrollEventThrottle={16}
              onScroll={onScroll}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  tintColor="transparent"
                  colors={['transparent']}
                />
              }>
              <MasonryList
                images={formattedImages}
                customImageComponent={customImageComponent}
                columns={2}
                spacing={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </ScrollView>
          </>
        )}
      </>
      {selectedImage && (
         <Modal
         visible={!!selectedImage}
         animationType="slide"
         onRequestClose={() => setSelectedImage(null)}
       >
         {formattedImages.length > 0 ? (
           <View style={{flex:1}}>
           <FlatList
             data={formattedImages}
             keyExtractor={(item, index) =>
               item.id ? item.id.toString() : index.toString()
             }
             showsVerticalScrollIndicator={false}
             pagingEnabled
             style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      getItemLayout={(data, index) => ({
        length: Dimensions.get("window").width, 
        offset: Dimensions.get("window").width * index, 
        index,
      })}
      initialScrollIndex={formattedImages.findIndex(
        (img) => img.id === selectedImage.id
      )}
      renderItem={({ item }) => (
        <FullPostScreen
          image={item} 
          onClose={() => setSelectedImage(null)} 
          extraData={dataToScroll} 
        />
      )}
      
            
           />
         </View>
         
         ) : (
           <Text style={{ textAlign: "center", marginTop: 20 }}>Yükleniyor...</Text>
         )}
       </Modal>
    //    <Modal
    //    visible={!!selectedImage}
    //    animationType="slide"
    //    onRequestClose={() => setSelectedImage(null)}>
    //    <FullPostScreen
    //      image={selectedImage}
    //      onClose={() => setSelectedImage(null)}
    //      extraData={dataToScroll}
    //    />
    //  </Modal>
   

       
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'android' && 5,
  },
  masonry: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  loaderContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

{
  /*
  
  <Modal
          visible={!!selectedImage}
          animationType="slide"
          onRequestClose={() => setSelectedImage(null)}>
          <FullPostScreen
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            extraData={dataToScroll}
          />
        </Modal>
  */
}
