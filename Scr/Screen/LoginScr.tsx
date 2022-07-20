import { Alert, Button, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import { useForm } from 'react-hook-form';
import CustomInput from '../Components/CustomInput';
import auth from '@react-native-firebase/auth';
import CtnButton from '../Components/CtnButton';
import MMKVStorage, { MMKVLoader, useIndex, useMMKVStorage } from "react-native-mmkv-storage";
import ID from '../Components/ID';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'


export type CreateAuthprops = {
  email: string;
  password: string;
};

const LoginScr = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();

  const storage = new MMKVLoader().initialize();
  const [user, setUser] = useMMKVStorage<string>("user", storage);
  const [passwordLogin, setPasswordLogin] = useMMKVStorage<string>("age", storage,);


  const { control, handleSubmit } = useForm<CreateAuthprops>({ defaultValues: { email: '', password: '' }, mode: 'onBlur' });
  const onSubmit = ({ email, password }: CreateAuthprops) => {



    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('User account created & signed in!');
        setUser(email);
        setPasswordLogin(password);
        navigation.navigate('Home', { email });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });


  };

  useEffect(() => {
    if(user && passwordLogin){
        navigation.navigate('Home', { email:user })
      }},[])  



  console.log(user, passwordLogin)

  const ID = () => {

    const rnBiometrics = new ReactNativeBiometrics();
    
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
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




  
  // const postsIndex = useMMKVStorage("postsIndex",storage,[]); // ['post123','post234'];
  // // Get the posts based on those ids.
  // const [posts,update,remove] = useIndex(postsIndex,"object", storage);
  // console.log(posts,update)

  return (
    <View style={styles.container}>
      <View style={{
        flex: 2,
      }}>
        <View style={styles.top}></View>
      </View>
      <View style={{ flex: 7, backgroundColor: '#4DA167' }}>
        <View style={styles.bottom}>
          <Text>E-Mail</Text>
          <CustomInput
            name="email"
            placeholder="E-Mail"
            control={control}
            rules={{ required: 'E-Mail is required' }}
            keyboardType={"email-address"}
          />
          <Text>PassWord</Text>
          <CustomInput
            name="password"
            placeholder="Password"
            Type="Password"
            control={control}
            rules={{
              required: 'Password is required',
            }}
          keyboardType={"default"}
          /> 
         
          <View style={styles.btn}>
            <CtnButton title="CONNECTION" type="primary" onPress={handleSubmit(onSubmit)} />
            <View style={styles.btn}>
              <CtnButton title="SIGN UP" type="primary" onPress={() => navigation.navigate('SignUp')} />
            </View>
            <View style={styles.btn}>
            <CtnButton title="TouchID" type="primary" onPress={ID} />
            </View>
          </View>
        </View>
      </View>
    </View >
  )
}

export default LoginScr

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  top: {
    flex: 1,
    borderBottomRightRadius: 60,
    backgroundColor: '#4DA167'
  },
  bottom: {
    flex: 1,
    borderTopLeftRadius: 60,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    paddingTop: 20,
  }
})