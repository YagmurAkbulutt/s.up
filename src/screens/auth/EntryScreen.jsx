import {useEffect, useState} from 'react';
import {View,ImageBackground,Text,TouchableOpacity,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgAppleLogo from "../../assets/applelogo.js"
import SvgGoogleLogo from "../../assets/googleLogo.js"
import SVGLogoS from "../../assets/logo-s.js"
import { height } from '../../utils/helpers.js';

const backgrounds = [
  require('../../assets/entry-1.png'), 
  require('../../assets/entry-2.png'), 
  require('../../assets/entry-3.png'), 
  require('../../assets/entry-4.png'), 
];

const EntryScreen = ({navigation}) => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const setNextBackground = async () => {
      try {
        let currentIndex = await AsyncStorage.getItem('currentBackgroundIndex');
        if (!currentIndex) {
          currentIndex = '0';
        } else {
          currentIndex = (parseInt(currentIndex) + 1) % backgrounds.length;
        }

        await AsyncStorage.setItem(
          'currentBackgroundIndex',
          currentIndex.toString(),
        );
        setBackground(backgrounds[parseInt(currentIndex)]);
      } catch (error) {
        console.error('Background selection error:', error);
      }
    };

    setNextBackground();
  }, []);

  return (
    <ImageBackground
      source={background}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{gap: 10, marginTop: height * 0.65}}>
        <TouchableOpacity style={styles.containerBtn}>
          <SvgAppleLogo
            style={{width: 18, height: 26}}
          />
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Apple ile giriş yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerBtn}>
          <SvgGoogleLogo
            style={{width: 18, height: 26}}
          />
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Google ile giriş yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}
          style={[styles.containerBtn, {backgroundColor: 'black'}]}>
          <SVGLogoS
            style={{width: 18, height: 26}}
          />
          <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
            E-posta ile kayıt ol
          </Text>
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center', height:24, marginTop:14}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight:"400", color:"white", fontSize:14}}>Style Up hesabım var. </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={{fontWeight:"500", color:"white", fontSize:14}}>Giriş yap.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  containerBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
    width: 302,
    height: 52,
    borderRadius: 5,
    padding: '14px 50px',
  },
});
