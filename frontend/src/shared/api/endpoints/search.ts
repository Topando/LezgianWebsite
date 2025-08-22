import apiClient from "../base";

export interface SearchType {
    id: number;
    title: string;
    slug: string;
    announcement: string;
    image: string;
    model: string;
}

export const searchGet = async (q: string) => {
    const response = await apiClient.get(`/search/`, {
        params: { q },
    });
    return response.data;
};