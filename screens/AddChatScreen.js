import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddChat() {
    const navigation = useNavigation();
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats'
        })
    }, [])

    const createChat = async () => {
        // setDoc expects you to provide an ID, addDoc will let Firestore generate an ID for us
        addDoc(collection(db, 'Chats'), {
            chatName: input,
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={setInput}
                onSubmitEditing={createChat}
                leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
            />
            <Button
                onPress={createChat}
                title='Create new Chat'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    },
    button: {
    }
})