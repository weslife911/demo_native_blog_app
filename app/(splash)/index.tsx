import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Bounce animation for text
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const translateY = bounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <View style={styles.gradientCircle1} />
                <View style={styles.gradientCircle2} />
            </View>

            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.logo}>
                    <Icon name="book-outline" size={48} color={COLORS.white} />
                </View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.textContainer,
                    {
                        transform: [{ translateY }],
                    },
                ]}
            >
                <Text style={styles.title}>Blog App</Text>
                <Text style={styles.subtitle}>Share Your Stories</Text>
            </Animated.View>

            <View style={styles.loaderContainer}>
                <View style={styles.loader}>
                    <View style={[styles.loaderBar, { backgroundColor: COLORS.primary }]} />
                    <View style={[styles.loaderBar, { backgroundColor: COLORS.secondary }]} />
                    <View style={[styles.loaderBar, { backgroundColor: COLORS.primaryLight }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: width,
        height: height,
        overflow: 'hidden',
    },
    gradientCircle1: {
        position: 'absolute',
        width: width * 1.2,
        height: width * 1.2,
        borderRadius: width * 0.6,
        backgroundColor: COLORS.primary + '15',
        top: -width * 0.4,
        right: -width * 0.3,
    },
    gradientCircle2: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: COLORS.secondary + '10',
        bottom: -width * 0.2,
        left: -width * 0.3,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.black,
        fontWeight: '700',
        letterSpacing: 2,
    },
    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[500],
        marginTop: 4,
        letterSpacing: 4,
    },
    loaderContainer: {
        position: 'absolute',
        bottom: 80,
        alignItems: 'center',
    },
    loader: {
        flexDirection: 'row',
        gap: 8,
    },
    loaderBar: {
        width: 12,
        height: 12,
        borderRadius: 6,
        opacity: 0.7,
    },
});