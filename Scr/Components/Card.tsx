import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import ProfileEdit from './ProfileEdit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
                <View style={styles.Layout}>
                    <ProfileEdit Name={Name} CtmPlaceholder={Name} EditType={'Name'} Key={Key} rules={{ required: 'Name is required' }} keyboardTypeedit={"default"}/>
                </View>
                <View style={styles.Layout}>
                    <ProfileEdit Name={Type} CtmPlaceholder={Type} EditType={'Type'} Key={Key} rules={{ required: 'Type is required' }} keyboardTypeedit={"default"}/>
                </View>
                <View style={styles.Layout}>
                    <Text style={styles.text}>Login :</Text>
                </View>
                <View style={styles.Layout}>
                    <ProfileEdit Name={Login} CtmPlaceholder={Login} EditType={'Login'} Key={Key} rules={{ required: 'Login is required' }} keyboardTypeedit={"default"}/>
                </View>
                <View style={styles.Layout}>
                    <Text style={styles.text}>Password :</Text>
                </View>
                <View style={styles.Layout}>
                    <ProfileEdit Name={Password} CtmPlaceholder={Password} EditType={'Password'} Key={Key} rules={{ required: 'Password is required' }} keyboardTypeedit={"default"}/>
                </View>
            </View>
            <View style={styles.inputIcon}>
                <MaterialCommunityIcons name={"eye-off"} size={20} onPress={() => onSubmit(Key)} />
            </View>
        </View>


    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4DA167',
        paddingLeft: 10,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
        height: 120,
        flexDirection: 'row',
        marginBottom: 10,
    },
    top: {
        flex: 4,
        gap: '1rem',
        flexWrap: "wrap",
        flexDirection: 'row',
        paddingTop: 5
    },
    Layout: {
        width: '40%',
        flexDirection: 'row',
        margin: 4,

    },
    left: {
        flex: 1,

    },
    password: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#383F51',
    },
    inputIcon: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})