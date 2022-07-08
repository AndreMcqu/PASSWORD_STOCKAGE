import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type CustomInputprops = {
  control: any;
  name: string;
  rules: any,
  placeholder: string;
  Type?: string,

}

const CustomInput = ({ name, rules = {}, control, placeholder, Type, }: CustomInputprops) => {


  const [visible, setVisible] = React.useState<boolean>(Type !== "Password")

  const VisibleHandler = () => {
    setVisible(!visible);
  };


  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={!visible}
            />
            {Type === "Password" && (
              <View style={styles.ctminput}>
                <MaterialCommunityIcons onPress={VisibleHandler}
                  name={visible ? "eye-off" : "eye"}
                  size={20}/>
              </View>)}
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 30,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  ctminput: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{}
});

export default CustomInput;