import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from 'react-native-screens'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import Card from '../Components/Card';
import Login from './Login';

type Passwordprops = {
    Name: string;
    Login: string;
    Password: string;
    Type: string;
    Key : string;
}

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
    const RouteNavigation = useRoute<RouteProp<Nav>>();

    const [loading, setLoading] = useState<Boolean>(true);
    const [users, setUsers] = useState<Passwordprops[]>([]);

    const UserUid = auth().currentUser?.uid;


    function onResult(querySnapshot: any) {
        console.log('Got Users collection result.');
            const UsersData : Passwordprops[] = [];
            querySnapshot.forEach((documentSnapshot : any) => {
                console.log('Hello' , documentSnapshot.id)
                let Docs = documentSnapshot.data();
                UsersData.push({
                    Name: Docs.Name,
                    Login: Docs.Login,
                    Password: Docs.Password,
                    Type: Docs.Type,
                    Key: documentSnapshot.id,
                }); 
            });
    
            setUsers(UsersData);
            setLoading(false);
           
        };
      
      function onError(error : any) {
        console.error(error);
      }
      

    useEffect(() => {
        const DocUser = firestore()
        
            .collection("Password")
            .where('uid', '==', UserUid)
            .onSnapshot(onResult, onError);

        // Unsubscribe from events when no longer in use
        return () => DocUser();
    }, []);
 
    if (loading) {
        return <ActivityIndicator />;
      }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>PassWords </Text>
            </View>
            <View style={styles.body}>
                <View>

                    <Text>Hello dear {RouteNavigation.params?.email}!</Text>
                </View> 

                <FlatList 
                    data={users} renderItem={({ item }) =>
              <Card Name={item.Name} Login={item.Login} Password={item.Password} Type={item.Type} Key={item.Key} />
        } />
                <Button title="AddPassWord" onPress={() => navigation.navigate('AddPassWord')} />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#439775',
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 9,
        borderRadius: 30,
        width: '95%',
    }
})

    // useEffect(() => { 
    //     const DocUser = () => {
    //         const user = auth().currentUser?.uid;
    //             firestore()
    //                 .collection("Password")
    //                 .where('uid','==',user)
    //                 .get()
    //                 .then((querySnapshot) => {
    //                     console.log('total doc :', querySnapshot.size);
    //                     querySnapshot.forEach(documentSnapshot => {
    //                         console.log(documentSnapshot.data());
    //                     })
    //                 })}
    //  }, []);        

    //         console.log('This is a test',DocUser)