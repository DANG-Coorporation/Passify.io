import React from "react";
const OrderCard = (props) => {
  const data = props.data;
  return (
    <div className="flex h-[110px] flex-row items-center overflow-hidden bg-white cursor-pointer rounded-xl my-1.5 mx-0 shadow-lg max-md:h-[210px] max-sm:h-[350px] max-sm:flex-col max-sm:w-full ">
      <img
        className="w-2/5 h-full object-cover max-sm:w-full max-sm:h-[150px] max-sm:object-cover"
        src="https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg"
      />
      <div className="flex justify-between w-3/5 h-full py-3 px-5 max-md:flex-wrap max-md:gap-y-2 max-sm:w-full">
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2">
          <p className="font-semibold">{data?.name}</p>
          <p className="font-medium text-primaryColor">{data?.start_date}</p>
          <p>
            {data?.qty}pax<span className="ml-5">IDR {data?.price}</span>
          </p>
        </div>
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2 max-sm:justify-start">
          <p className="font-medium text-primaryColor text-lg">IDR {data?.price * data?.qty}</p>
          {data.status ? (
            <button className="w-24 bg-blue-700 p-1 rounded text-white self-end">Review</button>
          ) : (
            <p className="font-normal text-gray-700 text-sm text-end">
              referral code:
              <br />
              <span className="font-medium text-primaryColor">REFCODE123</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
