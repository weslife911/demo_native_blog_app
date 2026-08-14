import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../app/(onboarding)/index';

const Stack = createNativeStackNavigator();

interface Props {
    onComplete: () => void;
}

export default function OnboardingNavigator({ onComplete }: Props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingMain">
                {() => <OnboardingScreen onComplete={onComplete} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}