import React from 'react'
import { PermissionsAndroid, StyleSheet, Text, View, Image } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CtnButton from '../Components/CtnButton'
import { Nav } from '../Components/Navigation';

const Gallery = () => {

  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();

  const [newAlbum, setNewAlbum] = React.useState<CameraRoll.PhotoIdentifier[]>([]);


  // ======================================> to get permission to use phone data
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const handleButtonPress = () => {
    hasAndroidPermission();
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      include:['filename']
    })
      .then((roll) => {
        setNewAlbum(roll.edges);
        navigation.navigate('Upload', {images : newAlbum});
      })
      .catch((err) => {
        //Error Loading Images
      });

    console.log(newAlbum);
  };


  return (
    <View>
      <Text>Galerie</Text>
      <CtnButton title="Upload" type="secondary" onPress={() => handleButtonPress()} />
    </View>
  )
}

export default Gallery

const styles = StyleSheet.create({})