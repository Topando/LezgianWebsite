import apiClient from "../base";

export interface AboutType {
    id: number;
    menu_title: string;
    title: string;
    body: string;
}

export const aboutGet = async() => {
    const response = await apiClient.get('/about/');
    return response.data;
}