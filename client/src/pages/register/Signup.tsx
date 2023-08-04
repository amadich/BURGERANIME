import { Link } from 'react-router-dom';
import './assets/css/Sign.css';
import RejAS1 from "./assets/images/1318226.png";
import Logo from "./assets/images/logo.png";
export default function Signup() {
  return (
   <>

            <header className='block m-auto text-center h-16'>
                <Link to="/">
                    <img src={Logo} alt="Logo" width={60} className='m-auto mt-5' draggable={false} />
                </Link>
            </header>

        <div className="signup-container">
          {/* Your signup form or content goes here */}

        
          
          <div className='w-[80%] h-[40em] bg-blue-50 '>
                
                <div className='float-left md:w-1/2 h-full'>
                    
                      
                      <form action="" id='signupform'>

                        <h1 className='text-blue-800 font-bold text-3xl pl-16 pt-10'>♦ Create an account </h1>

                              <div id='settoutaforminput'>
                                      <label>
                                        <span>Username</span>
                                      <input type="text" placeholder='Username'  required/>  
                                      </label> <br/>
                                      <label>
                                        <span>Email Adress</span>
                                      <input type="text" placeholder='Email' required/>   
                                      </label><br />
                                      <label>
                                        <span>Password</span>
                                      <input type="password" placeholder='password' required/>
                                      </label> <br />

                                      <p className='text-center w-[80%] block m-auto text-gray-500 '>
                                          By creating an account, you agree to our Terms of Service and Privacy Policy and confirm that you are at least 16 years old.
                                    </p>

                                      <label>
                                      
                                        <button className='btn block mt-5 m-auto w-[80%] bg-blue-600 text-white duration-300 hover:bg-pink-500 hover:text-black border-none'>Create An Accunet</button>
                                      </label>
                              </div>

                              <div id='aboutothrelogin' className='text-center mt-5 text-black'>
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