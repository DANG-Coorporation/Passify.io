export const isEventActive = (dateNow, endDate) => {
  console.log(dateNow, endDate);
  return dateNow.valueOf() < endDate.valueOf() ? true : false;
};

export default isEventActive;
