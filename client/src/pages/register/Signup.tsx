import { Link } from 'react-router-dom';
import './assets/css/Sign.css';
import RejAS1 from './assets/images/1318226.png';
import Logo from './assets/images/logo.png';
import { userSchema } from './Validations/Uservalidation';
import { FormEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checker, setChecker] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkformdata, setCheckformdata] = useState(false);
  const [formdatamsg, setFormdatamsg] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Store reCAPTCHA value
  const [_, setCookies] = useCookies(['burgertoken']);
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const handleRecaptchaChange = (value : any) => {
    // This function will be called when the user solves the reCAPTCHA.
    setRecaptchaValue(value);
  };

  const handsubmit = async (e: FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
    };

    const checkData = await userSchema.isValid(formData);

    setChecker(checkData);

    if (checkData && recaptchaValue) {
      axios
        .post(`${SERVER}/api/register/signup`, { username, email, password })
        .then((response: AxiosResponse<any, any>) => {
          // Get the token from the response
          const token = response.data.token;

          if (token) {
            setCookies('burgertoken', token);
            window.localStorage.setItem('token', token);
            window.location.href = '/';
          }

          // Get Message Response
          setIsSubmitting(false);
          setCheckformdata(true);
          setFormdatamsg(response.data.message);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
          

      <div className="signup-container ">
        <div className="w-[80%] h-full bg-blue-50">
          <div className="float-left md:w-1/2 h-full p-5 ">
            <form action="" id="signupform" onSubmit={handsubmit}>
              <div className='flex items-center space-x-4 '>
                            <Link to="/">
                                <img src={Logo} alt="Logo" width={60} draggable={false} />
                            </Link>
                            <p className='font-bold text-2xl'>
                              <span className='text-orange-500'>BURGER</span>
                              <span className='text-black'>ANIME</span>
                            </p>
                            <h1 className="text-pink-800 font-bold  pl-10 pt-10 uppercase"> Let's go into the world of anime </h1>
              </div>
              
              {!checker ? (
                <span className="text-center text-red-500 block w-[80%] m-auto mt-10 font-mono font-bold">
                  You have entered an invalid email address or the password you have entered is too short and must contain
                  at least 8 characters
                </span>
              ) : null}
              {checkformdata ? (
                <span className="text-center w-[80%] block m-auto text-yellow-600 mt-5 font-mono">{formdatamsg}</span>
              ) : null}
              <div id="settoutaforminput">
                <label>
                  <span>Username</span>
                  <input type="text" placeholder="Username" maxLength={50} required onChange={(e) => setUsername(e.target.value)} />
                </label> <br />
                <label>
                  <span>Email Address</span>
                  <input type="email" placeholder="Email" maxLength={50} required onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                  <span>Password</span>
                  <input type="password" placeholder="Password" maxLength={100} required onChange={(e) => setPassword(e.target.value)} />
                </label> <br />
                <p className="text-center w-[80%] block m-auto text-gray-500 ">
                  By creating an account, you agree to our Terms of Service and Privacy Policy and confirm that you are at
                  least 16 years old.
                </p>
                <label>
                  <ReCAPTCHA
                    className=' ml-14'
                    sitekey="6Lf5qiIoAAAAAPbrHnWcjdum-jTzeddw9e1Pz9DM" // Replace with your reCAPTCHA site key
                    onChange={handleRecaptchaChange}
                  />
                  <button
                    disabled={isSubmitting}
                    className="btn block mt-5 m-auto w-[80%] bg-blue-600 text-white duration-300 hover:bg-pink-500 hover:text-black border-none">
                    Create An Account
                  </button>
                </label>
              </div>

              <div id="aboutothrelogin" className="text-center mt-5 text-black">
                <p>
                  Already have an account ?{' '}
                  <Link to="/signin">
                    <span className="text-pink-500 font-bold">TO LOG IN </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div
            className="md:float-right md:w-1/2 md:h-full  md:bg-cover md:bg-center md:flex hidden"
            style={{ backgroundImage: `url(${RejAS1})` }}>
            <p className="text-8xl text-slate-50 font-bold p-16 pt-96">
              <span className="text-blue-800 bg-slate-100 block">BURGER</span>
              <span className="block text-white">ANIME</span>
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
