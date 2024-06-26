import { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader";
import jwtDecode from "jwt-decode";
import D1 from "./assets/images/D1.jpg";
import { Link } from "react-router-dom";


import { auth } from "../../models/Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";

// Define the interface for the decoded object
interface DecodedObject {
   id : String,
   avatar: String,
   ranks: {
     admin: number;
     demo: number;
     vip: number;
   };
 }

function Dashboard({userCount} : {userCount: number}) {

   signInWithEmailAndPassword(auth, import.meta.env.VITE_emailauthbase , import.meta.env.VITE_pwdauthbase);
   
   const token = window.localStorage.getItem("token");
   const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null

   useEffect(() => {
      if (token) {
        
         try {
             // Decode the token and store the decoded object in state
            const decodedToken = jwtDecode(token);
            setDecoded(decodedToken as DecodedObject);
            
               if (Number(decoded?.ranks.admin) == 0) {
                  window.location.href = "/"; 
                  
                  
               }
               
            
         } catch (error) {
               console.log(error);
                     
         }

      } 
      else {
         window.location.href = "/"; 
      }
   }, [token]);

  

   return ( 
      <>
         <MainHeader userCount={userCount} />

         <article>
               
         </article>
         <div className="hero min-h-screen bg-base-500">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <img
               draggable={false} 
               src={D1} 
               className="max-w-sm rounded-lg shadow-2xl" />
               <div>
                  <h1 className="text-5xl font-bold text-white">Dashboard <span className="text-red-500">Admin</span> Box!</h1>
                  <p className="py-6 text-gray-300">The admin dashboard serves as a command center, helping administrators efficiently handle their responsibilities and make informed decisions. It's designed to be intuitive, organized, and responsive, allowing admins to interact with the application and perform tasks with ease.

Remember that the specific features and components of the admin dashboard will depend on the nature of your application and the needs of your administrators.</p>
                  <div className=" flex overflow-x-auto space-x-4 ">
                     <Link to="/dashboard/showallusers"><button className="btn btn-primary">Show All Users</button></Link>
                     <Link to="/dashboard/uploadanime"><button className="btn btn-secondary ">Upload New Anime</button> </Link>
                     <Link to="/dashboard/AddEpes"><button className="btn btn-warning" >ADD Episodes Anime</button></Link>
                     <Link to="/dashboard/Rankedusers"><button className="btn bg-blue-500 text-white" >Ranked Users</button></Link>
                     <Link to="/dashboard/Banusers"><button className="btn btn-error  " >Banned Users</button> </Link>
                  </div>

                   {/* TAP2 */}
                  
                  <div className="mt-5">
                     <Link to="/dashboard/Premiumanime"><button className="btn btn-success text-black  " >
                        Make Anime Premium <span className="text-green-900" >♣</span> </button> 
                     </Link>
                  </div>
                  
               </div>
            </div>
         </div>


            

      </>
    );
}

export default Dashboard;
