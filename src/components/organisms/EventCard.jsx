import { currencyFormat, dateFormat } from "../../utils/formatter";
import propType from "prop-types";

const EventCard = ({ data }) => {
  const date =
    data?.start_date === data?.end_date
      ? dateFormat(data?.start_date)
      : `${dateFormat(data?.start_date)} - ${dateFormat(data?.end_date)}`;
  const price = data?.price > 0 ? currencyFormat(data?.price) : "Free";
  return (
    <div className="flex w-full flex-col overflow-hidden bg-white shadow-lg rounded-xl h-fit">
      <img
        className="w-full object-cover h-[50%] max-h-[400px]"
        src={data?.img}
        alt=""
      />
      <div className="flex flex-col p-4 gap-y-2">
        <p className="font-medium text-primaryColor text-xl">{price}</p>
        <p className="font-semibold text-black">{data?.eventName}</p>
        <p>{date}</p>
        <p>{data?.event_place}</p>
        <p>{data?.location}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  data: propType.object,
};

export default EventCard;
