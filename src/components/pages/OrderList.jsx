import React, { useState, useEffect } from "react";
import Container from "../atoms/Container";
import { BackButton } from "../atoms/BackButton";
import OrderCard from "../organisms/OrderCard";
import { useNavigate, useParams } from "react-router-dom";
import {parseToken} from "../../utils/parseToken"
import { getOrderList } from "../../api/orderList";

const OrderList = () => {
  const [tabBarSelected, setTabBarSelected] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      try{
        const user = parseToken(localStorage.getItem("token"));
        const params = {event_status : tabBarSelected ? "ordered" : "done"}
        const response = await getOrderList(user.id, params)
        setData(response?.data)
      }catch (e){
        console.log(e)
      }
    }
    getData();
  }, [tabBarSelected]);

  const onClickOrderList = () => {
    setTabBarSelected(true);
  };
  const onClickDone = () => {
    setTabBarSelected(false);
  };
  const navigate = useNavigate();
  const param = useParams();

  return (
    <Container>
      <BackButton>Your Orders</BackButton>
      <div className="flex mb-5 gap-x-6">
        <button
          className={
            !tabBarSelected
              ? "bg-transparent font-semibold"
              : "bg-transparent font-semibold text-primaryColor border-b-2 border-primaryColor"
          }
          onClick={() => onClickOrderList()}
        >
          Purchased
        </button>
        <button
          className={
            tabBarSelected
              ? "bg-transparent font-semibold"
              : "bg-transparent font-semibold text-primaryColor border-b-2 border-primaryColor"
          }
          onClick={() => onClickDone()}
        >
          Done
        </button>
      </div>
      {data?.map((dt, idx) => {
        return (
          <OrderCard
            key={idx}
            data={dt}
            tabBarSelected={tabBarSelected}
            onClick={()=> navigate(`${dt.id}`)}
            onClickReview={(e) => {e.stopPropagation(); navigate(`${dt.id}/review`)}}
          />
        );
      })}
    </Container>
  );
};

export default OrderList;
