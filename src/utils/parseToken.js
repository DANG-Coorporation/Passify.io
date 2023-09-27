// import { constants } from "../data/constants";
import jwtDecode from "jwt-decode";

export const parseToken = (token = "") => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.log(e.toString());
  }
};
