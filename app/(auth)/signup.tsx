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
import { useSignupMutation } from '@/services/mutations/useAuthMutations';

const signupSchema = Yup.object().shape({
    full_name: Yup.string()
        .required('Full name is required')
        .min(2, 'Name is too short'),
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function SignupScreen() {
    const router = useRouter();
    const { mutate: signup, isPending } = useSignupMutation();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Icon name="people-outline" size={32} color={COLORS.white} />
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our community of writers</Text>
                </View>

                <Formik
                    initialValues={{
                        full_name: '',
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={signupSchema}
                    onSubmit={(values) => {
                        const { confirmPassword, ...signupData } = values;

                        signup(signupData, {
                            onSuccess: (data) => {
                                if (data?.success) {
                                    router.replace('/(blog)');
                                } else {
                                    Alert.alert('Error', data?.message || 'Signup failed.');
                                }
                            },
                            onError: (error: any) => {
                                const errorMessage =
                                    error?.response?.data?.message || 'Something went wrong. Please try again.';
                                Alert.alert('Signup Error', errorMessage);
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
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={values.full_name}
                                onChangeText={handleChange('full_name')}
                                onBlur={handleBlur('full_name')}
                                icon="person-outline"
                                error={touched.full_name && errors.full_name ? errors.full_name : undefined}
                            />

                            <Input
                                label="Username"
                                placeholder="Choose a username"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                autoCapitalize="none"
                                icon="at-outline"
                                error={touched.username && errors.username ? errors.username : undefined}
                            />

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
                                placeholder="Create a password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                                icon="lock-closed-outline"
                                error={touched.password && errors.password ? errors.password : undefined}
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry
                                icon="checkmark-circle-outline"
                                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                            />

                            <Button
                                title="Sign Up"
                                onPress={() => handleSubmit()}
                                disabled={isPending}
                                loading={isPending}
                                style={styles.signupButton}
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
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Link href="/(auth)" style={styles.loginLink}>Login</Link>
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
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    welcomeText: {
        ...TYPOGRAPHY.h1,
        color: COLORS.black,
        marginBottom: 4,
    },
    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[600],
    },
    form: {
        marginBottom: 16,
    },
    signupButton: {
        marginVertical: 8,
    },
    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
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
        marginTop: 8,
    },
    footerText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
    },
    loginLink: {
        ...TYPOGRAPHY.body2,
        color: COLORS.secondary,
        fontWeight: '600',
    },
});