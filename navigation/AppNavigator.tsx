import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleOnboardingComplete = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {showOnboarding ? (
                <Stack.Screen name="Onboarding">
                    {() => <OnboardingNavigator onComplete={handleOnboardingComplete} />}
                </Stack.Screen>
            ) : !isAuthenticated ? (
                <Stack.Screen name="Auth">
                    {() => <AuthNavigator onLogin={handleLogin} />}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="Main" component={MainNavigator} />
            )}
        </Stack.Navigator>
    );
}