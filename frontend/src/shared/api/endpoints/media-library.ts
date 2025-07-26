import apiClient from "../base";

export interface MediaLibType {
    image: string;
}

export const MediaLibGet = async() => {
    const response = await apiClient.get('/media-library/');
    return response.data;
}