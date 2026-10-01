import axios from "axios";
import type { Post } from "@/types/general";

export default function postService() {
    const getAllPosts = async (): Promise<Post[]> => {
        const response = await axios.get<Post[]>('/api/admin/posts');
        return response.data;
    }

    const getPublishedPosts = async (): Promise<Post[]> => {
        const response = await axios.get<Post[]>('/api/admin/posts/published');
        return response.data;
    }

    const getPostById = async (id: number): Promise<Post> => {
        const response = await axios.get<Post>(`/api/admin/posts/${id}`);
        return response.data;
    }

    const createPost = async (post: Partial<Post>): Promise<Post> => {
        const response = await axios.post<Post>('/api/admin/posts', post);
        return response.data;
    }

    const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
        const response = await axios.put<Post>(`/api/admin/posts/${id}`, post);
        return response.data;
    }

    const deletePost = async (id: number): Promise<void> => {
        await axios.delete(`/api/admin/posts/${id}`);
    }

    return {
        getAllPosts, getPublishedPosts, getPostById,
        createPost, updatePost, deletePost,
    }
}
