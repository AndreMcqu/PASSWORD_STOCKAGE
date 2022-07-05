import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { useForm } from 'react-hook-form';
import CustomInput from '../Components/CustomInput'
import { Nav } from '../Components/Navigation';
import Login from './Login';


type CreateAuthprops = {
    Login: string;
    Password: string;
    Name: string;
    Type: string;
}


const AddPassWord = () => {
    const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
    const { control, handleSubmit } = useForm<CreateAuthprops>({defaultValues: {Login:"", Password:"", Name:"", Type:"",}});


    const onSubmit = ({ Login, Password, Name, Type }: CreateAuthprops) => {
        const user = auth().currentUser;
        if (user) {
            firestore()
                .collection("Password")
                .add({
                    Login: Login,
                    Passord: Password,
                    Name: Name,
                    Type: Type,
                    uid: user.uid
                })
                .then(() => {
                    console.log('User added!');
                    navigation.navigate('Home')
                });
        }
    }
    return (
        <View style={styles.container}>
            <CustomInput
                name="Login"
                control={control}
                placeholder="Login"
                rules={{
                    required: 'Username is required',
                    minLength: {
                        value: 3,
                        message: 'Username should be at least 3 characters long',
                    },
                    maxLength: {
                        value: 24,
                        message: 'Username should be max 24 characters long',
                    },
                }}
            />
            <CustomInput
                name="Password"
                control={control}
                placeholder="Password"
                secureTextEntry
                rules={{
                    required: 'Password is required',
                }}
            />
            <CustomInput
                name="Name"
                control={control}
                placeholder="Name"
                rules={{
                    required: 'Name is required',
                    minLength: {
                        value: 3,
                        message: 'Password should be at least 8 characters long',
                    },
                }}
            />
            <CustomInput
                name="Type"
                control={control}
                placeholder="APP or WEB"
                rules={{
                    required: 'Type is required',
                    minLength: {
                        value: 3,
                        message: 'Password should be at least 8 characters long',
                    },
                }}
            />
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default AddPassWord

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    }
})