import apiClient from '../../../common/services/apiClient';


export const fetchAirlines=async ()=>
{
   const response= await apiClient.get("/airlines");
   return response.data;
}

export const fetchAirline=async(id)=>
{
    const response=await apiClient.get(`/airlines/${id}`);
    return response.data;
}

export const createAirline=async(airline)=>
{
    const response=await apiClient.post(`/airlines`,);
    return response.data;
}

export const deletAirline=async(id)=>
{
    const response=await apiClient.delete(`/airlines/${id}`);
    return response.data;
}

export const updateAirline=async(airline,id)=>
{
    const response=await apiClient.put(`/airlines/${id}`,airline);
    return response.data;
}