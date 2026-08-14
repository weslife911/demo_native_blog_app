import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDataQuery = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: useAuthStore().getUserData,
        retry: (failureCount, error) => {
            if (error.message === "No token found") return false;
            return failureCount < 3;
        },
    });
};