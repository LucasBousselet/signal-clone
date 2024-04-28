import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, updateProfile } from 'firebase/auth';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

        })
    }, [navigation]);

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                updateProfile(authUser.user, {
                    displayName: name,
                    photoURL: imageURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}
            style={styles.container}
        >
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View className='w-4/5'>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Input
                    placeholder='Profile Picture URL (optional)'
                    type='text'
                    value={imageURL}
                    onChangeText={setImageURL}
                    onSubmitEditing={register}
                />
            </View>

            <View className='w-3/5'>
                <Button
                    containerStyle={styles.button}
                    title='Register'
                    onPress={register}
                    raised
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        marginTop: 10,
    }
})