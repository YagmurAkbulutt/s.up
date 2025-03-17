import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Button,
  SafeAreaView,
} from 'react-native';
import WebView from 'react-native-webview';
import SvgClose from '../../assets/less';
import {ScrollView} from 'react-native-gesture-handler';
import SvgFilter from '../../assets/filter';
import {enableScreens} from 'react-native-screens';
import SvgBack from '../../assets/back';
import SvgBookmarkS from "../../assets/bookmarkS";
import SvgBookmarksFill from "../../assets/bookmarksFill"
enableScreens(false);

const WebViewModal = ({ visible, onClose, initialUrl, selectedItem }) => {
  if (!selectedItem) return null;
  
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [selectedItemState, setSelectedItem] = useState(selectedItem);

  useEffect(() => {
    if (selectedItem) {
      setWebViewVisible(false);
      setCurrentUrl('');
    }
  }, [selectedItem]);

  const goToWebsite = () => {
    setWebViewVisible(true);
    setCurrentUrl(initialUrl);
  };

  const handleBookmarkPress = (id) => {
    setSelectedBookmark(prevId => (prevId === id ? null : id)); 
  };

  const openWebView = (item) => {
    setSelectedItem(item);
    setCurrentUrl(item.websiteUrl);
    setWebViewVisible(true);
  };

  const renderSimilarItem = ({ item }) => {
    const isBookmarked = selectedBookmark === item.id;

    return (
      <TouchableOpacity
        style={[styles.card]}
        activeOpacity={0.7}
        onPress={() => openWebView(item)}
      >
        <View style={styles.image}>
          <Image source={item.photo} style={styles.similarPhoto} />
          <TouchableOpacity onPress={() => handleBookmarkPress(item.id)}>
            {isBookmarked ? (
              <SvgBookmarksFill style={styles.bookmark} />
            ) : (
              <SvgBookmarkS style={styles.bookmark} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.similarStore}>{item.store}</Text>
          <Text style={styles.similarProduct} numberOfLines={1} ellipsizeMode="tail">
            {item.product}
          </Text>
          <Text style={styles.similarPrice}>{item.price.toFixed(2)} TL</Text>
        </View>
      </TouchableOpacity>
    );
  };




  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Kaydırılabilir Alan */}
            <ScrollView showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled">
              {/* Ürün Görseli ve Kapat Butonu */}
              <View style={styles.imageContainer}>
                <Image
                  source={selectedItem.photo}
                  style={styles.productImage}
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <SvgClose style={styles.closeIcon} />
                </TouchableOpacity>
              </View>

              {/* Ürün Bilgileri */}
              <View style={styles.infoContainer}>
                <View >
                <Text style={styles.brand}>{selectedItem.store}</Text>
                <View style={styles.priceContainer}>
                <Text style={styles.productName}>{selectedItem.product}</Text>
                <Text style={styles.price}>{selectedItem.price} TL</Text></View>
                </View>

                {/* Butonlar */}
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.buttonText}>Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.websiteButton}
                  onPress={goToWebsite}>
                  <Text style={styles.websiteText}>Websitesi</Text>
                </TouchableOpacity>
              </View>

              {/* Benzer Ürünler ve Filtre */}
              <View style={styles.filter}>
                <Text style={styles.intheaderText}>
                  Aynı veya benzer ürünler
                </Text>
                <TouchableOpacity>
                  <SvgFilter />
                </TouchableOpacity>
              </View>

              {/* FlatList ile benzer ürünleri göster */}
              <FlatList
                data={selectedItem.similar}
                renderItem={renderSimilarItem}
                keyExtractor={item => item.product}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarProductsContainer}
              />
            </ScrollView>
          </View>

          {/* WebView'i ayrı bir modalda aç */}
          {webViewVisible && currentUrl && (
            <Modal
              visible={webViewVisible}
              animationType="slide"
              transparent={true} // Şeffaflık ekliyoruz
              statusBarTranslucent={true} // Android için durum çubuğunu gizler
            >
              <View style={styles.overlay}>
                {' '}
                {/* Overlay */}
                <View style={styles.webViewContainer}>
                  {/* Kapatma Butonu */}

                  <TouchableOpacity
                    onPress={() => setWebViewVisible(false)}
                    style={styles.webViewCloseButton}>
                    <SvgBack width={24} height={24} />
                    <Text style={styles.sparklesText}>Sparkles</Text>
                  </TouchableOpacity>

                  {/* WebView */}
                  <WebView source={{uri: currentUrl}} style={styles.webView} />
                </View>
              </View>
            </Modal>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',

    alignItems: 'center',
    height: '90%',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 530,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
    color: '#fff',
  },
  infoContainer: {
    width: '100%',
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B9B9B9',
    textTransform: 'uppercase',
    textAlign: "left",
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    flex: 1,  
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    flex: 1,  
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    width: '100%',  
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'medium',
  },
  websiteButton: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 12,
    width: '100%',  
    alignItems: 'center',
    borderRadius: 5,
  },
  websiteText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'medium',
  },
  intheaderText: {
    fontSize: 16,
    fontWeight: '600',
    
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  
    paddingHorizontal: 20,
    marginTop:20
  },
  
  similarProductsContainer: {
    marginTop: 20,
    paddingBottom: 20,
    marginHorizontal:20
  },
  similarItemContainer: {
    width: 180,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  similarProductImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  similarProductPrice: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    top: '7%',
    position: 'absolute',
    zIndex: 1000,
  },
  webViewCloseButton: {
    position: 'absolute',
    top: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparklesText: {
    fontSize: 14,
    fontWeight: '700',
  },
  webView: {
    flex: 1,
    marginTop: 60,
  },
  card: {
    marginRight: 15,
    alignItems: 'center',
    gap: 10, 
    
  },
  similarPhoto: {
    width: 113,
    height: 165,
    resizeMode: 'contain',
    marginBottom: 10,
    position: 'relative',
  },
  similarStore: {
    fontWeight: '500',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'left',  
  },
  similarProduct: {
    fontSize: 10,
    fontWeight: '600',
    color: '#777',
    marginBottom: 5,
    textAlign: 'left', 
    maxWidth: 90
  },
  similarPrice: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
    textAlign: 'left', 
  },
  bookmark: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  textContainer: {
    alignItems: 'flex-start', 
    width: '100%',
    marginTop:-7
  },
});

export default WebViewModal;