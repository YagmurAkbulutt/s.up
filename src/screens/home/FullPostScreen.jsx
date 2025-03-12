import {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import SvgCloseLight from '../../assets/closeLight';
import SvgHeart from '../../assets/heart';
import SvgComments from '../../assets/comments';
import SvgBookmark from '../../assets/bookmark';
import SvgShare from '../../assets/share';
import SvgHanger from '../../assets/hanger';
import SvgPlusPinkB from '../../assets/plusPinkB';
import LinearGradient from 'react-native-linear-gradient';
import ShareModal from '../../components/Home/ShareModal';
import CommentModal from '../../components/Home/CommentModal';
import CollectionsModal from '../../components/Home/CollectionsModal';

const FullPostScreen = ({image, onClose}) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const [translateY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      if (value < -150) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onClose();
        });
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, fadeAnim, translateY, onClose]);

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{translateY}],
            },
          ]}>
          {/* Üst Gölge */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
            style={styles.topGradient}
          />

          {/* Fotoğraf */}
          <Image source={{uri: image.uri}} style={styles.image} />

          {/* Alt Gölge */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.bottomGradient}
          />
        </Animated.View>

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <SvgCloseLight />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.action}>
          <TouchableOpacity style={styles.actionBtn}>
            <SvgHeart />
            <Text style={styles.actionText}>55,3B</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setCommentModal(true)}>
              <SvgComments />
              <Text style={styles.actionText}>55,3B</Text>
            </TouchableOpacity>
            <CommentModal
              commentModal={commentModal}
              setCommentModal={setCommentModal}
            />
          </View>

<View>
          <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(true)}
              activeOpacity={0.7}>
            <SvgBookmark />
            <Text style={styles.actionText}>55,3B</Text>
          </TouchableOpacity>
          <CollectionsModal  modalVisible={modalVisible}
              setModalVisible={setModalVisible}/>
          </View>


          <View>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}>
              <SvgShare />
              <Text style={styles.actionText}>55,3B</Text>
            </TouchableOpacity>
            <ShareModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>

          <TouchableOpacity style={styles.actionBtn}>
            <SvgHanger />
          </TouchableOpacity>
        </View>

        {/* Profil */}
        <View style={styles.profile}>
          <View style={styles.container}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/profilePhoto.png')}
                style={styles.profileImage}
              />
            </View>
            <TouchableOpacity style={styles.plusButton}>
              <SvgPlusPinkB />
            </TouchableOpacity>
          </View>

          <View style={styles.title}>
            <Text style={styles.username}>
              @<Text style={styles.boldUsername}>{image?.username}</Text>
            </Text>
            <Text style={styles.caption}>
              {image?.description}
              {Array.isArray(image?.tags) && image?.tags.length > 0
                ? image?.tags.map((tag, index) => (
                    <Text key={index} style={styles.hashtag}>
                      {tag}{' '}
                    </Text>
                  ))
                : null}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default FullPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  closeBtn: {
    position: 'absolute',
    top: 80,
    right: 30,
    zIndex: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    position: 'absolute',
    zIndex: 10,
    bottom: 60,
    right: 20,
    gap: 16,
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profile: {
    position: 'absolute',
    zIndex: 10,
    bottom: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 55,
    height: 55,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  plusButton: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    maxWidth: 220,
    flexDirection: 'column',
  },
  username: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  boldUsername: {
    fontWeight: '700',
  },
  description: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  caption: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
  },
  hashtag: {
    color: '#FFC2F0',
    fontSize: 14,
    fontWeight: '400',
  },
  additionalData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    width: '90%',
  },
  item: {
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
