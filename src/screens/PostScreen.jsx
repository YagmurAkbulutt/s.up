import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, SafeAreaView } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import PermissionsAndroid from 'react-native-permissions';

const PostScreen = () => {
  // const [hasPermission, setHasPermission] = useState(false);
  // const [camera, setCamera] = useState(null);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     requestCameraPermission();
  //   } else {
  //     checkPermission();
  //   }
  // }, []);

  // const checkPermission = async () => {
  //   let result;
  //   if (Platform.OS === 'ios') {
  //     result = await check(PERMISSIONS.IOS.CAMERA);
  //   } else {
  //     result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  //   }
  //   setHasPermission(result === RESULTS.GRANTED || result === true);
  // };

  // const requestCameraPermission = async () => {
  //   let granted;
  //   if (Platform.OS === 'ios') {
  //     granted = await request(PERMISSIONS.IOS.CAMERA);
  //   } else {
  //     granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Kamera İzni',
  //         message: 'Uygulama kamerasını kullanmak için izin istiyor.',
  //         buttonNeutral: 'Sonra',
  //         buttonNegative: 'İptal',
  //         buttonPositive: 'Tamam',
  //       }
  //     );
  //   }
  //   setHasPermission(granted === RESULTS.GRANTED || granted === PermissionsAndroid.RESULTS.GRANTED);
  // };

  // if (!hasPermission) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Kamera izni verilmedi.</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    // <View style={styles.container}>
    //   <RNCamera
    //     style={styles.camera}
    //     ref={(ref) => setCamera(ref)}
    //     type={RNCamera.Constants.Type.back}
    //     captureAudio={false}
    //   >
    //     <View style={styles.buttonContainer}>
    //       <Button
    //         title="Fotoğraf Çek"
    //         onPress={() => {
    //           if (camera) {
    //             camera.takePictureAsync({ quality: 0.5 }).then((data) => {
    //               console.log(data.uri);
    //             });
    //           }
    //         }}
    //       />
    //     </View>
    //   </RNCamera>
    // </View>
    <Text>camera</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default PostScreen;