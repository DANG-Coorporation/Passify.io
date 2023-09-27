import * as Yup from "yup";

const signupValidationSchema = Yup.object({
  fullName: Yup.string().required("Fullname is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must contain 8 charcters or more")
    .required("Password is required"),
  confirmPassword: Yup.string().test({
    name: "password check",
    exclusive: false,
    params: {},
    message: "Password must be same",
    test: function (value) {
      return value === this.parent.password;
    },
  }),
});

export default signupValidationSchema;
