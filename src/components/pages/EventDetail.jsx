import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchEventById } from "../../app/redux/slicer/eventSlicer";
const EventDetail = () => {
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) => state.event.event);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchEventById(params.id));
  }, [dispatch, params]);

  return (
    <>
      <section className="pt-14">
        <div className="container mx-auto">
          <div className="flex flex-wrap md:grid md:grid-cols-2 gap-5 pt-2 md:pt-6 -mb-6 px-4">
            <div className="w-full">
              <img
                src={eventDetails.img_url}
                alt="gambar event"
                className="rounded-xl hover:drop-shadow-2xl"
              />
            </div>
            <div>
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <h2 className="text-2xl font-bold mb-7 text-primaryColor">
                    Event Detail
                  </h2>
                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-lg font-medium text-gray-900">
                      Judul Kegiatan
                    </dt>
                    <dd className="text-md text-gray-700 sm:col-span-2">
                      {eventDetails.event_name}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-lg font-medium text-gray-900">
                      Deskripsi
                    </dt>
                    <dd className="text-md text-gray-700 sm:col-span-2">
                      {eventDetails.description}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-lg font-medium text-gray-900">
                      Tanggal
                    </dt>
                    <dd className="text-md text-gray-700 sm:col-span-2">
                      {new Date(eventDetails.start_date).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-lg font-medium text-gray-900">Biaya</dt>
                    <dd className="text-md text-gray-700 sm:col-span-2">
                      {eventDetails.price
                        ? eventDetails.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                        : "Loading price..."}
                    </dd>
                  </div>
                </dl>
              </div>
              <button className="bg-primaryColor text-white rounded-lg py-2 px-28 hover:shadow-2xl mt-9">
                <Link to={`/events/${eventDetails.id}/registration`}>
                  Beli Tiket
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetail;
