import { StyleSheet, Text, View } from 'react-native'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from './Navigation';

const rnBiometricsLogin = new ReactNativeBiometrics();
const navigation = useNavigation<NativeStackNavigationProp<Nav>>();

const ID = () => {
   
    
    
    rnBiometricsLogin.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            console.log('tocuh ID')
            const { success } = resultObject
            //GET//
            if (success) {
                console.log('successful biometrics provided')
                auth()
                    .signInWithEmailAndPassword("Hellogames@gmail.com", "Hellogames")
                    .then(() => {
                        navigation.navigate('Home');
                    })

            } else {
                console.log('user cancelled biometric prompt')
            }
        })
        .catch(() => {
            console.log('biometrics failed')
        })

}

export default ID

const styles = StyleSheet.create({
    btn: {
        paddingTop: 20,
    }
})