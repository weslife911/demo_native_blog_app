import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogSummaryResponse, CreateBlogData } from "@/types/types";
import { useBlogStore } from "@/store/useBlogStore";

export const useCreateBlogMutation = () => {
    const queryClient = useQueryClient();
    const { createBlog } = useBlogStore();

    return useMutation({
        mutationKey: ["create-blog"],
        mutationFn: (data: CreateBlogData) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useSummarizeBlogMutation = () => {

    const { summarizeBlog } = useBlogStore();

    return useMutation<BlogSummaryResponse, Error, string>({
        mutationKey: ["summarize-blog"],
        mutationFn: (blogId: string) => summarizeBlog(blogId),
    });
};