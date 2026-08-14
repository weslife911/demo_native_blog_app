import { useAuthStore } from "@/store/useAuthStore"
import { LoginData, SignupData } from "@/types/types";
import { useMutation } from "@tanstack/react-query"

export const useSignupMutation = () => {
    const { signup } = useAuthStore();

    return useMutation({
        mutationKey: ["signup"],
        mutationFn: (data: SignupData) => signup(data)
    });
}

export const useLoginMutation = () => {
    const { login } = useAuthStore();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: LoginData) => login(data)
    });
}

export const useLogoutMutation = () => {
    const { logout } = useAuthStore();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: () => logout()
    });
}