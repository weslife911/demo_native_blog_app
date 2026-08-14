import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS } from '../../constants/colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: string;
    iconColor?: string;
}

export default function Input({
    label,
    error,
    icon,
    iconColor = COLORS.gray[500],
    secureTextEntry,
    style,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.focused,
                    error && styles.errorContainer,
                ]}
            >
                {icon && (
                    <Icon
                        name={icon}
                        size={20}
                        color={isFocused ? COLORS.primary : iconColor}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.gray[400]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry && !showPassword}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Icon
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={COLORS.gray[500]}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[700],
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.gray[200],
        borderRadius: 12,
        paddingHorizontal: 16,
        minHeight: 50,
    },
    focused: {
        borderColor: COLORS.primary,
    },
    errorContainer: {
        borderColor: COLORS.error,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        ...TYPOGRAPHY.body1,
        color: COLORS.black,
        paddingVertical: 12,
    },
    eyeIcon: {
        padding: 4,
    },
    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: 6,
    },
});