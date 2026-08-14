export interface SignupData {
    full_name: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthResponseData {
    success: boolean;
    message: string;
    token?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface UserData {
    _id: string;
    full_name: string;
    username: string;
    email: string;
}

export interface GetUserDataResponse {
    success: boolean;
    user: UserData;
    message?: string;
}

export interface CreateBlogData {
    title: string;
    content: string;
}

export interface CreateBlogResponse {
    success: boolean;
    message: string;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: UserData;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetBlogsDataResponse {
    success: boolean;
    blogs: Blog[];
    message?: string;
}

export interface BlogSummaryResponse {
    success: boolean;
    title: string;
    summary: string;
    message?: string;
}