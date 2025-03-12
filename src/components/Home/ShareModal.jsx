import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Clipboard,
  TextInput,
  Image,
} from 'react-native';
import SvgLess from '../../assets/less';
import SvgCopyLink from '../../assets/copyLink';
import SvgWhatsapp from '../../assets/whatsapp';
import SvgInstagram from '../../assets/instagram';
import SvgFacebook from '../../assets/facebook';
import SvgSnapchat from '../../assets/snapchat';
import SvgX from '../../assets/x';
import SvgTelegram from '../../assets/telegram';
import SvgShareLink from '../../assets/shareLink';
import SvgClear from "../../assets/clear"
import {useEffect, useState} from 'react';
import SvgSearchPeople from '../../assets/searchpeople';
import {height, messageList, notifications, width} from '../../utils/helpers';

const ShareModal = ({modalVisible, setModalVisible}) => {
  const [copied, setCopied] = useState(false);
  const [like, setLike] = useState(false);
  const [searchText, setSearchText] = useState(''); 
  const [selectedUsers, setSelectedUsers] = useState([]);
  const hasSelectedUsers = selectedUsers.length > 1;
    const [filteredUsers, setFilteredUsers] = useState(notifications); 
  
    useEffect(() => {
      if (searchText.trim() === '') {
        setFilteredUsers(messageList); 
      } else {
        const filtered = messageList.filter(user =>
          user.username.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilteredUsers(filtered);
      }
    }, [searchText]);
  
    const toggleUserSelection = userId => {
      setSelectedUsers(prevSelected => {
        const newSet = new Set(prevSelected);
        newSet.has(userId) ? newSet.delete(userId) : newSet.add(userId);
        return Array.from(newSet);
      });
    };
    

  const handleCopyLink = () => {
    Clipboard.setString('https://example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  const shareOptions = [
    {
      id: 'copy',
      label: (
        <Text style={[styles.shareText, {textAlign: 'center', width: '100%'}]}>
          {copied ? 'Kopyalandı' : 'Bağlantıyı\nkopyala'}
        </Text>
      ),
      icon: () => <SvgCopyLink />,
      onPress: handleCopyLink,
    },
    {id: 'whatsapp', label: 'WhatsApp', icon: () => <SvgWhatsapp />},
    {id: 'instagram', label: 'Instagram', icon: () => <SvgInstagram />},
    {id: 'facebook', label: 'Facebook', icon: () => <SvgFacebook />},
    {id: 'snapchat', label: '', icon: () => <SvgSnapchat />},
    {id: 'x', label: 'X', icon: () => <SvgX />},
    {id: 'telegram', label: 'Telegram', icon: () => <SvgTelegram />},
    {id: 'share', label: 'Paylaş', icon: () => <SvgShareLink />},
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          
            <View style={styles.scontainer}>
              <View
                style={[
                  styles.searchContainer,
                  hasSelectedUsers && {width: '75%'},
                ]}>
                <SvgSearchPeople style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Kişi ara"
                  placeholderTextColor="#BBBBBB"
                  onChangeText={setSearchText}
                  value={searchText}
                />
                {searchText.length > 0 && ( 
                <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearIcon}>
                  <SvgClear />
                </TouchableOpacity>
              )}
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
                style={styles.closeButton}>
                <SvgLess style={styles.closeBtn} />
              </TouchableOpacity>
            </View>

            {/* Kullanıcı Listesi */}
                      <FlatList
                        data={filteredUsers}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3} 
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          const isSelected = selectedUsers.includes(item.id);
                          return (
                            <TouchableOpacity
                              style={[
                                styles.userItem,
                                isSelected && styles.selectedUserItem,
                              ]}
                              onPress={() => toggleUserSelection(item.id)}
                              activeOpacity={0.7}>
                              <View
                                style={[
                                  styles.userImageWrapper,
                                  isSelected && styles.selectedImageWrapper,
                                ]}>
                                <Image source={item.userImage} style={styles.userImage} />
                              </View>
                              <Text style={styles.username}>{item.username}</Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
          

          <FlatList
            data={shareOptions}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.shareButton}
                onPress={item.onPress}
                activeOpacity={0.7}>
                {item.icon()}
                <Text style={styles.shareText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.shareScroll}
            showsHorizontalScrollIndicator={false}
          />

          
        </View>
      </View>
    </Modal>
  );
};

export default ShareModal;

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
  closeButton: {
    right: 16,
    left:16
  },
  closeBtn: {
    width: 24,
    height: 24,
  },
  shareButton: {
    alignItems: 'center',
    height: 160
  },
  shareText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  shareScroll: {
    gap: 17,
    marginVertical: 10,
  },
  scontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    height: 38,
    flex:1,
    paddingVertical:20,
    marginBottom:20
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    height: 38,
    width: '85%',  
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    textAlignVertical: 'center',
  },
  clearIcon: {
    marginLeft: 10, 
    padding: 5,
  },
  userItem: {
    alignItems: 'center',
    justifyContent:"center",
    marginBottom: 25,
    width: width * 0.30
  },
  userImage: {
    width: 78,
    height: 78,
    borderRadius: 45,
  },
  username: {
    marginTop: 6,
    fontSize: 12,
  },
});
