import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import { useForm } from 'react-hook-form';
import CustomInput from '../Components/CustomInput';
import auth from '@react-native-firebase/auth';
import SignUp from './SignUp';

type CreateAuthprops = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
  const { control, handleSubmit } = useForm<CreateAuthprops>({ defaultValues: { email: '', password: '' },mode:'onBlur' });
  const onSubmit = ({ email, password }: CreateAuthprops) => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home',{email})
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
    <View>
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
        secureTextEntry
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
      />
      <Button title="Connection" onPress={handleSubmit(onSubmit)} />
      <Button title="Go somewhere else" onPress={() => navigation.navigate('SignUp')} />
    </View >
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  }
})