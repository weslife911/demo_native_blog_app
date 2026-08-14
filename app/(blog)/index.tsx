import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import BlogCard from '../../components/blog/BlogCard';
import { RenderEmptyState } from '@/components/blog/EmptyBlogsRender';
import { useGetUserDataQuery } from '@/services/queries/useAuthQueries';
import { useRouter } from 'expo-router';
import { useGetBlogsQuery } from '@/services/queries/useBlogQueries';
import { useLogoutMutation } from '@/services/mutations/useAuthMutations';

export default function HomeScreen({ navigation }: any) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const { data: userData } = useGetUserDataQuery();
    const logoutMutation = useLogoutMutation();

    const { data: blogs = [], isLoading, isRefetching, refetch } = useGetBlogsQuery();

    const handleCreateBlog = () => {
        router.push('/(blog)/create_blog');
    };

    const handleProfilePress = () => {
        router.push('/(profile)');
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {

                        } catch (error) {
                            Alert.alert('Error', 'Failed to log out. Please try again.');
                        }
                    },
                },
            ]
        );
        await logoutMutation.mutateAsync();
        router.replace('/(auth)');
    };

    const renderLoader = () => (
        <View style={styles.loaderContainer}>
            <View style={styles.loaderCard}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loaderText}>Fetching stories...</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>
                        Hello, {userData?.username || 'Writer'} 👋
                    </Text>
                    <Text style={styles.headerTitle}>Discover Stories</Text>
                </View>

                {/* Header Action Buttons */}
                <View style={styles.headerActions}>
                    {/* Profile Button */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleProfilePress}
                    >
                        <Icon name="person-outline" size={22} color={COLORS.black} />
                    </TouchableOpacity>

                    {/* Notification Button */}
                    <TouchableOpacity style={styles.notificationButton}>
                        <Icon name="notifications-outline" size={22} color={COLORS.black} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleLogout}
                    >
                        <Icon name="log-out-outline" size={22} color={COLORS.error} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color={COLORS.gray[500]} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search blogs..."
                    placeholderTextColor={COLORS.gray[400]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="options-outline" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                renderLoader()
            ) : (
                <FlatList
                    data={blogs}
                    keyExtractor={(item) => item._id}
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    contentContainerStyle={
                        blogs.length === 0 ? styles.emptyListContent : styles.blogList
                    }
                    renderItem={({ item }) => (
                        <BlogCard
                            title={item.title}
                            content={item.content}
                            author={item.author?.username || 'Anonymous'}
                            date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                            onPress={() =>
                                router.push({
                                    pathname: '/(blog)/blog_detail',
                                    params: { blogId: item._id },
                                })
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <RenderEmptyState
                            onPress={() => router.push('/(blog)/create_blog')}
                        />
                    }
                />
            )}

            {/* Floating Action Button (FAB) to Add Blog */}
            <TouchableOpacity
                style={styles.fab}
                onPress={handleCreateBlog}
                activeOpacity={0.8}
            >
                <Icon name="add-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
    },
    greeting: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
    },
    headerTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.black,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    notificationButton: {
        position: 'relative',
        padding: 8,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: COLORS.error,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: 24,
        marginVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        ...SHADOWS.small,
    },
    searchInput: {
        flex: 1,
        ...TYPOGRAPHY.body1,
        color: COLORS.black,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    filterButton: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 8,
    },
    blogList: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    emptyListContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },
    loaderCard: {
        paddingVertical: 24,
        paddingHorizontal: 32,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.medium,
    },
    loaderText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
        marginTop: 12,
        fontWeight: '500',
    },
    fab: {
        position: 'absolute',
        bottom: 28,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
    },
});