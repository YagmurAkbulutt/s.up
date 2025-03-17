import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {dismissKeyboard, height, messageList, width} from '../../utils/helpers';
import UserInfo from '../../components/Chat/UserInfo';
import Header from '../../components/Chat/Header';
import SvgAddImage from '../../assets/addImage';
import SvgSendBtn from '../../assets/sendBtn';
import {useCallback, useEffect, useRef, useState} from 'react';
import Loader from '../../components/Loader';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

const ChatScreen = () => {
  const route = useRoute();
  const { userInfo, messageId } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const selectedMessage = messageList.find(item => item.id === messageId);

  const formatMessagesForGiftedChat = (message) => {
    return message.messages.map((msg, index) => ({
      _id: `${message.id}-${index}`, 
      text: msg.text, 
      createdAt: new Date(msg.timestamp), 
      user: {
        _id: message.id, 
        name: message.username, 
        avatar: message.userImage, 
      },
    }));
  };

  // Seçili mesajı formatla
  const formattedMessages = selectedMessage ? formatMessagesForGiftedChat(selectedMessage) : [];

  const [messages, setMessages] = useState(formattedMessages);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  function formatDate(date) {
    const months = [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Arl"
    ];
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = "ÖS"; 
  
    if (hours >= 12) {
      if (hours > 12) hours -= 12;
    } else {
      period = "ÖÖ"; 
    }
  
    minutes = minutes < 10 ? "0" + minutes : minutes;
  
    return `${date.getDate()} ${months[date.getMonth()]},${hours}:${minutes} ${period}`;
  }
  const renderDay = (props) => {
    const { currentMessage } = props;
    return (
      <View style={{ alignItems: 'center', marginVertical:10 }}>
        <Text style={{ color: '#9D9C9C', fontSize: 12, fontWeight: 'regular' }}>
          {formatDate(new Date(currentMessage.createdAt))}
        </Text>
      </View>
    );
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim().length > 0) {
      const newMsg = {
        _id: messages.length + 1,
        text: newMessage,
        createdAt: new Date(),
        user: {
          _id: 1, 
        },
      };
  
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMsg]));
      setNewMessage('');
  
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };
  
  

  const renderInputToolbar = (props) => {
    return (
      
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputBtn} activeOpacity={0.5}>
            <SvgAddImage />
          </TouchableOpacity>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            style={styles.placeholder}
            placeholder="Mesaj yaz..."
            selectionColor='#D134AA'
          />
          <TouchableOpacity
            onPress={() => {
              handleSendMessage(); 
            }}
            style={styles.inputBtn}
            activeOpacity={0.5}>
            <SvgSendBtn />
          </TouchableOpacity>
        </View>
    );
  };
  
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60} 
>

  
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header userInfo={userInfo} />

      <View style={{ flex: 1 }}>
        
          {/* UserInfo birlikte kaydırılabilir */}
          <UserInfo userInfo={userInfo} />
          
  
          {/* Mesajlar */}
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 1 }}
            renderDay={renderDay}
            renderTime={() => null}  
            renderInputToolbar={(props) => (
              <View style={{ position: 'relative', bottom: 0, left: 0, right: 0, backgroundColor: '#fff' }}>
                {renderInputToolbar(props)}
              </View>
            )}
            bottomOffset={0} 
            minInputToolbarHeight={50}
            wrapInSafeArea={false}
            messagesContainerStyle={{ flex: 1, marginTop:200 }}
            ListHeaderComponent={() => (
              <View style={{ backgroundColor: '#fff', padding: 10 }}>
                <Text>User Info Component</Text>
                <UserInfo userInfo={userInfo} />
              </View>
            )}
            
            renderBubble={(props) => (
              <Bubble
                        {...props}
                        wrapperStyle={{
                          right: {
                            backgroundColor: '#D134AA',
                            borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
                            padding: 5,
                            
                          },
                          left: {
                            backgroundColor: '#F1F1F1',
                            borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
                            padding: 5,
                            margin:3,
                            
                          },
                        }}
                        textStyle={{
                          right: { color: '#ffffff',fontSize:12 },
                          left: { color: '#000000', fontSize:12 },
                        }}
                      />
              )}
            scrollToBottom
            scrollEnabled={true}
            
          />
        

        
      </View>
    </SafeAreaView>
  
</KeyboardAvoidingView>
</TouchableWithoutFeedback>

  
  );
};

export default ChatScreen;
 
const styles = StyleSheet.create({
  loaderContainer: {
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lastMessageDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9D9C9C',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 10,
  },
  messageContainer: {
    marginHorizontal: 7,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 7,
    alignSelf: 'center',
  },
  emptyAvatar: {
    width: 30,
    height: 30,
    marginRight: 7,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
    borderRadius: 52,
  },
  messageText: {
    color: '#181818',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 59,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    width: width * 0.88,
    height: height * (Platform.OS === 'android' ? 0.06 : 0.05),
    left: '6%',
  },
  placeholder: {
    flex: 1,
    fontWeight: '500',
    paddingVertical: 8,
  },
  inputBtn: {
    padding: 8,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
