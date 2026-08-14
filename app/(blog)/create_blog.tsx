import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import Button from '../../components/common/Button';
import { useCreateBlogMutation } from '@/services/mutations/useBlogMutation';

const blogValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .min(3, 'Title must be at least 3 characters')
        .required('Blog title is required'),
    content: Yup.string()
        .trim()
        .min(10, 'Content must be at least 10 characters')
        .required('Blog content is required'),
});

export default function CreateBlogScreen() {
    const router = useRouter();
    const createBlogMutation = useCreateBlogMutation();

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: blogValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await createBlogMutation.mutateAsync(values, {
                    onSuccess: () => {
                        Alert.alert(
                            'Success 🎉',
                            'Your blog post has been published successfully!',
                            [
                                {
                                    text: 'OK',
                                },
                            ]
                        );
                        router.replace("/(blog)")
                    },
                    onError: (error: any) => {
                        Alert.alert(
                            'Error',
                            error?.response?.data?.message ||
                            error?.message ||
                            'Failed to create blog post. Please try again.'
                        );
                    },
                });
            } catch (err) {
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create Blog</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="close-outline" size={28} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.form}>
                    {/* Blog Title Field */}
                    <View>
                        <Text style={styles.label}>Blog Title</Text>
                        <TextInput
                            style={[
                                styles.titleInput,
                                formik.touched.title &&
                                formik.errors.title &&
                                styles.inputErrorBorder,
                            ]}
                            placeholder="Enter your blog title..."
                            placeholderTextColor={COLORS.gray[400]}
                            value={formik.values.title}
                            onChangeText={formik.handleChange('title')}
                            onBlur={formik.handleBlur('title')}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <Text style={styles.errorText}>{formik.errors.title}</Text>
                        )}
                    </View>

                    {/* Blog Content Field */}
                    <View>
                        <Text style={styles.label}>Content</Text>
                        <View
                            style={[
                                styles.contentContainer,
                                formik.touched.content &&
                                formik.errors.content &&
                                styles.inputErrorBorder,
                            ]}
                        >
                            <TextInput
                                style={styles.contentInput}
                                placeholder="Write your blog content here..."
                                placeholderTextColor={COLORS.gray[400]}
                                value={formik.values.content}
                                onChangeText={formik.handleChange('content')}
                                onBlur={formik.handleBlur('content')}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                        {formik.touched.content && formik.errors.content && (
                            <Text style={styles.errorText}>{formik.errors.content}</Text>
                        )}
                    </View>

                    {/* Submit Action */}
                    <View style={styles.actions}>
                        <Button
                            title='Publish Blog'
                            loading={formik.isSubmitting || createBlogMutation.isPending}
                            onPress={() => formik.handleSubmit()}
                            disabled={
                                formik.isSubmitting || createBlogMutation.isPending
                            }
                            style={styles.publishButton}
                        />
                    </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    headerTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.black,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    form: {
        gap: 16,
    },
    label: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[700],
        fontWeight: '500',
        marginBottom: 6,
    },
    titleInput: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        ...SHADOWS.small,
    },
    contentContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        ...SHADOWS.small,
        overflow: 'hidden',
    },
    contentInput: {
        ...TYPOGRAPHY.body1,
        color: COLORS.black,
        padding: 16,
        minHeight: 200,
        lineHeight: 24,
    },
    inputErrorBorder: {
        borderWidth: 1,
        borderColor: COLORS.error,
    },
    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: 4,
        marginLeft: 4,
    },
    actions: {
        marginTop: 8,
        gap: 12,
    },
    publishButton: {
        marginBottom: 4,
    },
});