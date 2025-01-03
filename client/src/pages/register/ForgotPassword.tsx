import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/Sign.css";
import RejAS1 from "./assets/images/001.png";
import Logo from "./assets/images/logo.png";
import axios, { AxiosResponse } from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [checkFormData, setCheckFormData] = useState<boolean>(false);
  const [formDataMsg, setFormDataMsg] = useState<string>("");
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      setMessage("Email is required.");
      setIsSubmitting(false);
      return;
    }

    const formData = { email };

    try {
      const response: AxiosResponse = await axios.post(`${SERVER}/api/register/forgot-password`, formData);
      setIsSubmitting(false);
      setCheckFormData(true);
      setFormDataMsg(response.data.message);
      setMessage(response.data.message); // Set the response message
    } catch (error) {
      setIsSubmitting(false);
      setMessage("An error occurred while sending the reset link.");
      console.error(error);
    }
  };

  return (
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
              <h1 className="text-green-800 font-bold text-3xl uppercase">Forgot Password</h1>
            </div>

            <span className="pl-16 font-mono text-[14px] text-green-800">
              Please enter your email to receive a password reset link.
            </span>

            {checkFormData && (
              <span className="text-center w-[80%] block m-auto mt-10 font-mono font-bold">
                {formDataMsg}
              </span>
            )}

            {message && (
              <div className="text-center text-red-600 mt-4">
                <p>{message}</p>
              </div>
            )}

            <div id="settoutaforminput">
            <label className="input input-bordered flex items-center gap-2 bg-orange-500 w-96 m-auto text-center">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 16 16"
                           fill="currentColor"
                           className="h-4 w-4 opacity-70 text-black">
                           <path
                              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                           <path
                              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input 
                              type="email" 
                              className="grow bg-white text-black pl-3 rounded-md outline-none" 
                              placeholder="Email"
                              required
                              onChange={(e) => setEmail(e.target.value)} />
                  </label>
             
              <br />

              <label>
                <button
                  disabled={isSubmitting}
                  className="btn block mt-5 m-auto w-[80%] bg-blue-600 text-white duration-300 hover:bg-pink-500 hover:text-black border-none"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </label>
            </div>

            <div id="aboutothrelogin" className="text-center mt-5 text-black">
              <p>
                Back to login?{" "}
                <Link to="/signin">
                  <span className="text-pink-500 font-bold">Sign In</span>
                </Link>
              </p>
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
  );
}
