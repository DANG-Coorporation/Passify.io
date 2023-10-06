import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormat } from "../../utils/formatter";
import { BackButton } from "../atoms/BackButton";
import Container from "../atoms/Container";
import EventCard from "../organisms/EventCard";
import { AiFillStar } from "react-icons/ai";
import {parseToken} from "../../utils/parseToken"
import { getOrderList } from "../../api/orderList";
import { calculateDiscount } from "../../utils/calculatePrice";
import moment from "moment";


const OrderDetail = () => {
  const params = useParams()
  const [data, setData] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
      async function getData() {
        try{
          const user = parseToken(localStorage.getItem("token"));
          const param = {transaction_id : parseInt(params.orderId)}
          const response = await getOrderList(user.id, param)
          setData(response?.data[0])
        }catch (e){
          console.log(e)
        }
      }
      getData();
    },[])
    const promoCalculation = (promo) => {
      if(promo !== null){
        return calculateDiscount((data?.qty*data?.Event.price), data?.Promotion.discount)
      }else{
        return 0
      }
    }
    console.log(data?.review[0]?.is_edited)
  return (
    <Container>
      <div className="flex mb-5 gap-x-6">
        <div className="container mx-auto min-h-screen">
          <BackButton>Order Details</BackButton>
          <div className="md:grid md:grid-cols-2 gap-5 px-4">
            <div className="max-w-full">
              <EventCard data={data?.Event} />
              {data?.review.length > 0 && (
                <div className="border-2 p-8 rounded-xl shadow-lg mt-5 max-md:mt-5 border-primaryColor">
                  <div className="flex justify-between items-center text-lg font-bold text-primaryColor mb-2">
                    Your Review
                    <div className="flex">
                      <AiFillStar className="mr-1 fill-yellow-500 h-[20px] w-[20px]" />
                      <p className="text-base font-medium">5/5</p>
                    </div>
                  </div>
                  <p>{data?.review[0].comment}</p>
                  <button
                      className="w-27 mt-2 rounded text-primaryColor self-end disabled:opacity-50"
                      onClick={() => {navigate(`review`)}}
                      disabled={data?.review[0]?.is_edited}
                    >
                      Edit Review
                    </button>
                </div>
              )}
            </div>
            <div className="border-2 p-8 rounded-xl shadow-lg max-md:mt-5 border-primaryColor h-max">
              <h1 className="text-lg font-bold text-primaryColor mb-2">
                Price Detail
              </h1>
              <h1 className="font-normal text-base">Full Name</h1>
              <p className="mb-4 text-base font-semibold">
                {data?.name}
              </p>
              <h1 className="font-normal text-base">Email</h1>
              <p className="mb-4 text-base font-semibold">
                {data?.email}
              </p>
              <h1 className="font-normal text-base">Qty</h1>
              <p className="mb-4 text-base font-semibold">
                {data?.qty}
              </p>
              <h1 className="font-normal text-base">Your Referral Code</h1>
              <p className="mb-4 text-base font-semibold text-primaryColor">
                {data?.referral[0].referral_code}
              </p>
              <h1 className="font-normal text-base">Promotion Code</h1>
              <p className="mb-4 text-base font-semibold">
                {data?.promotion_id === null ? "-" : data?.promotion_id}
              </p>
              <div>
                <h3 className="text-md font-bold text-primaryColor mb-2">
                  Price Detail
                </h3>
                <div className="flex flex-wrap justify-between leading-8">
                  <p className="line-clamp-1">
                    Pax x{data?.qty}
                  </p>
                  <p>
                    {currencyFormat(
                      data?.qty *
                        data?.Event.price
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap justify-between">
                  <p>Discount ({data?.Promotion !== null ? data?.Promotion.discount : 0}%)</p>
                  <p>{currencyFormat(promoCalculation(data?.promotion_id))}</p>
                </div>
                <hr className="mt-4 mb-4" />
                <div className="flex flex-wrap justify-between">
                  <div>
                    <p className="text-primaryColor font-semibold">
                      Total Payments
                    </p>
                    <p className="text-primaryColor font-bold text-xl">
                      {currencyFormat(
                        (data?.qty * data?.Event.price) - promoCalculation(data?.promotion_id)
                      )}
                    </p>
                  </div>
                  {data?.review.length === 0 && moment(data?.Event.end_date, "DD-MM-YYYY HH:mm:ss").toDate() < new Date() && (
                    <button
                      className="w-24 bg-primaryColor p-1 rounded text-white self-end"
                      onClick={() => {navigate(`review`)}}
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetail;
