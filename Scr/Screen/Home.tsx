import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from 'react-native-screens'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../Components/Navigation';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import Card from '../Components/Card';
import CtnButton from '../Components/CtnButton';
import MMKVStorage, { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

type Passwordprops = {
    Name: string;
    Login: string;
    Password: string;
    Type: string;
    Key: string;
}

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<Nav>>();
    const RouteNavigation = useRoute<RouteProp<Nav>>();

    const [loading, setLoading] = useState<Boolean>(true);
    const [users, setUsers] = useState<Passwordprops[]>([]);

    const UserUid = auth().currentUser?.uid;

    function onResult(querySnapshot: any) {
        console.log('Got Users collection result.');
        const UsersData: Passwordprops[] = [];
        querySnapshot.forEach((documentSnapshot: any) => {
            console.log('Hello', documentSnapshot.id)
            let Docs = documentSnapshot.data();
            UsersData.push({
                Name: Docs.Name,
                Login: Docs.Login,
                Password: Docs.Password,
                Type: Docs.Type,
                Key: documentSnapshot.id,
            }); console.log('import to to card' + Docs.Name, Docs.Login, Docs.Password, Docs.Type, Docs.Key)
        });

        setUsers(UsersData);
        setLoading(false);

    };

    function onError(error: any) {
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
    const storage = new MMKVLoader().initialize();
    const Signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
            storage.clearStore();
            navigation.navigate('LoginScr');});
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.box}>
                <View style={styles.side}></View>
                <View style={styles.inner}>
                    <View style={styles.body}>
                        <View style={{ flex: 1 }}>
                            <Text>Hello dear {RouteNavigation.params?.email}!</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <View style={{ flex: 8 }}>
                                <FlatList
                                    data={users} renderItem={({ item }) =>
                                        <Card Name={item.Name} Login={item.Login} Password={item.Password} Type={item.Type} Key={item.Key} />
                                    } />
                            </View>
                            <View style={{ flex: 2, paddingLeft: 5 }}>
                                <CtnButton title="Gallery" type="secondary" onPress={() => navigation.navigate('Gallery')} />
                                <CtnButton title="AddPassWord" type="secondary" onPress={() => navigation.navigate('AddPassWord')} />
                                <CtnButton title="SignOut" type="secondary" onPress={() => Signout()} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    top: {
        flex: 1,
        borderBottomRightRadius: 60,
        backgroundColor: '#4DA167'
    },
    box: {
        flex: 8,
        flexDirection: 'row',
        backgroundColor: '#4DA167'
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 9,
        borderRadius: 30,
        width: '95%',
    },
    side: {
        flex: 0.5,
        backgroundColor: '#4DA167',
    },
    inner: {
        flex: 15,
        borderBottomLeftRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: '#FFFFFF'
    },
});