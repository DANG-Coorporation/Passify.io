import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import signupValidationSchema from "../../app/signupValidationSchema";
import { VisibilityButton } from "../atoms/visibilityButton";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const submitSignup = () => {
    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        navigate("/choose-role");
      } else {
        console.log("Password not match!");
      }
    } else {
      console.log("Fill the form!");
    }
  };

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
                // value={email}
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
            <label htmlFor="Password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <VisibilityButton/>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confrim Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
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
              onClick={submitSignup}
            >
              <Link to="/choose-role"> Sign Up </Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
