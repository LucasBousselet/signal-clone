import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomListItem from '../components/CustomListItem';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons'
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            query(
                collection(db, 'Chats')
            ),
            snapshot => setChats(snapshot?.docs?.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        );

        return unsub;
    }, [])

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace('Login')
        });
    }

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id, chatName
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTitleStyle: {
                color: 'black'
            },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='black' onPress={() => navigation.navigate('AddChat')} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    return (
        <SafeAreaView>
            <FlatList
                keyExtractor={item => item.id}
                data={chats}
                renderItem={({ item }) => <CustomListItem id={item.id} chatName={item.data.chatName} enterChat={enterChat} />}
            />
        </SafeAreaView>
    )
}