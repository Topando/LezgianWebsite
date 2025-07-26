import apiClient from "../base";

export interface Contacts {
    phones: {phone: string}[],
    email: string,
    address: string,
    working_time: string,
}

export const contacts = async() => {
    const response = await apiClient.get('/contacts/');
    return response.data;
}