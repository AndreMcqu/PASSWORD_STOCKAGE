import { StyleSheet, Text, View, PermissionsAndroid, Platform, FlatList, Image, Touchable, TouchableOpacity, ImageBackground, InteractionManager } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import React, { useEffect } from 'react';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import CtnButton from '../Components/CtnButton';
import auth from '@react-native-firebase/auth';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Nav } from '../Components/Navigation';
import Gallery from './Gallery';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteGalleryProps = { route: RouteProp<Nav, 'Upload'> }

const Upload = ({ route }: RouteGalleryProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
  const [selected, setSelected] = React.useState<CameraRoll.PhotoIdentifier[]>([]);
  const { images } = route.params

  const handleButtonPress = () => {

    selected.forEach(item => {
      let path = item.node.image.uri
      let itemName = item.node.image.filename + item.node.timestamp.toString()
      uploadImagesToStorage(path, itemName);
      navigation.navigate('Gallery');

    })
  };

  // ===============================================> to selecte Item arnd return flatList

  // condition to remove or add item to selected array
  const albumselector = (item: CameraRoll.PhotoIdentifier) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(photo => photo !== item))
    }
    else {
      setSelected([...selected, item])
    }
  };

  const isSelected = (item: CameraRoll.PhotoIdentifier): boolean => {
    return selected.includes(item)
  };

  const FlatReturn = ({ item }: { item: CameraRoll.PhotoIdentifier }) => {
    const itemSelected = isSelected(item)
    return (
      <TouchableOpacity onLongPress={() => albumselector(item)} style={itemSelected ? styles.containerSelected : styles.container}>
        <ImageBackground source={{ uri: item.node.image.uri }} resizeMode="cover">
          <View style={styles.size}>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  // ===================================================> to upload selected photos
  const uploadImagesToStorage = (path: string, itemName: string) => {
    const user = auth().currentUser
    const Ref = storage().ref(user?.uid + "Images/" + itemName)
    const task = Ref.putFile(path)

    task.then(() => {
      console.log('Images uploaded to the bucket!')
    })
      .catch(err => console.error(err))

  };
// ========================================================<RETURN>================================================
  return (
    <View>
      <CtnButton title="upload" type="primary" onPress={() => handleButtonPress()} />
      <FlatList
        numColumns={3}
        initialNumToRender={20}
        data={images}
        keyExtractor={(item) => item.node.timestamp.toString()}
        renderItem={FlatReturn} />
    </View>
  )
}

export default Upload

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSelected: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
  },
  size: {
    width: "33%",
    height: 150,
  }
})