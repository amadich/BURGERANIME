import {  Route , Routes , useLocation } from "react-router-dom";
import { io } from "socket.io-client";
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
import ProfileVip from "./pages/Profile/ProfileVip";
import Myseries from "./pages/MySeries/Myseries";
import MyFilms from "./pages/MyFilms/MyFilms";
import Chat from "./pages/ChatRoom/Chat";


// Define the interface for the decoded objects from the token
interface DecodedObject {
  id: string;
  avatar: string;
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
  favoriteAnime: string[]; // Assuming favoriteAnime is an array of strings
  aboutme: string;
  datecreate: string;
  iat: number;
}


function App() {

  // Define the server URL
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [userCount, setUserCount] = useState(0);

 

  // Create a new socket connection
  const socket = io(SERVER, {
    autoConnect: false,
    // only https://burgeranimeserver.vercel.app/
    transports: ["websocket"],
  });

  // Connect the socket
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      //console.log("Connected to server");
    });

    socket.on("update_user_count", (count) => {
      setUserCount(count);
    });

    return () => {
      socket.off("connect");
      socket.off("update_user_count");
      socket.close();
    };
  }, []);
  
  // Get the token from local storage
  const [_,setCookies] = useCookies(["burgertoken"]);
  const location = useLocation();
  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
  
   // get id User from token && favoriteanime
   const [iduser, setIduser] = useState<String>("");
   const [userfavoriteanime, setUserFavoriteanime] = useState<String[]>([]);

 

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
                 
                  if ( decoded != null) {
                    setIduser(decoded.id);
                    setUserFavoriteanime(decoded.favoriteAnime);
                  }
                  
                  
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







  
  
     
        
        

        return ( 
          <>
            
      
            
      
            <Routes>
                  <Route path="*" element={<NotFound userCount={userCount} />} />
                  <Route path="/" element={<Main userCount={userCount} />} />
                  <Route path="/main" element={<Mainch />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/profile/:id" element={<Profile userCount={userCount} />} />
                {
                    decoded?.ranks.vip == 1 &&
                    (
                      <>
                        <Route path="/profile/:id/changeavatar" element={<ProfileVip userCount={userCount} />} />
                      </>
                    )
                  }
                  {
                    decoded?.ranks.admin == 1 &&
                    
                        (
                          <>
                            <Route path="/dashboard" element={<Dashboard userCount={userCount} />} />
                            <Route path="/dashboard/showallusers" element={<Showallusers />} />
                            <Route path="/dashboard/uploadanime" element={<Uploadanime userCount={userCount} />} />
                            <Route path="/dashboard/AddEpes" element={<AddEpes userCount={userCount} />} />
                            <Route path="/dashboard/Banusers" element={<Banusers userCount={userCount} />} />
                            <Route path="/dashboard/Rankedusers" element={<Rankedusers />} />
                            <Route path="/dashboard/Premiumanime" element={<Premiumanime userCount={userCount} />} />
                          </>
                        )
      
                    
                  }
      
      
                  {
                    decoded?.ranks.helper == 1 &&
                    
                        (
                          <>
                            <Route path="/dashboard_helper" element={<Dashboard_helper userCount={userCount} />} />
                           
                            <Route path="/dashboard_helper/uploadanime" element={<Uploadanime userCount={userCount} />} />
                            <Route path="/dashboard_helper/AddEpes" element={<AddEpes userCount={userCount} />} />
                            <Route path="/dashboard_helper/Premiumanime" element={<Premiumanime userCount={userCount} />} />
                            
                            
                          </>
                        )
      
                    
                  }
                  
                  <Route path="/learn_discord" element={<Learn_discord />} />
                  <Route path="/series" element={<Myseries userCount={userCount} />} />
                  <Route path="/movies" element={<MyFilms userCount={userCount} />} />
                  <Route path="/series/:id" element={<Series userCount={userCount} userID={iduser} userFavAnime={userfavoriteanime}  />} />
                  <Route path="/series/:id/:epsid" element={<Watch userCount={userCount} />} />
                  <Route path="/search" element={<Search userCount={userCount} />} />
                  <Route path="/chat" element={<Chat userCount={userCount} socket={socket} />} />
                  
      
            </Routes>
      
          
      
          </>
         );
        
      } 
    
 



  


export default App;
