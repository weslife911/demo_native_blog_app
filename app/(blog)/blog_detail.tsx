import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import Button from '../../components/common/Button';
import { useGetBlogsQuery } from '@/services/queries/useBlogQueries';

export default function BlogDetailScreen() {
    const router = useRouter();
    const { blogId } = useLocalSearchParams<{ blogId: string }>();

    const { data: blogs = [], isLoading } = useGetBlogsQuery();
    const blog = blogs.find((item) => item._id === blogId);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!blog) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>Blog post not found.</Text>
                <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
                    <Text style={{ color: COLORS.primary }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const authorName = blog.author?.username || blog.author?.full_name || 'Anonymous';
    const authorInitial = authorName.charAt(0).toUpperCase();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Icon name="arrow-back-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Blog Post</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Icon name="share-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{blog.title}</Text>

                    <View style={styles.authorContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{authorInitial}</Text>
                        </View>
                        <View>
                            <Text style={styles.authorName}>{authorName}</Text>
                            <Text style={styles.date}>
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contentText}>
                        <Text style={styles.paragraph}>{blog.content}</Text>
                    </View>

                    <Button
                        title="Get AI Summary"
                        onPress={() => router.push({ pathname: '/(blog)/blog_summary', params: { blogId } })}
                        style={styles.summaryButton}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    errorText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
    },
    backLink: {
        marginTop: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
    },
    shareButton: {
        padding: 8,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.black,
        marginBottom: 16,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.white,
        fontWeight: '600',
    },
    authorName: {
        ...TYPOGRAPHY.body1,
        color: COLORS.black,
        fontWeight: '600',
    },
    date: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[500],
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray[100],
        marginBottom: 24,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
    },
    contentText: {
        marginBottom: 24,
    },
    paragraph: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[700],
        lineHeight: 28,
    },
    summaryButton: {
        marginTop: 8,
    },
});