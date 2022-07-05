import React from 'react';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Home from '../Screen/Home';
import AddPassWord from '../Screen/AddPassWord';

export type Nav = {
    Login: undefined;
    SignUp: undefined;
    Home: {
        email: string,
    } | undefined;
    AddPassWord: undefined;
}
const Stack = createNativeStackNavigator<Nav>();



const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddPassWord" component={AddPassWord} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Navigation;