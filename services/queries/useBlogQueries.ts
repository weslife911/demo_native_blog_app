import { useQuery } from "@tanstack/react-query";
import { useBlogStore } from "@/store/useBlogStore";

export const useGetBlogsQuery = () => {
    const { getBlogs } = useBlogStore();

    return useQuery({
        queryKey: ["blogs"],
        queryFn: () => getBlogs(),
    });
};