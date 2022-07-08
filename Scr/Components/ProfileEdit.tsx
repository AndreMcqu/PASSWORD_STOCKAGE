import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from './CustomInput';
import { useForm } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore'
import Login from '../../../../TypeScript/Formulaires/Scr/Screens/Login';


type ProfileEditprops = {
  Name: string;
  CtmPlaceholder: string;
  EditType: string;
  rules: any;
  Key: string;
}
type Updateporps = {
  Key: string;
  CtmName: string;
}

// ,CtmName: '', EditType: ''
const ProfileEdit = ({ Name, CtmPlaceholder, EditType, Key, rules }: ProfileEditprops) => {
  const { control, handleSubmit } = useForm<Updateporps>({ defaultValues: { Key: '', CtmName: '' } });
  const [modifie, setModifie] = React.useState<boolean>(true)

  const update = (CtmName: string) => {
    console.log(CtmName)
    if (EditType === 'Name') { firestore().collection('Password').doc(Key).update({ Name: CtmName || CtmPlaceholder }).then(() => {
      setModifie(!modifie);
      console.log('User updated!' + Key);
    }); }
    else if (EditType === 'Login') { firestore().collection('Password').doc(Key).update({ Login: CtmName || CtmPlaceholder  }).then(() => {
      setModifie(!modifie);
      console.log('User updated!' + Key);
    }); }
    else if (EditType === 'Password') { firestore().collection('Password').doc(Key).update({ Login: CtmName || CtmPlaceholder  }).then(() => {
      setModifie(!modifie);
      console.log('User updated!' + Key);
    }); }
    else { firestore().collection('Password').doc(Key).update({ Login: CtmName || CtmPlaceholder  }).then(() => {
      setModifie(!modifie);
      console.log('User updated!' + Key);
    }); }
  }

  const ModifieHandler = () => {
    setModifie(!modifie);
  };
  console.log('the' + Key)
  const onSubmit = ({ CtmName }: Updateporps) => {
    console.log('the one ' + Key + ' edit ' + EditType + ' nom ' + CtmName)
    update( CtmName)
  }

return ( 
  <View>
    {modifie ? <View style={styles.inputContainer}>
      <View><Text style={styles.text}>{Name}</Text></View>
      <View><MaterialCommunityIcons name={"eye"} onPress={() => setModifie(!modifie)} /></View>
    </View>
      : <View style={styles.inputContainer}>
        <View><CustomInput name="CtmName" placeholder={CtmPlaceholder} control={control} rules={rules} /></View>
        <View style={styles.inputIcon}><MaterialCommunityIcons name={"eye-off"} size={20} onPress={handleSubmit(onSubmit)} /></View>
      </View>}
  </View>
)
}

export default ProfileEdit

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  inputIcon: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})