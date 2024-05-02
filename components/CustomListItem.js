import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function CustomListItem({ id, chatName, enterChat }) {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(
            query(
                collection(db, 'Chats', id, 'messages'),
                orderBy('timestamp', 'desc'),
                limit(1)
            ),
            snapshot => {
                if (snapshot.docs[0]) {
                    console.log(snapshot?.docs[0]?.data())
                    setLastMessage(snapshot?.docs[0]?.data())
                }
            }
        )

        return unsub;
    }, [])

    if (chatName === 'Egdbv') console.log(id, chatName, lastMessage)

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
                rounded
                source={lastMessage?.photoURL ? {
                    uri: lastMessage.photoURL
                } : require('../assets/empty-avatar.png')}
            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 800 }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {lastMessage ? (lastMessage.displayName + ' says: ' + lastMessage.message) : 'New chat'}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}