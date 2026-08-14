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
import { TYPOGRAPHY } from '../../constants/theme';
import { COLORS, SHADOWS } from '../../constants/colors';
import Button from '../../components/common/Button';
import { useGetUserDataQuery } from '@/services/queries/useAuthQueries';

export default function ProfileScreen() {
    const { data: user, isLoading } = useGetUserDataQuery();

    const renderLoader = () => (
        <View style={styles.loaderContainer}>
            <View style={styles.loaderCard}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loaderText}>Loading profile...</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.headerActions}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity>
                        <Icon name="settings-outline" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                renderLoader()
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Profile Info */}
                    <View style={styles.profileContainer}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.editAvatarButton}>
                                <Icon name="camera-outline" size={16} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.fullName}>{user?.full_name || 'User'}</Text>
                        <Text style={styles.username}>@{user?.username || 'username'}</Text>

                        <View style={styles.profileActions}>
                            <Button
                                title="Edit Profile"
                                onPress={() => { }}
                                variant="outline"
                                style={styles.editButton}
                                textStyle={styles.editButtonText}
                            />
                            <Button
                                title="Share Profile"
                                onPress={() => { }}
                                style={styles.shareButton}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.black,
    },
    // Loader Styles
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
    profileContainer: {
        backgroundColor: COLORS.white,
        margin: 24,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        ...TYPOGRAPHY.h1,
        color: COLORS.white,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    fullName: {
        ...TYPOGRAPHY.h3,
        color: COLORS.black,
        marginBottom: 4,
    },
    username: {
        ...TYPOGRAPHY.body1,
        color: COLORS.gray[500],
        marginBottom: 12,
    },
    bio: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray[100],
        marginBottom: 20,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
    },
    statLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray[500],
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.gray[200],
    },
    profileActions: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    editButton: {
        flex: 1,
        borderColor: COLORS.gray[300],
    },
    editButtonText: {
        color: COLORS.gray[700],
    },
    shareButton: {
        flex: 1,
    },
    blogsSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h4,
        color: COLORS.black,
    },
    seeAll: {
        ...TYPOGRAPHY.body2,
        color: COLORS.primary,
        fontWeight: '500',
    },
});