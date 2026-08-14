import { Blog, BlogSummaryResponse, CreateBlogData, CreateBlogResponse, GetBlogsDataResponse } from "@/types/types";
import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "@/utils/axiosInstance";

export const useBlogStore = create(() => ({
    getBlogs: async (): Promise<Blog[]> => {
        const user_jwt = await AsyncStorage.getItem("user_jwt");

        if (!user_jwt) {
            throw new Error("No token found");
        }

        const response = await axiosInstance.get<GetBlogsDataResponse>("/blog/get-blogs", {
            headers: {
                Authorization: `Bearer ${user_jwt}`,
            },
        });

        return response.data.blogs;
    },

    createBlog: async (data: CreateBlogData): Promise<CreateBlogResponse> => {
        const user_jwt = await AsyncStorage.getItem("user_jwt");

        if (!user_jwt) {
            throw new Error("No token found");
        }

        const response = await axiosInstance.post<CreateBlogResponse>("/blog/create-blog", data, {
            headers: {
                Authorization: `Bearer ${user_jwt}`,
            },
        });

        return response.data;
    },

    summarizeBlog: async (blogId: string): Promise<BlogSummaryResponse> => {
        const user_jwt = await AsyncStorage.getItem("user_jwt");

        if (!user_jwt) {
            throw new Error("No token found");
        }

        const response = await axiosInstance.get<BlogSummaryResponse>(`/blog/${blogId}/summarize`, {
            headers: {
                Authorization: `Bearer ${user_jwt}`,
            },
        });

        return response.data;
    }
}));