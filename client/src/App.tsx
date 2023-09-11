import {  Route , Routes , useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Mainch from "./pages/ch/Main";
import Signup from "./pages/register/Signup";
import Signin from "./pages/register/Signin";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/dashboard/dashboard";
import Showallusers from "./pages/dashboard/components/Showallusers";
import Uploadanime from "./pages/dashboard/components/Uploadanime";
import AddEpes from "./pages/dashboard/components/AddEpes";
import Series from "./pages/series/Series";
import NotFound from "./pages/NotFound";
import Watch from "./pages/watch/Watch";
import Banusers from "./pages/dashboard/components/Banusers";
import Search from "./pages/search/Search";
import Rankedusers from "./pages/dashboard/components/Rankedusers";

import jwtDecode from "jwt-decode";
import Learn_discord from "./pages/dashboard/components/Learn_discord";
import Dashboard_helper from "./pages/dashboard_helper/dashboard_helper";
import Premiumanime from "./pages/dashboard/components/Premiumanime";


import { auth } from "./models/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import necessary functions


// Define the interface for the decoded object
interface DecodedObject {
  id : String,
  avatar: String,
  ranks: {
    admin: number;
    helper:number;
    demo: number;
    vip: number;
  };
}


function App() {

  
  

  const [_,setCookies] = useCookies(["burgertoken"]);
  const location = useLocation();
  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
  
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

                try {

                  // Decode the token and store the decoded object in state
                  const decodedToken = jwtDecode(token);
                  setDecoded(decodedToken as DecodedObject);
                  
                } catch (error) {
                  console.log(error);
                  
                }

            
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







  
  
      try {
        signInWithEmailAndPassword(auth, import.meta.env.VITE_emailauthbase , import.meta.env.VITE_pwdauthbase);
        

        return ( 
          <>
            
      
            
      
            <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/" element={<Main />} />
                  <Route path="/main" element={<Mainch />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  {
                    decoded?.ranks.admin == 1 &&
                    
                        (
                          <>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/showallusers" element={<Showallusers />} />
                            <Route path="/dashboard/uploadanime" element={<Uploadanime />} />
                            <Route path="/dashboard/AddEpes" element={<AddEpes />} />
                            <Route path="/dashboard/Banusers" element={<Banusers />} />
                            <Route path="/dashboard/Rankedusers" element={<Rankedusers />} />
                            <Route path="/dashboard/Premiumanime" element={<Premiumanime />} />
                          </>
                        )
      
                    
                  }
      
      
                  {
                    decoded?.ranks.helper == 1 &&
                    
                        (
                          <>
                            <Route path="/dashboard_helper" element={<Dashboard_helper />} />
                           
                            <Route path="/dashboard_helper/uploadanime" element={<Uploadanime />} />
                            <Route path="/dashboard_helper/AddEpes" element={<AddEpes />} />
                            <Route path="/dashboard_helper/Premiumanime" element={<Premiumanime />} />
                            
                            
                          </>
                        )
      
                    
                  }
                  
                  <Route path="/learn_discord" element={<Learn_discord />} />
                  <Route path="/series/:id" element={<Series />} />
                  <Route path="/series/:id/:epsid" element={<Watch />} />
                  <Route path="/search" element={<Search />} />
                
                  
      
            </Routes>
      
          
      
          </>
         );
        
      } catch (error) {
        // Handle authentication errors here
        console.error("Error signing in:", error);
      }
    };
    
 



  


export default App;
