import apiClient from "../base";

export interface AwardsType {
    id: number,
    name: string,
    slug: string,
    description: string,
    image: string
}

export interface CandidateType {
    name: string,
    description: string,
    photo: string,
}
export interface AwardsDetailType {
    id: number,
    name: string,
    description: string,
    image: string,
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