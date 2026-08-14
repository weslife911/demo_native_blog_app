import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/(auth)/index';
import SignupScreen from '../app/(auth)/signup';

const Stack = createNativeStackNavigator();

interface Props {
    onLogin: () => void;
}

export default function AuthNavigator({ onLogin }: Props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {() => <LoginScreen onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
                {() => <SignupScreen onSignup={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}