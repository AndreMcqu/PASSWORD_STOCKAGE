import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import firestore from '@react-native-firebase/firestore'


export type cardprops = {
    Name: string;
    Login: string;
    Password: string;
    Type: string;
    Key : string;
}

const Card = ({Name, Login, Password, Type, Key}: cardprops) => {

    console.log('Delete' , Key)
    const onSubmit = (Key: string) => {

        firestore()
        .collection('Password')
        .doc(Key)
        .delete()
        .then(() => {
          console.log('User deleted!');
        });
    }
    
    return (
        <View style={styles.container}>
            <View>
                <Text>{Name}</Text>
                <Text>{Login}</Text>
            </View>
            <View style={styles.password}>
                <Text>{Password}</Text>
                <Text>{Type}</Text>
            </View>
            <View><TouchableOpacity onPress={()=> onSubmit(Key)}>
                <Text>Delete</Text>
            </TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=> onSubmit(Key)}>
                <Text>modifie</Text>
            </TouchableOpacity></View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        backgroundColor: 'gold',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 25,
        height: 70,
    },
    password:{
        justifyContent: 'center',
    },
})