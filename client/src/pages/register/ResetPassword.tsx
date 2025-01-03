import { FormEvent, useState } from "react";
import { useLocation, useNavigate , Link } from "react-router-dom";
import "./assets/css/Sign.css";
import RejAS1 from "./assets/images/003.png";
import Logo from "./assets/images/logo.png";
import axios, { AxiosResponse } from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [checkFormData, setCheckFormData] = useState<boolean>(false);
  const [formDataMsg, setFormDataMsg] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // Get the reset token from URL

  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const handleSubmit = async (e: FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = {
        token,
        newPassword,
      };

      const response: AxiosResponse = await axios.post(`${SERVER}/api/register/reset-password`, formData);
      setIsSubmitting(false);
      setCheckFormData(true);
      setFormDataMsg(response.data.message);
      setMessage(response.data.message); // Set the response message

      if (response.data.message === "Password reset successfully.") {
        setTimeout(() => {
          navigate("/signin"); // Redirect to login after successful reset
        }, 2000);
      }
    } catch (error) {
      setIsSubmitting(false);
      setMessage("An error occurred while resetting the password.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="w-[80%] h-full bg-blue-50">
          <div className="md:float-right md:w-1/2 h-full">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-4 pl-16 pt-10">
                <Link to="/">
                  <img src={Logo} alt="Logo" width={60} draggable={false} />
                </Link>
                <p className="font-bold text-2xl">
                  <span className="text-orange-300">BURGER</span>
                  <span className="text-black">ANIME</span>
                </p>
                <h1 className="text-green-800 font-bold text-3xl uppercase">Reset Password</h1>
              </div>

              <span className="pl-16 font-mono text-[14px] text-green-800">
                Please enter your new password.
              </span>

              {checkFormData && (
                <span className="text-center w-[80%] block m-auto mt-10 font-mono font-bold">
                  {formDataMsg}
                </span>
              )}

              <div id="settoutaforminput">
              <label className="input input-bordered flex items-center gap-2 bg-orange-500 w-96 m-auto text-center">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 text-black">
                        <path
                           fillRule="evenodd"
                           d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                           clipRule="evenodd" />
                     </svg>
                  <input
                    className="grow bg-white text-black pl-3 rounded-md outline-none" 
                    type="password"
                    placeholder="Enter new password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2 bg-orange-400 w-96 m-auto text-center">
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 text-black">
                        <path
                           fillRule="evenodd"
                           d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                           clipRule="evenodd" />
                     </svg>
                  <input
                     className="grow bg-white text-black pl-3 rounded-md outline-none" 
                    type="password"
                    placeholder="Confirm your new password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <br />

                {message && <span className="text-red-500">{message}</span>}

                <label>
                  <button
                    disabled={isSubmitting}
                    className="btn block mt-5 m-auto w-[80%] bg-blue-600 text-white duration-300 hover:bg-pink-500 hover:text-black border-none"
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </label>
              </div>
            </form>
          </div>

          <div 
                className='md:float-left md:w-1/2 md:h-full  md:bg-cover md:bg-center md:flex hidden  ' 
                style={{backgroundImage: `url(${RejAS1})`}}>
                    <p className='text-8xl text-slate-50 font-bold p-16 pt-96 '>
                      <span className='text-blue-800 bg-slate-100 block '>BURGER</span> 
                      <span className='block text-white'>ANIME</span>
                    </p>
                </div>

        </div>
      </div>
    </>
  );
}
