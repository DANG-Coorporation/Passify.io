import React from "react";
import { useEffect } from "react";
import { deletePromo, getActivePromo } from "../../api/promo";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { dateFormat } from "../../utils/formatter";
const PromoCard = (props) => {
  // const promo = props.data[0]
  const [promo, setPromo] = useState(null)
  const params = useParams()
  useEffect(()=>{
    const getData = async() => {
      const param = { event_id: params.eventId }
      const response = await getActivePromo(param)
      setPromo(response.data)
    }
    getData()
  },[])
  const removeHandler = async() => {
    try{
      const response = await deletePromo(promo.id)
      if(response.status === 200){
        setPromo(null)
      }
    }catch (e){
      console.log(e)
    }
  }
  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-lg h-fit">
      <p className="flex justify-between my-2 text-primaryColor font-semibold">
        Promotion Code
        {promo !== null ? (
          <span className="text-red-700 font-normal cursor-pointer" onClick={removeHandler}>Remove</span>
        ) : (
          <button
            className="bg-primaryColor hover:bg-primaryColor text-white font-normal py-1 px-4 rounded ml-3"
            onClick={props.onClickAddPromo}
          >
            Add
          </button>
        )}
      </p>
      {promo !== null ? (
        <>
          <p className="text-black my-2 font-semibold">{promo?.promo_code}</p>
          <p className="flex justify-between">
            {dateFormat(new Date(promo?.start_date))}<br/> 
            {` - ${dateFormat(new Date(promo?.end_date))}`} 
            <span>Quota: {promo?.used_promo}/{promo?.quota}</span>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default PromoCard;
