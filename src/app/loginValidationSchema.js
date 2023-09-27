import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(8, "Password must contain 8 charcters or more").required(),
});
