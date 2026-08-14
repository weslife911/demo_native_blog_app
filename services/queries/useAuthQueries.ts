import { useAuthStore } from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query";


export const useGetUserDataQuery = () => {
    const { getUserData } = useAuthStore();

    return useQuery({
        queryKey: ["get-user-data"],
        queryFn: () => getUserData()
    });
}