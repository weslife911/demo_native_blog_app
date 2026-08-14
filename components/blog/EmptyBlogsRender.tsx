import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

interface EmptyStateProps {
    onPress?: () => void;
    searchQuery?: string;
    selectedCategory?: string;
    onResetFilters?: () => void;
}

export const RenderEmptyState = ({
    onPress,
    searchQuery = '',
    selectedCategory = 'All',
    onResetFilters,
}: EmptyStateProps) => (
    <View style={styles.emptyContainer}>
        <View style={styles.emptyIconWrapper}>
            <Icon name="document-text-outline" size={56} color={COLORS.gray[400]} />
        </View>
        <Text style={styles.emptyTitle}>No Blogs Found</Text>
        <Text style={styles.emptyDescription}>
            {searchQuery || selectedCategory !== 'All'
                ? "We couldn't find any blogs matching your search or category."
                : "There are no blogs available right now. Check back later or create a new post!"}
        </Text>
        {searchQuery || selectedCategory !== 'All' ? (
            <TouchableOpacity
                style={styles.resetButton}
                onPress={onResetFilters}
            >
                <Text style={styles.resetButtonText}>Clear Filters</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => onPress && onPress()} // Safe function check
            >
                <Text style={styles.resetButtonText}>Create First Post</Text>
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
    },
    emptyIconWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.gray[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.black,
        marginBottom: 8,
    },
    emptyDescription: {
        ...TYPOGRAPHY.body2,
        color: COLORS.gray[600],
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: 20,
    },
    resetButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
    },
    resetButtonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
        fontSize: 14,
    },
});