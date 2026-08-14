import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated,
    StatusBar,
    ViewToken,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface OnboardingItem {
    id: string;
    icon: string;
    title: string;
    description: string;
    color: string;
}

const onboardingData: OnboardingItem[] = [
    {
        id: '1',
        icon: 'create-outline',
        title: 'Share Your Stories',
        description: 'Create and share your thoughts with the world through beautiful blog posts',
        color: '#6C63FF',
    },
    {
        id: '2',
        icon: 'sparkles-outline',
        title: 'AI-Powered Insights',
        description: 'Get instant AI-generated summaries of any blog post for quick reading',
        color: '#FF6584',
    },
    {
        id: '3',
        icon: 'people-outline',
        title: 'Connect & Engage',
        description: 'Connect with other writers and engage with their content',
        color: '#4CAF50',
    },
];

interface Props {
    onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex); // Update state immediately
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    // Tracks visible item when swiping
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderItem = ({ item }: { item: OnboardingItem }) => (
        <View style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
                    <Icon name={item.icon} size={60} color={COLORS.white} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {onboardingData.map((_, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 32, 8],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    width: dotWidth,
                                    opacity,
                                    backgroundColor: onboardingData[currentIndex]?.color || COLORS.primary,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(item) => item.id}
            />

            <View style={styles.footer}>
                {renderDots()}

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                    <Icon
                        name={currentIndex === onboardingData.length - 1 ? 'checkmark' : 'arrow-forward'}
                        size={20}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        zIndex: 10,
        padding: 8,
    },
    skipText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
        fontWeight: '500',
    },
    slide: {
        width,
        paddingHorizontal: 40,
        paddingTop: 80,
        alignItems: 'center',
    },
    iconContainer: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    iconWrapper: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        ...TYPOGRAPHY.h2,
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 24,
        right: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        ...SHADOWS.medium,
    },
    nextButtonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
        marginRight: 8,
    },
});