import { StyleSheet, Text, View, PermissionsAndroid, Platform, FlatList, Image } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import React from 'react';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import CtnButton from '../Components/CtnButton';
import { types } from '@babel/core';


const Album = () => {
  const [newAlbum, setNewAlbum] = React.useState<CameraRoll.PhotoIdentifier[] | undefined>();

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
    })
      .then((roll) => {
        setNewAlbum(roll.edges);
        console.log("Et la ? " + roll.edges)
      })
      .catch((err) => {
        //Error Loading Images
      });

    console.log(newAlbum);
  };

  return (
    <View>
      <Text>hello</Text>
      <CtnButton title="permission" type="primary" onPress={() => handleButtonPress()} />
      <FlatList
        numColumns={3}
        initialNumToRender={20} 
        data={newAlbum}
        keyExtractor={(item) => item.node.timestamp.toString()}
        renderItem={({ item }) =>
          <Image
            style={{
              width: '33%',
              height: 150,
            }}
            source={{ uri: item.node.image.uri }}
          />}
      />
    </View>
  )
}

export default Album

const styles = StyleSheet.create({})