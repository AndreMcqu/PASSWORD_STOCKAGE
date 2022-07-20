import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import CtnButton from '../Components/CtnButton';


const Album = () => {


    const reference = storage().ref();


  return (
    <View>
      <CtnButton title="upload" type='secondary'
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          console.log(pathToFile);
          // uploads file
          await reference.putFile(pathToFile);
        }}
      />
    </View>
  )
}

export default Album

const styles = StyleSheet.create({})