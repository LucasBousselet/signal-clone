import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons'

export default function ChatScreen({ route }) {
    const { id, chatName } = route.params;
    const navigation = useNavigation()

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
                        source={require('../assets/empty-avatar.png')}
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
            )
        })
    })

    return (
        <View>
            <Text>{chatName}</Text>
            <Text>ChatScreen</Text>
        </View>
    )
}