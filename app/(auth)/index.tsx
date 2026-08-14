import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter, Link } from 'expo-router';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useLoginMutation } from '@/services/mutations/useAuthMutations';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export default function LoginScreen() {
    const router = useRouter();
    const { mutate: login, isPending } = useLoginMutation();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Icon name="book-outline" size={32} color={COLORS.white} />
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Login to continue reading and sharing</Text>
                </View>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        login(values, {
                            onSuccess: (data) => {
                                if (data?.success) {
                                    router.replace('/(blog)');
                                } else {
                                    Alert.alert('Login Failed', data?.message || 'Invalid credentials.');
                                }
                            },
                            onError: (error: any) => {
                                const errorMessage =
                                    error?.response?.data?.message || 'Something went wrong. Please try again.';
                                Alert.alert('Login Error', errorMessage);
                            },
                        });
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.form}>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon="mail-outline"
                                error={touched.email && errors.email ? errors.email : undefined}
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                                icon="lock-closed-outline"
                                error={touched.password && errors.password ? errors.password : undefined}
                            />

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <Button
                                title="Login"
                                onPress={() => handleSubmit()}
                                disabled={isPending}
                                loading={isPending}
                                style={styles.loginButton}
                            />

                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or continue with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon name="logo-google" size={24} color={COLORS.gray[700]} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon name="logo-apple" size={24} color={COLORS.gray[700]} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon name="logo-facebook" size={24} color={COLORS.gray[700]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Link href="/(auth)/signup" style={styles.signupLink}>Sign Up</Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    welcomeText: {
        ...TYPOGRAPHY.h1,
        color: COLORS.black,
        marginBottom: 8,
    },
    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
    },
    form: {
        marginBottom: 24,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.primary,
        fontWeight: '500',
    },
    loginButton: {
        marginBottom: 24,
    },
    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.gray[200],
    },
    dividerText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[500],
        marginHorizontal: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
    },
    signupLink: {
        ...TYPOGRAPHY.body2,
        color: COLORS.primary,
        fontWeight: '600',
    },
});