import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../app/redux/slicer/eventSlicer";
const FeaturedEvent = () => {
  // const apiState = useSelector((state) => state.event.loading);
  const events = useSelector(state => state.event.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <section className="bg-white pt-32">
        <div className="container mx-auto px-5 text-left">
          <h4 className="font-semibold text-lg text-primaryColor">
            Grow Today
          </h4>
          <h2 className="text-2xl font-bold text-black lg:text-4xl mb-6 lg:mb-10">
            Featured Event
          </h2>
          <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
            {events.map(item => (
              <div
                className="rounded-xl w-full h-full shadow-lg hover:shadow-2xl"
                key={item.id}
              >
                <img
                  className="rounded-t-xl h-[180px] w-full bg-center bg-contain"
                  src={item.img_url}
                  alt="gambar event"
                />
                <div className="px-6 pb-8">
                  <h2 className="font-semibold text-2xl text-primaryColor mt-4 mb-3 line-clamp-2 hover:line-clamp-none">
                    <Link to={`/events/${item.id}`}>{item.event_name}</Link>
                  </h2>
                  <p className="text-slate-600 mb-3 line-clamp-1 hover:line-clamp-none">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap">
                    <img src="" alt="" />
                    <p className="text-slate-600 font-semibold mb-3">
                      {new Date(item.start_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="border-t-slate-200 border-t-2 font-bold text-xl pt-3">
                    {item.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <button className="px-6 py-3 bg-primaryColor text-white rounded-lg mt-5">
                    <Link to={`/events/${item.id}`}>Event Detail</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedEvent;
