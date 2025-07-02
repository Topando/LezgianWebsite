import apiClient from "../base";

interface DocumentFile {
    title: string,
    file: string
}

export interface Docs {
    title: string,
    description: string,
    documents: DocumentFile[],
    order: number,
}

export const docs = async() => {
    const response = await apiClient.get('/documents/');
    return response.data;
}