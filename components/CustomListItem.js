import { View, Text } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements';

export default function CustomListItem({ id, chatName, enterChat }) {
    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            <Avatar
                rounded
                source={require('../assets/empty-avatar.png')}
            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 800 }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {'ABC'}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}