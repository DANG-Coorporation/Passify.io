import { useEffect } from "react";
import { BackButton } from "../atoms/BackButton";
import Chart from "../molecules/Chart";
import EventCard from "../organisms/EventCard";
import Container from "../atoms/Container";
import ModalPromo from "../organisms/ModalPromo";
import { useState } from "react";
import PromoCard from "../organisms/PromoCard";
import { useParams } from "react-router-dom";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { currencyFormat } from "../../utils/formatter";
import { getTransactionDashboard } from "../../api/getDashboardDetail";
import getEventById from "../../api/getEventsById";
currencyFormat;

const EventDashboardDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [promoData, setPromoData] = useState([]);
  const param = useParams();
  useEffect(() => {
    const getEvents = async () => {
      try {
        let response = await getEventById(param.eventId);
        let response2 = await getTransactionDashboard(param.eventId);
        const transaction_list = response2.data.data.transactions;
        const eventDetail = response.data.data;
        console.log(eventDetail);
        setTableData(transaction_list);
        setData(eventDetail);
      } catch (e) {
        return e;
      }
    };
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    getEvents();
  }, [param.eventId]);
  return (
    <Container>
      <BackButton>Event Dashboard Details</BackButton>
      <div className="flex w-full gap-4 mb-8 max-md:flex-wrap">
        <div className="flex flex-col w-[65%] min-h-[40%] max-h-fit justify-between items-center max-md:w-full">
          <div className="w-full h-[90%] bg-white p-2 rounded-xl shadow-lg max-md:h-[300px]">
            <Chart data={tableData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qty" fill="#1450A3" />
            </Chart>
          </div>
          {/* <div className="flex w-full justify-end gap-x-4 mt-4 max-md:justify-center">
            <button className="bg-primaryColor text-white font-normal py-1 px-4 rounded">
              Edit Event
            </button>
            <button className="bg-transparent hover:bg-red-700 text-red-700 font-normal hover:text-white py-1 px-4 border border-red-700 hover:border-transparent rounded">
              Delete Event
            </button>
          </div> */}
        </div>
        <div className="flex flex-col w-[35%] gap-y-4 min-h-[45%] max-md:w-full max-h-fit h-fit">
          <EventCard data={data} />
          <PromoCard
            onClickAddPromo={() => setModalOpen(true)}
            data={promoData}
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Transaction</h2>
      <div className="block overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Date</th>
              <th className="px-4 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">Email</th>
              <th className="px-4 py-2 text-start">Qty</th>
              <th className="px-4 py-2 text-start">Promo Code</th>
              <th className="px-4 py-2 text-start">Price</th>
              <th className="px-4 py-2 text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((dt, idx) => {
              console.log(dt);
              return (
                <tr key={idx}>
                  <td className="px-4 py-2 text-start w-30">{dt.buy_date}</td>
                  <td className="px-4 py-2 text-start">{dt.name}</td>
                  <td className="px-4 py-2 text-start">{dt.email}</td>
                  <td className="px-4 py-2 text-start">{dt.qty}</td>
                  <td className="px-4 py-2 text-start">
                    {dt.promotion === null ? "-" : dt.promotion.promo_code}
                  </td>
                  <td className="px-4 py-2 text-start">
                    {currencyFormat(dt.event.price)}
                  </td>
                  <td className="px-4 py-2 text-start">
                    {currencyFormat(dt.bill)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modalOpen && <ModalPromo onClickCancel={() => setModalOpen(false)} />}
    </Container>
  );
};

export default EventDashboardDetails;
