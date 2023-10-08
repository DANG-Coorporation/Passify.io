import server from "./apiSettings";

const checkPromo = (eventId, promoCode, dateNow) => {
  return server.get("/promotion-validation", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      event_id: eventId,
      promo_code: promoCode,
      date_now: dateNow,
    },
  });
};

export default checkPromo;
