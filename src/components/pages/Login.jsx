import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../app/loginValidationSchema";
// import jwt from "jsonwebtoken";
import Toast from "../molecules/Toast";
// import { constants } from "../../data/constants";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../app/redux/slicer/loginSlicer";
import { useState } from "react";
import { VisibilityButton } from "../atoms/visibilityButton";
import { useEffect } from "react";
import { setAuthorized } from "../../app/redux/slicer/loginSlicer";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const apiState = useSelector((state) => state.login.loading);
  const [isVisible, setVisibility] = useState(false);
  const [isToast, setToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        userLogin({
          email: values.email,
          password: values.password,
        })
      );
      // setEmail
    },
  });

  useEffect(() => {
    console.log(apiState);
    if (apiState === "done") {
      console.log("authorized");
      dispatch(setAuthorized(true));
      navigate("/");
    } else if (apiState === "rejected") {
      setToast(true);
    }
  }, [apiState, dispatch, navigate]);

  // const submitLogin = () => {
  //   if (email && password) {
  //     localStorage.setItem("id", JSON.stringify(true));
  //     navigate("/explore");
  //   } else {
  //     console.log("Fill in the form!");
  //   }
  // };

  return (
    <section className="flex-col lg:h-screen lg:items-center relative h-full">
      <div className="w-full flex flex-wrap lg:h-screen lg:items-center">
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Welcome"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl"> Welcome Back! </h1>

            <p className="mt-4 text-gray-500">
              Welcome back! We're thrilled to have you here. Please log in to
              access your account and unlock a world of exciting event
              experiences.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
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
                  // value={formik.values.email}
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  // }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
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
                  type={isVisible ? "text" : "password"}
                  id="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  // value={password}
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  // }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <VisibilityButton
                    onClick={() => {
                      setVisibility(!isVisible);
                    }}
                    isVisible={isVisible}
                  />
                </span>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-700 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link to="/signup">
                  {" "}
                  <b> Sign Up Here </b>
                </Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                // onClick={submitLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {isToast ? (
          <Toast
            header={"login Failed"}
            caption={"Email or Password is invalid"}
            variant={"error"}
            dismissHandle={setToast}
          />
        ) : null}
      </div>
    </section>
  );
};

export default Login;
