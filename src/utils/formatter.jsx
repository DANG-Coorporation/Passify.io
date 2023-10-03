import moment from "moment";

export const dateFormat = (date) => {
  return moment(date, "DD-MM-YYYY HH:mm:ss").format("DD MMM, YY");
};

export const currencyFormat = (value) => {
  return `IDR ${value.toLocaleString("id-ID")}`;
};
