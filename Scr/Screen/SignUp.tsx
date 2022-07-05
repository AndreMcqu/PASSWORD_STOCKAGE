import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import CustomInput from '../Components/CustomInput';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';

type CreateAuthprops = {
  email: string;
  password: string;
};

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
  const { control, handleSubmit } = useForm<CreateAuthprops>({defaultValues: {email:'',password:''}});

  const onSubmit = ({email, password}: CreateAuthprops) => {auth()
  .createUserWithEmailAndPassword(email.trim(), password)
  .then(() => {
    console.log('User account created & signed in!');
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
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  }
})