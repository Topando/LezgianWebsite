import apiClient from "../base";

export interface AwardsType {
    id: number,
    title: string,
    slug: string,
    description: string,
    photo: string
}

export interface CandidateType {
    name: string,
    description: string,
    photo: string,
}
export interface AwardsDetailType {
    id: number,
    title: string,
    description: string,
    photo: string,
    candidates: CandidateType[],
}

export const AwardsGet = async() => {
    const response = await apiClient.get('/candidate_awards/');
    return response.data;
}

export const AwardsDetailGet = async(slug:string) => {
    const response = await apiClient.get(`/candidate_awards/${slug}`)
    return response.data
}