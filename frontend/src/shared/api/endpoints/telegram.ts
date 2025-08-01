import apiClient from "../base";

export interface TelegramNewsType {
    text: string;
    photo_url: string;
    url?: string;
}

export const TelegramNewsGet = async() => {
    const response = await apiClient.get('/telegram-feed/');
    return response.data;
}