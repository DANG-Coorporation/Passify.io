import server from "./apiSettings";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const getReview = async (params) => {
  const response = await server.get(
    `/review`,
    {
      params: params,
      headers: config.headers
    }
  );
  return response.data;
};

export const postReview = async (data) => {
    const response = await server.post('/review',data,config)
    return response.data
}

export const patchReview = async (data) =>{
    const response = await server.patch('/review',data,config)
    return response.data
}