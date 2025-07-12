import apiClient from "../base";

export interface ProjectsType {
    id: number;
    name: string;
    slug: string;
    announcement: string;
    image: string;
}
export interface DetailProjectType {
    id: number;
    name: string;
    slug: string;
    announcement: string;
    image: string;
}

export const detailProjectGet = async(slug:string) => {
    const response = await apiClient.get(`/our-projects/${slug}`);
    return response.data;
}

export const projectsGet = async() => {
    const response = await apiClient.get('/our-projects/');
    return response.data;
}