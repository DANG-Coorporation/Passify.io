import { useFormik } from "formik";
import * as Yup from "yup";
import { postPromo } from "../../api/promo";
import { useParams } from "react-router-dom";
const ModalPromo = (props) => {
  const today = new Date().toISOString().slice(0, 10);
  const params = useParams()
  const formik = useFormik({
    initialValues: {
      promoName: "",
      startDate: today,
      endDate: "",
      discount: "",
      quota: "",
    },
    validationSchema: Yup.object({
      promoName: Yup.string().required("Required"),
      startDate: Yup.date().min(today, "Date must be greater equals today").required("Required"),
      endDate: Yup.date()
        // .min(startDate.value, "Date must be after start date")
        .when(
          "startDate",
          (startDate, schema) =>
            startDate &&
            schema.min(startDate, "Expiry date must be after Issue date.")
        )
        .required("Required"),
      discount: Yup.number()
        .min(1, "Number must be greater than 0")
        .required("Required"),
      quota: Yup.number()
        .min(1, "Number must be greater than 0")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const formValues = {
          event_id: params.eventId,
          promo_code: values.promoName,
          start_date: values.startDate,
          end_date: values.endDate,
          discount: values.discount,
          quota: values.quota
        }
        const response = await postPromo(formValues)
        window.location.reload();
      } catch (e) {
        console.log(e)
      }
    },
  });
  
  return (
    <div className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black bg-opacity-25 z-50">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-screen max-w-md flex flex-col bg-white rounded-xl gap-4 p-8 min-w-fit box max-sm:w-[100%]">
          <h2 className="font-semibold text-primaryColor text-2xl">
            Promotion
          </h2>
          <label className="p-0 m-0 flex flex-col">
            Promotion Code
            <input
              id="promoName"
              className="rounded p-2 border w-full"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.promoName}
            />
            {formik.touched.promoName && formik.errors.promoName ? (
              <div className="text-red-700 text-sm">{formik.errors.promoName}</div>
            ) : null}
          </label>
          <label className="p-0 m-0 flex flex-col">
            Start Date
            <input
              id="startDate"
              className="rounded p-2 border"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-red-700 text-sm">{formik.errors.startDate}</div>
            ) : null}
          </label>
          <label className="p-0 m-0 flex flex-col">
            End Date
            <input
              id="endDate"
              className="rounded p-2 border"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-red-700 text-sm">{formik.errors.endDate}</div>
            ) : null}
          </label>
          <label className="p-0 m-0 flex flex-col">
            Discount (%)
            <input
              id="discount"
              className="rounded p-2 border"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discount}
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-700 text-sm">{formik.errors.discount}</div>
            ) : null}
          </label>
          <label className="p-0 m-0 flex flex-col">
            Quota
            <input
              id="quota"
              className="rounded p-2 border"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quota}
            />
            {formik.touched.quota && formik.errors.quota ? (
              <div className="text-red-700 text-sm">{formik.errors.quota}</div>
            ) : null}
          </label>
          <div className="flex w-full justify-end gap-x-3">
            <button
              className=
                {!formik.dirty && formik.isValid ?
                  "bg-transparent cursor-not-allowed opacity-50 text-primaryColor font-normal py-1 px-4 border border-primaryColor rounded" :
                  "bg-transparent hover:bg-primaryColor text-primaryColor font-normal hover:text-white py-1 px-4 border border-primaryColor hover:border-transparent rounded" 
                }
              type="submit"
              disabled={!formik.dirty && formik.isValid}
            >
              {/* {console.log(formik.dirty)} */}
              Add
            </button>
            <button
              className="bg-primaryColor hover:bg-primaryColor text-white font-normal py-1 px-4 rounded"
              onClick={props.onClickCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalPromo;
