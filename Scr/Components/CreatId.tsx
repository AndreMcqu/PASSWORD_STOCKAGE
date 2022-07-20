import { StyleSheet } from 'react-native'
import React from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { useNavigation } from '@react-navigation/native'
import { Nav } from './Navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import MMKVStorage, { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const CreatID = ({ email, password }: CreateAuthprops) => {
    const navigation = useNavigation<NativeStackNavigationProp<Nav>>();


    const storage = new MMKVLoader().initialize();
    const [iduser, setIdUser] = useMMKVStorage<string>("iduser", storage);
    const [idpasswordLogin, setIdPasswordLogin] = useMMKVStorage<string>("idpasswordLogin", storage,);

    const rnBiometrics = new ReactNativeBiometrics()


    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            console.log('tocuh ID')
            const { success } = resultObject

            if (success) {
                console.log('successful biometrics provided')
                setIdUser(email);
                setIdPasswordLogin(password);
                navigation.navigate('Home')
            } else {
                console.log('user cancelled biometric prompt')
            }
        })
        .catch(() => {
            console.log('biometrics failed')
        })

}

export default CreatID

const styles = StyleSheet.create({})