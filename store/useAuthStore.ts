import { AuthResponseData, LoginData, SignupData, UserData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = () => ({
    signup: async (data: SignupData): Promise<AuthResponseData> => {
        const response = await axiosInstance.post("/auth/signup", data);
        if (response.data?.token) {
            await AsyncStorage.setItem("user_jwt", response.data.token);
        }
        return response.data;
    },

    login: async (data: LoginData): Promise<AuthResponseData> => {
        const response = await axiosInstance.post("/auth/login", data);
        if (response.data?.token) {
            await AsyncStorage.setItem("user_jwt", response.data.token);
        }
        return response.data;
    },

    getUserData: async (): Promise<UserData | null> => {
        const user_jwt = await AsyncStorage.getItem("user_jwt");

        if (!user_jwt) {
            return null;
        }

        const response = await axiosInstance.get("/auth/get-user-data", {
            headers: {
                Authorization: `Bearer ${user_jwt}`,
            },
        });

        return response.data.user;
    },

    logout: async () => {
        await AsyncStorage.removeItem("user_jwt");
    }
});