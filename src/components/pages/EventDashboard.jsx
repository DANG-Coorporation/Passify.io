import { useEffect, useState } from "react";
import { BackButton } from "../atoms/BackButton";
import Chart from "../molecules/Chart";
import Container from "../atoms/Container";
import { useNavigate } from "react-router-dom";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { currencyFormat, dateFormat } from "../../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardDetail } from "../../app/redux/slicer/dahshboardSlicer";
import { parseToken } from "../../utils/parseToken";
import getEventByUserId from "../../api/getEventByUserId";
import { checkLogin } from "../../utils/checkILogin";

const EventDasboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.dashboard.loading);
  const dashboardDetails = useSelector((state) => state.dashboard.details);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (apiState === "idle" && Object.keys(dashboardDetails).length === 0 && checkLogin()) {
      const user = parseToken(localStorage.getItem("token"));
      dispatch(fetchDashboardDetail(user.id));
    }
  }, [apiState, dispatch, dashboardDetails]);

  // useEffect(() => {
  // }, [dashboardDetails]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const user = parseToken(localStorage.getItem("token"));
        const res = await getEventByUserId(user.id, true);
        const data = await res.data;
        console.log(data.data);
        setEvents([...data.data]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchEvent();
  }, []);

  return (
    <Container>
      <BackButton>Event Dashboard</BackButton>
      <div className="flex gap-4 h-auto min-h-[400px] max-md:flex-wrap">
        <div className="w-full min-w-[400px] bg-white p-5 rounded-xl shadow-lg max-md:min-w-full text-center">
          {Object.keys(dashboardDetails).length > 0 ? (
            <Chart data={dashboardDetails.graph_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
              // interval={1}
              // domain={[0, 13]}
              // tickCount={14}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="ticket_sold" fill="#1450A3" name="Ticket Sold" />
            </Chart>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-xl text-gray-400">
                Opss..there is nothing to display
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between gap-4 min-w-[300px] max-md:w-full max-md:min-w-full">
          <div className="flex-col rounded-lg h-[50%] justify-center items-center text-primaryColor bg-white flex shadow-lg max-md:p-2">
            <h3>Total Income</h3>
            <h1 className="font-semibold text-2xl max-sm:text-lg">
              {apiState === "done" && Object.keys(dashboardDetails).length > 0
                ? currencyFormat(dashboardDetails.tickets_income)
                : 0}
            </h1>
          </div>
          <div className="flex flex-row gap-x-4 bg-none rounded-lg h-[50%]">
            <div className="flex flex-col justify-center items-center h-full w-6/12 rounded-lg text-primaryColor bg-white shadow-lg max-md:p-2">
              <h3>Tickets sold</h3>
              <h1 className="font-semibold text-2xl  max-sm:text-lg">
                {apiState === "done" && Object.keys(dashboardDetails).length > 0
                  ? dashboardDetails.tickets_paid
                  : 0}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center h-full w-6/12 rounded-lg text-primaryColor bg-white shadow-lg max-md:p-2">
              <h3>Total Ticket</h3>
              <h1 className="font-semibold text-2xl  max-sm:text-lg">
                {apiState === "done" && Object.keys(dashboardDetails).length > 0
                  ? dashboardDetails.tickets_quota
                  : 0}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-bold text-2xl mt-10 mb-2">Your Events</h2>
      <div className="max-md:overflow-x-scroll px-3">
        <div className="flex flex-col">
          {events.length > 0 ? (
            events.map((data, idx) => {
              return (
                <div
                  className="flex mb-3 bg-white p-3 items-start cursor-pointer rounded shadow-lg w-full max-md:w-[1000px] max-sm:flex-wrap max-sm:w-full"
                  onClick={() => navigate("" + data.id)}
                  key={idx}
                >
                  <img
                    className="h-24 object-cover w-full max-w-[15%]  max-sm:max-w-[100%] max-sm:w-full max-sm:h-1/2"
                    src={data.img_url}
                    alt="event-img"
                  />
                  <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                    Event Title
                    <span className="w-fit font-semibold">
                      {data.event_name}
                    </span>
                  </p>
                  <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                    Date
                    <span className="w-fit font-semibold">
                      {dateFormat(data.start_date.split(" ")[0])}
                    </span>
                  </p>
                  <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                    Price
                    <span className="w-fit font-semibold">
                      {currencyFormat(data.price)}
                    </span>
                  </p>
                  <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                    Stock
                    <span className="w-fit font-semibold">
                      {data.transaction.length === 0
                        ? 0
                        : data.transaction[0].tickets_sold}
                      /{data.quota}
                    </span>
                  </p>
                  {/* <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Status
                  <span className="w-fit font-semibold">
                    {data.eventStatus ? "Active" : "End"}
                  </span>
                </p> */}
                </div>
              );
            })
          ) : (
            <div className="h-full w-full flex items-center justify-center p-x py-20">
              <span className="text-xl text-gray-400">
                You {"haven't"} created any event yet
              </span>
            </div>
          )}
          {}
        </div>
      </div>
    </Container>
  );
};

export default EventDasboard;
