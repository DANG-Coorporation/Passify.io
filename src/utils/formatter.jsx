import moment from "moment";

export const dateFormat = (date) => {
  return moment(date, "DD-MM-YYYY HH:mm:ss").format("DD MMM YYYY");
};

export const currencyFormat = (value) => {
  return `IDR ${value.toLocaleString("id-ID")}`;
};
