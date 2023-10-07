import React from "react";
import { dateFormat, currencyFormat } from "../../utils/formatter";
import { calculateDiscount } from "../../utils/calculatePrice";
const OrderCard = (props) => {
  const data = props.data;
  const isEventDone = !props.tabBarSelected;
  const promoCalculation = (promo) => {
    if(promo !== null){
      return calculateDiscount((data?.qty*data?.event.price), data?.promotion.discount)
    }else{
      return 0
    }
  }
  return (
    <div
      className="flex h-[110px] flex-row items-center overflow-hidden bg-white cursor-pointer rounded-xl my-1.5 mx-0 shadow-lg max-md:h-[210px] max-sm:h-[350px] max-sm:flex-col max-sm:w-full"
      onClick={props.onClick}
    >
      <img
        className="w-2/5 h-full object-cover max-sm:w-full max-sm:h-[150px] max-sm:object-cover"
        src={data.event?.img}
      />
      <div className="flex justify-between w-3/5 h-full py-3 px-5 max-md:flex-wrap max-md:gap-y-2 max-sm:w-full">
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2">
          <p className="font-semibold">{data.event?.event_name}</p>
          <p className="font-medium text-primaryColor">
            {dateFormat(data.event?.start_date)}
          </p>
          <p>
            {data.qty}pax
            <span className="ml-5">{currencyFormat(data.event?.price)}</span>
          </p>
        </div>
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2 max-sm:justify-start">
          <p className="font-medium text-primaryColor text-lg">
            {currencyFormat(
              data?.qty * data?.event.price -
                promoCalculation(data?.promotion_id)
            )}
          </p>
          {isEventDone ? (
            data.review.length === 0 ? (
              <button
                className="w-24 bg-blue-700 p-1 rounded text-white self-end z-40"
                onClick={props.onClickReview}
              >
                Review
              </button>
            ) : (
              <p className="self-end text-primaryColor">Reviewed</p>
            )
          ) : (
            <p className="font-normal text-gray-700 text-sm text-end">
              referral code:
              <br />
              <span className="font-medium text-primaryColor">
                {data.referral[0]?.referral_code}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
