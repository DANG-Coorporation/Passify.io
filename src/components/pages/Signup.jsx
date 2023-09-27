import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import signupValidationSchema from "../../app/signupValidationSchema";
import { VisibilityButton } from "../atoms/visibilityButton";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../molecules/Toast";
import { userSignup } from "../../app/redux/slicer/signupSlicer";
import { useEffect } from "react";

const SignUp = () => {
  const [passVisibility, setPassVisibility] = useState(false);
  const [confPassVisibility, setConfPassVisibility] = useState(false);
  const [isToast, setToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.signup.loading);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        userSignup({
          name: values.fullName,
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  useEffect(() => {
    console.log(apiState);
    if (apiState === "done") {
      navigate("/login");
    } else if (apiState === "rejected") {
      setToast(true);
    }
  }, [apiState, dispatch, navigate]);

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {" "}
            Create your own Event, Now!{" "}
          </h1>

          <p className="mt-4 text-gray-500">
            Unlock the world of seamless event ticket management and
            unforgettable experiences join us today to register for effortless
            access to your favorite events!
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                id="fullName"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Full Name"
                // value={fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.errors.fullName && formik.touched.fullName ? (
              <div className="text-red-700 text-sm mt-1">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-700 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={passVisibility ? "text" : "password"}
                id="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <VisibilityButton
                  isVisible={passVisibility}
                  onClick={() => {
                    setPassVisibility(!passVisibility);
                  }}
                />
              </span>
            </div>

            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-700 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confrim Password
            </label>

            <div className="relative">
              <input
                type={confPassVisibility ? "text" : "password"}
                id="confirmPassword"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <VisibilityButton
                  isVisible={confPassVisibility}
                  onClick={() => {
                    setConfPassVisibility(!confPassVisibility);
                  }}
                />
              </span>
            </div>

            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className="text-red-700 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Have an Account?
              <Link to="/login">
                {" "}
                <b> Login </b>{" "}
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              // onClick={submitSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {isToast ? (
        <Toast
          header={"SignUp Failed"}
          caption={"Email already registered"}
          variant={"error"}
          dismissHandle={setToast}
        />
      ) : null}
    </section>
  );
};

export default SignUp;
