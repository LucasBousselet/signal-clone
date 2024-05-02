import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { AntDesign, Ionicons, FontAwesome } from 'react-native-vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function ChatScreen({ route }) {
    const { id, chatName } = route.params;
    const navigation = useNavigation()
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackVisible: false,
            headerBackTitleVisible: false, // ios only?
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar
                        rounded
                        source={messages[0]?.data.photoURL ? {
                            uri: messages[0]?.data.photoURL
                        } : require('../assets/empty-avatar.png')}
                    />
                    <Text style={{
                        color: 'white',
                        marginLeft: 10,
                        fontWeight: '700'
                    }}>{chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                    <AntDesign name='arrowleft' size={24} color='white' style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    useLayoutEffect(() => {
        const unsub = onSnapshot(
            query(
                collection(db, 'Chats', id, 'messages'),
                orderBy('timestamp', 'desc')
            ),
            snapshot => setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        );

        return unsub;
    }, [id])

    const sendMessage = () => {
        Keyboard.dismiss();

        addDoc(collection(db, 'Chats', id, 'messages'), {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            email: auth.currentUser.email
        })
        setInput('');
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
                style={styles.container}
            >
                {/* Dismiss the keyboard when the user clicks outside the keyboard area */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        {/* Chat */}
                        <FlatList
                            inverted
                            data={messages}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => item.data.email === auth.currentUser.email ? (
                                <View style={styles.sender}>
                                    <Avatar
                                        source={{
                                            uri: item.data.photoURL
                                        }}
                                        size={30}
                                        rounded
                                        position='absolute'
                                        bottom={-15}
                                        right={-5}
                                        // web
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            right: -5
                                        }}
                                    />
                                    <Text style={styles.senderText}>{item.data.message}</Text>
                                </View>
                            ) : (
                                <View style={styles.receiver}>
                                    <Avatar
                                        source={{
                                            uri: item.data.photoURL
                                        }}
                                        size={30}
                                        rounded
                                        position='absolute'
                                        bottom={-15}
                                        left={-5}
                                        // web
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            left: -5
                                        }}
                                    />
                                    <Text style={styles.receiverText}>{item.data.message}</Text>
                                    <Text style={styles.senderName}>{item.data.displayName}</Text>
                                </View>
                            )}
                        />
                        <View style={styles.footer}>
                            {/* Footer */}
                            <TextInput placeholder='Signal Message' value={input} onChangeText={setInput} style={styles.textInput} onSubmitEditing={sendMessage} />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%'
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    receiverText: {
        marginLeft: 10,
        marginBottom: 15
    },
    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },
    senderText: {
        color: 'white',
        fontWeight: '500'
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'grey'
    }
})