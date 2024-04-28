import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Input } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        // The following observer fires off everytime a change of state is happening for the current user (logged-in / out usually)
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log('on auth changed');
            console.log(user);
            if (user) {
                navigation.replace('Home')
            }
        });
        return unsub;
    }, [])

    const signIn = () => {

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}
            style={styles.container}
        >
            <StatusBar style='light' />

            <Image
                source={require('../assets/signal-logo.png')}
                className='w-48 h-48 mb-6'
            />
            <View className='w-[300px]'>
                <Input
                    placeholder='Email'
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Button containerStyle={styles.button} title='Login' onPress={signIn} />
            <Button containerStyle={styles.button} title='Register' type='outline' onPress={() => navigation.navigate('Register')} />
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
        width: 200,
        marginTop: 10
    }
})