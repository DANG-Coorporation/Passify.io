import server from "./apiSettings";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const getActivePromo = async (params) => {
  const response = await server.get(
    '/promotion',
    {
      params: params,
      headers: config.headers
    }
  );
  return response.data;
};

export const postPromo = async (data) => {
    const response = await server.post('/promotion',data,config)
    return response.data
}

export const deletePromo = async (promoId) =>{
    const response = await server.delete(`/promotion/${promoId}`)
    return response.data
}