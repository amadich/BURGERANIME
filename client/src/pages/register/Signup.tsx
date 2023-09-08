import { Link } from 'react-router-dom';
import './assets/css/Sign.css';
import RejAS1 from "./assets/images/1318226.png";
import Logo from "./assets/images/logo.png";

import { userSchema } from "./Validations/Uservalidation";
import { FormEvent, useState } from 'react';
import axios , { AxiosResponse } from 'axios';
import { useCookies } from "react-cookie";

export default function Signup() {

  
  

  const [username , setUsername] = useState<String>("");
  const [email , setEmail] = useState<String>("");
  const [password , setPassword] = useState<String>("");
  const [checker , setChecker] = useState<boolean>(true);
  const [isSubmitting , setIsSubmitting] = useState<boolean>(false);
  const [checkformdata,setCheckformdata] = useState<boolean>(false);
  const [formdatamsg,setFormdatamsg] = useState<string>("");
  const [_,setCookies] = useCookies(["burgertoken"]);


  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const handsubmit = async (e : FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = {
      username,
      email,
      password
    };

    const checkData = await userSchema.isValid(formData); 
    
    setChecker(checkData)
    
    
    

    if (checkData) {
      

      axios.post(`${SERVER}/api/register/signup`, {username , email , password})
      .then((response : AxiosResponse<any, any> ) => {

            
            
          // Get the token from the response
          const token = response.data.token;

          if (token) {
            setCookies("burgertoken",token);
            window.localStorage.setItem("token", token);
            window.location.href = "/";
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
       
      })

      


    }

    else {
      setIsSubmitting(false);
      
    }
    
    
  }

  return (
   <>

            <header className='block m-auto text-center h-16'>
                <Link to="/">
                    <img src={Logo} alt="Logo" width={60} className='m-auto mt-5' draggable={false} />
                </Link>
            </header>

        <div className="signup-container">
          {/* Your signup form or content goes here */}

        
          
          <div className='w-[80%] h-full  bg-blue-50 '>
                
                <div className='float-left md:w-1/2 h-full'>
                    
                      
                      <form action="" id='signupform' onSubmit={handsubmit}>

                        <h1 className='text-blue-800 font-bold text-3xl pl-16 pt-10 uppercase '> ♦ Create an account </h1>
                            {
                              !checker ? <span className='text-center text-red-500 block w-[80%] m-auto mt-10 font-mono font-bold'>You have entered an invalid email address or the password you have entered is too short and must contain at least 8 characters</span> : null
                            }

                            {
                              checkformdata ? <span className='text-center w-[80%] block m-auto text-yellow-600 mt-5 font-mono'>{formdatamsg}</span> : null
                            }
                              <div id='settoutaforminput'>
                                      <label>
                                        <span>Username</span>
                                      <input type="text" placeholder='Username' maxLength={50}  required onChange={(e) => {setUsername(e.target.value)}} />  
                                      </label> <br/>
                                      <label>
                                        <span>Email Adress</span>
                                      <input type="email" placeholder='Email' maxLength={50} required onChange={(e) => {setEmail(e.target.value)}} />   
                                      </label><br />
                                      <label>
                                        <span>Password</span>
                                      <input type="password" placeholder='Password' maxLength={100} required onChange={(e) => {setPassword(e.target.value)}} />
                                      </label> <br />

                                      <p className='text-center w-[80%] block m-auto text-gray-500 '>
                                          By creating an account, you agree to our Terms of Service and Privacy Policy and confirm that you are at least 16 years old.
                                    </p>

                                      <label>
                                      
                                        <button 
                                        disabled={isSubmitting}
                                        className='btn block mt-5 m-auto w-[80%] bg-blue-600 text-white duration-300 hover:bg-pink-500 hover:text-black border-none'>Create An Accunet</button>
                                      </label>
                              </div>

                              <div id='aboutothrelogin' className='text-center mt-5 text-black '>
                                  <p>
                                      Already have an account ? <Link to="/signin"><span className='text-pink-500 font-bold'>TO LOG IN </span></Link>
                                  </p>
                              </div>
                      </form>
                </div>
                
                
                <div 
                className='md:float-right md:w-1/2 md:h-full  md:bg-cover md:bg-center md:flex hidden' 
                style={{backgroundImage: `url(${RejAS1})`}}>
                    <p className='text-8xl text-slate-50 font-bold p-16 pt-96'>
                      <span className='text-blue-800 bg-slate-100 block'>BURGER</span> 
                      <span className='block text-white'>ANIME</span>
                    </p>
                </div>
          </div>




        </div>
   </>
  );
}
