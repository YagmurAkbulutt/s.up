import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';

const PostScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else {
      checkPermission();
    }
  }, []);

  const checkPermission = async () => {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    setHasPermission(granted);
  };

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Kamera İzni',
        message: 'Uygulama kamerasını kullanmak için izin istiyor.',
        buttonNeutral: 'Sonra',
        buttonNegative: 'İptal',
        buttonPositive: 'Tamam',
      }
    );
    setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  if (!hasPermission) {
    return <Text>Kamera izni verilmedi.</Text>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
         style={styles.camera}
         ref={(ref) => setCamera(ref)}
         type={RNCamera.Constants.Type.back}
         captureAudio={false}
      >
        <View style={styles.buttonContainer}>
          <Button
            title="Fotoğraf Çek"
            onPress={() => {
              if (camera) {
                camera.takePictureAsync({ quality: 0.5 }).then((data) => {
                  console.log(data.uri);
                });
              }
            }}
          />
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default PostScreen;
