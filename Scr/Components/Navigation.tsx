import React from 'react';
import LoginScr from '../Screen/LoginScr';
import SignUp from '../Screen/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';
import AddPassWord from '../Screen/AddPassWord';
import Upload from '../Screen/Upload';
import Gallery from '../Screen/Gallery';
import CameraRoll from '@react-native-community/cameraroll';

export type Nav = {
    LoginScr: undefined;
    SignUp: undefined;
    Home: {
        email: string,
    } | undefined;
    AddPassWord: undefined;
    Upload: {images : CameraRoll.PhotoIdentifier[]};
    Gallery: undefined;
}

const Stack = createNativeStackNavigator<Nav>();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScr" component={LoginScr} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddPassWord" component={AddPassWord} />
                <Stack.Screen name="Upload" component={Upload} />
                <Stack.Screen name="Gallery" component={Gallery} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;