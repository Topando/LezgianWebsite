import apiClient from "../base";

export interface ReportsType {
    id: number;
    menu_title: string;
    title: string;
    body: string;
}

export const reportsGet = async() => {
    const response = await apiClient.get('/reports/');
    return response.data;
}