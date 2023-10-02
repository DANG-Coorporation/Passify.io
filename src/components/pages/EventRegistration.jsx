import EventCard from "../organisms/EventCard";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../../app/redux/slicer/eventSlicer";
import jwtDecode from "jwt-decode";
import checkPromo from "../../api/checkPromo";
import { calculateDiscount, calculatePrice } from "../../utils/calculatePrice";
import { PromoInputRightItem } from "../atoms/PromoInputLeftItem";
import postTransaction from "../../api/postTransaction";
import { parseToken } from "../../utils/parseToken";
import moment from "moment/moment";
import Toast from "../molecules/Toast";

const EventRegistration = () => {
  const eventDetail = useSelector((state) => state.event.event);
  const [apiState, setApiState] = useState("idle");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountVal, setDiscountVal] = useState(0);
  const [promoId, setPromoId] = useState(0);
  const [isToast, setToast] = useState(false);
  const [apiResponse, setResponse] = useState({});
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      qty: 1,
      promoCode: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      promoCode: Yup.string(),
      qty: Yup.number()
        .min(1, "Min ticket is 1")
        .max(4, "Max ticket is 4")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const user = parseToken(localStorage.getItem("token"));
      try {
        const res = await postTransaction({
          user_id: user.id,
          event_id: param.id,
          promotion_id: promoId < 1 ? null : promoId,
          email: values.email,
          qty: values.qty,
          name: values.fullName,
          buy_date: moment().format(),
          isTransactionCompleted: false,
        });
        setResponse(await res.data);
        setTimeout(() => {
          navigate("/order-list");
        }, 3000);
      } catch (e) {
        console.log(e.response.data);
        setResponse(e.response.data);
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    formik.setFieldValue("fullName", user.name);
    formik.setFieldValue("email", user.email);
    dispatch(fetchEventById(param.id));
  }, [dispatch, param]);

  useEffect(() => {
    setDiscountVal(calculateDiscount(eventDetail.price, discount));
  }, [discount, eventDetail]);

  useEffect(() => {
    if (apiResponse.status) {
      setToast(true);
    }
  }, [apiResponse]);
  const validatePromo = async () => {
    setApiState("pending");
    try {
      const res = await checkPromo(eventDetail.id, code, moment().format());
      const payload = await res.data;
      console.log(payload.data);
      const {
        isValid,
        detail: { discount, id },
      } = payload.data;

      if (isValid) {
        setApiState("done");
        setDiscount(discount);
        setPromoId(id);
      } else {
        setApiState("rejected");
      }
    } catch (e) {
      setApiState("rejected");
    }
  };

  const generateButtonText = (state) => {
    if (state === "idle" || state === "rejected") {
      return "Apply";
    } else if (state === "done") {
      return "Remove";
    }
  };

  return (
    <>
      <section className="pt-14 relative">
        <div className="container mx-auto min-h-screen">
          <div className="md:grid md:grid-cols-2 gap-5 px-4">
            <div className="max-w-full">
              <EventCard data={eventDetail} />
            </div>
            <div className="border-2 p-8 rounded-xl shadow-lg max-md:mt-5 border-primaryColor">
              <form onSubmit={formik.handleSubmit}>
                <label
                  className="flex flex-col mb-4 text-lg font-semibold"
                  htmlFor="fullName"
                >
                  Full Name
                  <input
                    id="fullName"
                    className="font-normal text-base border-gray-200 border p-2 rounded-lg"
                    type="text"
                    placeholder="Input Full Name Here!"
                    onChange={(event) => {
                      formik.setFieldValue("fullName", event.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </label>
                <label
                  className="flex flex-col mb-4 text-lg font-semibold"
                  htmlFor="email"
                >
                  Email
                  <input
                    id="email"
                    className="font-normal text-base border-gray-200 border p-2 rounded-lg"
                    type="email"
                    placeholder="Input Email Here!"
                    onChange={(event) => {
                      formik.setFieldValue("email", event.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </label>
                <div>
                  <label
                    className="mb-2 text-lg font-semibold"
                    htmlFor="Quantity"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center gap-1 mb-4">
                    <button
                      type="button"
                      className="w-8 h-8 leading-10 text-white rounded-lg bg-primaryColor hover:bg-blue-700"
                      onClick={() =>
                        formik.values.qty > 1 &&
                        formik.setFieldValue("qty", formik.values.qty - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      id="qty"
                      type="number"
                      className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.qty}
                      disabled
                    />

                    <button
                      type="button"
                      className="w-8 h-8 leading-10 text-white text-center rounded-lg bg-primaryColor hover:bg-blue-700"
                      onClick={() =>
                        formik.values.qty < 4 &&
                        formik.setFieldValue("qty", formik.values.qty + 1)
                      }
                    >
                      +
                    </button>
                    {formik.touched.qty && formik.errors.qty ? (
                      <div className="text-red-700 text-sm">
                        {formik.errors.qty}
                      </div>
                    ) : null}
                  </div>
                  <label
                    className="flex flex-col mb-4 text-lg font-semibold"
                    htmlFor="promoCode"
                  >
                    Promo Code
                    <div className="flex md:flex-col md:items-end lg:flex-row lg:items-center w-full justify-between">
                      <div className="flex justify-evenly w-full items-center border-gray-200 border rounded-lg px-2 flex-grow mr-2 md:mr-0 md:mb-2 lg:mb-0 lg:mr-2">
                        <input
                          id="promoCode"
                          className="font-normal text-base p-2 rounded-lg md:mb-2 lg:mb-0 w-full outline-none"
                          type="text"
                          placeholder="Input Promo or Referral Code Here"
                          onChange={(event) => {
                            if (
                              apiState === "done" ||
                              apiState === "rejected"
                            ) {
                              setApiState("idle");
                              setDiscount(0);
                              setDiscountVal(0);
                              setPromoId(0);
                            }
                            setCode(event.target.value);
                          }}
                          value={code}
                        />
                        <PromoInputRightItem status={apiState} />
                      </div>

                      <button
                        type="button"
                        className="bg-primaryColor text-white rounded-lg px-4 shadow-lg font-normal text-base h-10 text-md align-middle w-28 hover:bg-blue-700"
                        onClick={() => {
                          if (apiState === "done") {
                            setCode("");
                            setApiState("idle");
                            setDiscount(0);
                            setDiscountVal(0);
                            setPromoId(0);
                          } else {
                            validatePromo();
                          }
                        }}
                      >
                        {generateButtonText(apiState)}
                      </button>
                    </div>
                    {apiState === "rejected" ? (
                      <div className="text-red-700 text-sm">
                        {"Code is invalid"}
                      </div>
                    ) : null}
                  </label>
                  <div>
                    <h3 className="text-md font-bold text-primaryColor mb-2">
                      Price Detail
                    </h3>
                    <div className="flex flex-wrap justify-between leading-8">
                      <p className="line-clamp-1">Pax x{formik.values.qty}</p>
                      <p>
                        IDR{" "}
                        {(eventDetail.price * formik.values.qty).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <p>Discount</p>
                      <p>
                        IDR{" "}
                        {`${discountVal.toLocaleString(
                          "id-ID"
                        )} (${discount}%)`}
                      </p>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <div className="flex flex-wrap justify-between">
                      <div>
                        <p className="text-primaryColor font-semibold">
                          Total Payments
                        </p>
                        <p className="text-primaryColor font-bold text-2xl">
                          {eventDetail?.price > 0
                            ? `IDR ${calculatePrice(
                                eventDetail.price,
                                discountVal,
                                formik.values.qty
                              ).toLocaleString("id-ID")}`
                            : "Free"}
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="bg-primaryColor text-white rounded-lg px-4 shadow-lg w-28 hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isToast ? (
          <Toast
            header={"Transaction"}
            caption={apiResponse.message}
            variant={apiResponse.status === 200 ? "success" : "error"}
            dismissHandle={setToast}
          />
        ) : null}
      </section>
    </>
  );
};

export default EventRegistration;
