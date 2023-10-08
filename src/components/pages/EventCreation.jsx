import axios from "axios";
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";

const EventCreation = () => {
  const [province, setProvince] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        setProvince(response.data);
        console.info(province);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const form = useRef();

  const createEventHandler = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    formData.append("user_id", 1);

    try {
      await axios.post("http://localhost:5001/events", formData);
      alert("Data Berhasil Ditambahkan!");

      e.target.reset();
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan data acara:", error);
      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
      }
    }
  };

  return (
    <section className="bg-gray-100 -mb-[130px]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <h1 style={{ fontSize: "50px", fontFamily: "Poppins" }}>
              Create Your First Event For{" "}
              <p className="text-6xl font-bold text-primaryColor">Free</p>
            </h1>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form
              ref={form}
              onSubmit={createEventHandler}
              className="space-y-4"
            >
              <label
                htmlFor="event-name"
                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <span className="font-medium text-gray-700">Event Name</span>

                <input
                  type="text"
                  id="event-name"
                  name="event_name"
                  placeholder="Event Title"
                  className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  required
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 pb-4">
                <div>
                  <label htmlFor="event-category">Category</label>
                  <select
                    name="event_category"
                    id="event-category"
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    required
                  >
                    <option value="" disabled selected>
                      Choose Category
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="UIUX Design">UIUX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Product Management">
                      Product Management
                    </option>
                  </select>
                </div>{" "}
                <div>
                  <label htmlFor="ticket-type">Ticket Type</label>
                  <select
                    name="ticket_type"
                    id="ticket-type"
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    required
                  >
                    <option value="" disabled selected>
                      Choose Ticket Type
                    </option>
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                    <option value="On The Spot">On The Spot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-4">
                <div>
                  <label htmlFor="start-date">Event Start</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    placeholder="Date"
                    type="Date"
                    name="start_date"
                    id="start-date"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="end-date">Event End</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    placeholder="Date"
                    type="Date"
                    name="end_date"
                    id="end-date"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-4">
                <div>
                  <label htmlFor="location">Location</label>
                  <select
                    name="location"
                    id="location"
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    required
                  >
                    <option value="" disabled selected>
                      Choose Location
                    </option>
                    {province.map(item => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="place">Place</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    placeholder="Place"
                    name="event_place"
                    type="text"
                    id="place"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description">Event Description</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 pb-52 text-sm shadow-md"
                  type="text"
                  name="description"
                  placeholder="Event Description"
                  rows="8"
                  id="description"
                  maxLength="250"
                  cols="50"
                  required
                ></input>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span className="font-medium text-gray-700">
                      {" "}
                      Event Price{" "}
                    </span>

                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="e.g 150000"
                      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      required
                      min="0"
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="quota"
                    className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <span className="font-medium text-gray-700"> Quota </span>

                    <input
                      type="number"
                      id="quota"
                      name="quota"
                      placeholder="e.g 10"
                      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      required
                      min="0"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="event-photo"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Event Photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="photo-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primaryColor focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <input
                          id="event-photo"
                          type="file"
                          accept=".jpg,.jpeg"
                          name="img"
                          required
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      JPG or JPEG 1 MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-primaryColor hover:shadow-2xl px-5 py-3 font-medium text-white sm:w-auto shadow-md"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCreation;
