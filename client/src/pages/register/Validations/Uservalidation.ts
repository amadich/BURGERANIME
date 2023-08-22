import * as Yup from "yup";

const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com"];

export const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test("valid-domain", "Invalid email domain", (value) => {
      // Extract domain from email
      const domain = value.split("@")[1];

      // Check if the domain is in the allowed list
      return allowedDomains.includes(domain);
    }),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const userSchemaSignin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test("valid-domain", "Invalid email domain", (value) => {
      // Extract domain from email
      const domain = value.split("@")[1];

      // Check if the domain is in the allowed list
      return allowedDomains.includes(domain);
    }),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});
