import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import { useForm } from 'react-hook-form';
import CustomInput from '../Components/CustomInput';
import auth from '@react-native-firebase/auth';
import CtnButton from '../Components/CtnButton';
;

type CreateAuthprops = {
  email: string;
  password: string;
};

const LoginScr = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
  const { control, handleSubmit } = useForm<CreateAuthprops>({ defaultValues: { email: '', password: '' }, mode: 'onBlur' });
  const onSubmit = ({ email, password }: CreateAuthprops) => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home', { email })
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
          />
          <Text>PassWord</Text>
          <CustomInput
            name="password"
            placeholder="Password"
            Type="Password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password should be minimum 3 characters long',
              },
            }}
          />
          <View style={styles.btn}>
            <CtnButton title="CONNECTION" type="primary" onPress={handleSubmit(onSubmit)} />
            <View style={styles.btn}>
              <CtnButton title="SIGN UP" type="primary" onPress={() => navigation.navigate('SignUp')} />
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