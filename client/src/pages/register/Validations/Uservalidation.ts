import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test("valid-domain", "Invalid email domain", (value) => {
      // Regular expression to match the domain part of the email
      const domainRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return domainRegex.test(value || "");
    }),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});


export const userSchemaSignin = Yup.object().shape({
   email: Yup.string()
     .email("Invalid email format")
     .required("Email is required")
     .test("valid-domain", "Invalid email domain", (value) => {
       // Regular expression to match the domain part of the email
       const domainRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
       return domainRegex.test(value || "");
     }),
   password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
 });
 