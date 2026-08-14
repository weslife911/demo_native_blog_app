import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';

interface BlogCardProps {
    title: string;
    content: string;
    author: string;
    date: string;
    onPress?: () => void;
    onSummarize?: () => void;
}

export default function BlogCard({
    title,
    content,
    author,
    date,
    onPress,
    onSummarize,
}: BlogCardProps) {
    const truncateContent = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.header}>
                <View style={styles.authorContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{author.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={styles.authorName}>{author}</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onSummarize} style={styles.summaryButton}>
                    <Icon name="sparkles-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{truncateContent(content)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...SHADOWS.medium,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
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
        ...TYPOGRAPHY.body2,
        color: COLORS.black,
        fontWeight: '600',
    },
    date: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[500],
    },
    summaryButton: {
        padding: 8,
        backgroundColor: COLORS.gray[100],
        borderRadius: 20,
    },
    title: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
        marginBottom: 8,
    },
    content: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
        lineHeight: 22,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    tagContainer: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: COLORS.gray[100],
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    tagText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[700],
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[500],
        marginHorizontal: 4,
        marginRight: 12,
    },
});