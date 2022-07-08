import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import CustomInput from '../Components/CustomInput';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import CtnButton from '../Components/CtnButton';

type CreateAuthprops = {
  email: string;
  password: string;
};

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
  const { control, handleSubmit } = useForm<CreateAuthprops>({ defaultValues: { email: '', password: '' } });

  const onSubmit = ({ email, password }: CreateAuthprops) => {
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
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
      <View style={styles.top}></View>
      <View style={styles.inputcontainer}>
        <View style={styles.input}>
          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
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
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
            }}
          />
          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            Type="Password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
          />
        </View>
      </View>
      <View style={styles.btncontainer}>
        <View style={styles.btn}>
          <CtnButton title="SUBMIT" type='secondary' onPress={handleSubmit(onSubmit)} />
          <CtnButton title="BACK" type='secondary' onPress={() => navigation.navigate('LoginScr')} />
        </View>
      </View>
      <View style={styles.btm}></View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  top: {
    flex: 2,
    borderBottomLeftRadius: 60,
    backgroundColor: '#3C4F76'
  },
  inputcontainer: {
    flex: 5,
    backgroundColor: '#3C4F76'
  },
  input: {
    flex: 1,
    borderTopRightRadius: 60,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btncontainer: {
    flex: 3,
    backgroundColor: '#3C4F76'
  },
  btn: {
    flex: 1.5,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottomRightRadius: 60,
    backgroundColor: '#FFFFFF'
  },
  btm: {
    flex: 2,
    borderTopLeftRadius: 60,
    backgroundColor: '#3C4F76'
  },
})