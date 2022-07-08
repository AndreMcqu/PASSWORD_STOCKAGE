import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import ProfileEdit from './ProfileEdit';


export type cardprops = {
    Name: string;
    Login: string;
    Password: string;
    Type: string;
    Key: string;
}

const Card = ({ Name, Login, Password, Type, Key }: cardprops) => {
    console.log('importted to card' + Name, Login, Password, Type, Key)

    console.log('Delete', Key)
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
            <View style={styles.top}>
            <View style={styles.left}>
                <ProfileEdit Name={Name} CtmPlaceholder={Name} EditType={'Name'} Key={Key} rules={{ required: 'Name is required' }} />
                </View>
                <View style={styles.right}>
                <ProfileEdit Name={Type} CtmPlaceholder={Type} EditType={'Type'} Key={Key} rules={{ required: 'Type is required' }} />
                </View>
            </View>
            <View style={styles.bottom}>
            <View style={styles.left}>
                <Text style={styles.text}>Login :</Text>
                <ProfileEdit Name={Login} CtmPlaceholder={Login} EditType={'Login'} Key={Key} rules={{ required: 'Login is required' }} />
                </View>
                <View style={styles.right}>  
                <ProfileEdit Name={Password} CtmPlaceholder={Password} EditType={'Password'} Key={Key} rules={{ required: 'Password is required' }} />
                </View>
                <View><TouchableOpacity onPress={() => onSubmit(Key)}>
                    <Text>Delete</Text>
                </TouchableOpacity></View>
            </View>
        </View>


    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        backgroundColor: '#4DA167',
        paddingLeft: 10,
        paddingTop: 10,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
        height: 120,
    },
    top: {
        flexDirection: 'row',
        flex: 4,
    },
    bottom: {
        flex: 4,
        flexDirection: 'row',
        paddingTop: 5
    },
    right: {
        flex: 1,
        flexDirection: 'row',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
    },
    password: {
        justifyContent: 'center',
    },
    text:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#383F51',
    },
})