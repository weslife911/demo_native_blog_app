import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../app/(blog)/index';
import CreateBlogScreen from '../app/(blog)/create_blog';
import ProfileScreen from '../app/(profile)/index';
import BlogDetailScreen from '../app/(blog)/blog_detail';
import BlogSummaryScreen from '../app/(blog)/blog_summary';
import { COLORS } from '../constants/colors';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface Props {
    onLogout: () => void;
}

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
            <Stack.Screen name="BlogSummary" component={BlogSummaryScreen} />
        </Stack.Navigator>
    );
}

// Custom Tab Bar Button Component
function CustomTabBarButton({ children, onPress, focused }: any) {
    return (
        <TouchableOpacity
            style={styles.customTabButton}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {children}
        </TouchableOpacity>
    );
}

export default function MainNavigator({ onLogout }: Props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Create') {
                        iconName = focused ? 'create' : 'create-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray[500],
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    paddingTop: 8,
                    height: 60,
                    borderTopWidth: 0,
                    ...(Platform.OS === 'ios' ? { shadowOpacity: 0.1 } : { elevation: 8 }),
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen
                name="Create"
                component={CreateBlogScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.createButtonContainer}>
                            <Icon name="add-circle" size={32} color={COLORS.primary} />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    customTabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
});