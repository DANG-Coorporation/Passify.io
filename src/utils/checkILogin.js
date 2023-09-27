export const checkLogin = () => {
  const data = localStorage.getItem("token");
  return data === null ? false : true;
};
