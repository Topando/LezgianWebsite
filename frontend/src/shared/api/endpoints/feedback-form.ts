import apiClient from "../base";


export const sendFeedback = async (name: string, phone: string, email?: string, message?: string) => {
    try {
        const response = await apiClient.post('/feedback-form/', {
            name,
            email,
            phone,
            message
          });    
          
          return response.data;
    }
    catch(err) {
        console.log(err);
    }
    
}