import { View, Text } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements';

export default function CustomListItem({ id, chatName, enterChat }) {
    return (
        <ListItem>
            <Avatar
                rounded
                source={require('../assets/empty-avatar.png')}
            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 800 }}>
                    Youtube Chat
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    This is a test subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}