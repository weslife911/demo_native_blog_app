import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});