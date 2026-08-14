import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import Markdown from 'react-native-markdown-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import Button from '../../components/common/Button';
import { useSummarizeBlogMutation } from '@/services/mutations/useBlogMutation';

export default function BlogSummaryScreen() {
    const router = useRouter();
    const { blogId } = useLocalSearchParams<{ blogId: string }>();

    const summarizeMutation = useSummarizeBlogMutation();

    const handleGenerateSummary = () => {
        if (!blogId) {
            Alert.alert('Error', 'Blog ID is missing');
            return;
        }

        summarizeMutation.mutate(blogId, {
            onError: (error: any) => {
                Alert.alert(
                    'Error',
                    error?.response?.data?.message ||
                    error?.message ||
                    'Failed to generate AI summary. Please try again.'
                );
            },
        });
    };

    const handleCopySummary = async () => {
        if (summarizeMutation.data?.summary) {
            await Clipboard.setStringAsync(summarizeMutation.data.summary);
            Alert.alert('Copied! 📋', 'Summary copied to clipboard.');
        }
    };

    const summaryData = summarizeMutation.data;
    const isLoading = summarizeMutation.isPending;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Icon name="arrow-back-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Summary</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.summaryContainer}>
                    <View style={styles.titleContainer}>
                        <Icon name="sparkles" size={24} color={COLORS.primary} />
                        <Text style={styles.summaryTitle}>AI-Generated Summary</Text>
                    </View>

                    {summaryData?.title && (
                        <Text style={styles.blogTitle}>{summaryData.title}</Text>
                    )}

                    {!summaryData && !isLoading ? (
                        <View style={styles.emptyState}>
                            <Icon
                                name="document-text-outline"
                                size={64}
                                color={COLORS.gray[300]}
                            />
                            <Text style={styles.emptyStateTitle}>Generate Summary</Text>
                            <Text style={styles.emptyStateDescription}>
                                Click the button below to generate an AI summary of this
                                blog post
                            </Text>
                            <Button
                                title="Generate Summary"
                                onPress={handleGenerateSummary}
                                style={styles.generateButton}
                            />
                        </View>
                    ) : isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                            <Text style={styles.loadingText}>
                                Generating AI summary...
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.summaryContent}>
                            <View style={styles.summaryCard}>
                                <View style={styles.summaryHeader}>
                                    <Icon
                                        name="bulb-outline"
                                        size={24}
                                        color={COLORS.primary}
                                    />
                                    <Text style={styles.summaryHeaderText}>
                                        Key Points
                                    </Text>
                                </View>

                                {/* Render formatted markdown content */}
                                <Markdown style={markdownStyles}>
                                    {summaryData?.summary || ''}
                                </Markdown>
                            </View>

                            <View style={styles.actions}>
                                <Button
                                    title="Copy Summary"
                                    onPress={handleCopySummary}
                                    variant="outline"
                                    style={styles.copyButton}
                                />
                                <Button
                                    title="Read Full Blog"
                                    onPress={() => router.back()}
                                    style={styles.readButton}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const markdownStyles = StyleSheet.create({
    body: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[700],
        lineHeight: 24,
    },
    strong: {
        fontWeight: '700',
        color: COLORS.black,
    },
    em: {
        fontStyle: 'italic',
    },
    bullet_list_icon: {
        color: COLORS.primary,
        fontSize: 16,
    },
    list_item: {
        marginVertical: 4,
    },
    code_inline: {
        backgroundColor: COLORS.gray[100],
        color: COLORS.primary,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontFamily: 'monospace',
    },
    code_block: {
        backgroundColor: COLORS.gray[100],
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
    },
    fence: {
        backgroundColor: COLORS.gray[100],
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
    placeholder: {
        width: 40,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    summaryContainer: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    summaryTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.primary,
    },
    blogTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
        marginBottom: 24,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
        marginTop: 16,
    },
    emptyStateDescription: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[500],
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
        paddingHorizontal: 32,
    },
    generateButton: {
        minWidth: 200,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
        marginTop: 16,
    },
    summaryContent: {
        flex: 1,
    },
    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        ...SHADOWS.medium,
        marginBottom: 24,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    summaryHeaderText: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
    },
    actions: {
        gap: 12,
    },
    copyButton: {
        borderColor: COLORS.gray[300],
    },
    readButton: {
        marginTop: 4,
    },
});