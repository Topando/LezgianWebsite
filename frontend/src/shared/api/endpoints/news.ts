import apiClient from "../base";

export interface NewsType {
    id: number;
    name: string;
    slug: string;
    announcement: string;
    image?: string;
    date?: Date;
    place?: string;
    model?: string;
}
export interface DetailNewsType {
    id: number;
    name: string;
    slug?: string;
    announcement: string;
    description: string;
    image?: string;
    date?: Date;
    place?: string;
}

export const detailNewsGet = async(url:string, slug:string) => {
    const response = await apiClient.get(`/${url}/${slug}`);
    return response.data;
}

export const newsGet = async(url:string) => {
    const response = await apiClient.get(`/${url}/`);
    return response.data;
}