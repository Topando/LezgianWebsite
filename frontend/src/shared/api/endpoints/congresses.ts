import apiClient from "../base";

export interface CongressesType {
    id: number;
    menu_title: string;
    title: string;
    body: string;
}

export const congressesGet = async() => {
    const response = await apiClient.get('/congresses/');
    return response.data;
}