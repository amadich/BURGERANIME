import {  Route , Routes , useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Mainch from "./pages/ch/Main";
import Signup from "./pages/register/Signup";
import Signin from "./pages/register/Signin";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Profile from "./pages/Profile/Profile";
function App() {

  const [_,setCookies] = useCookies(["burgertoken"]);
  const location = useLocation();
  const token = window.localStorage.getItem("token");
  
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  if (token) {
    useEffect(() => {
       axios.post(`${SERVER}/api/auth`,{token})
       .then((response) => {
           // get Newtoken
           const newToken = response.data.token;
           if(newToken) {
            window.localStorage.removeItem("token");
            window.localStorage.setItem("token",newToken);
            setCookies("burgertoken",newToken);
            
           }

           else {
            window.localStorage.removeItem("token");
            setCookies("burgertoken" , "");
            window.location.href = "/";
          }
          
           
           

       }).catch((e) => {console.log(e);
       })
    }, [location , token]);
  }

  return ( 
    <>
      

    

      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Mainch />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile/:id" element={<Profile />} />
      </Routes>

    

    </>
   );
}

export default App;