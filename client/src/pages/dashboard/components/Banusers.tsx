import { useState , useEffect } from "react";
import MainHeader from "../../../components/MainHeader";
import jwtDecode from "jwt-decode";
import Showallusers from "./Showallusers";
import Mainfooter from "../../../components/MainFooter";
import axios from "axios";


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


export default function Banusers() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;
   const token = window.localStorage.getItem("token");
   const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
   const [disablebtn , setDisablebtn] = useState<boolean>(false);

   const [theidinput,setTheinputID] = useState<String>("");
   const [resmessage, setResmessage] = useState<String>("");

   const handSupp = () => {
      setDisablebtn(true);

      axios.post(`${SERVER}/api/dashboard/yes/banuser`, { id : theidinput})
      .then((response) => {
         setResmessage(response.data.message);
         setTimeout(() => {
            window.location.href = "/dashboard";
         }, 5000);
      }).catch((e) => {
         window.location.href = "/";
      })

   }

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
            <MainHeader />
            <Showallusers />
            <div className="w-[70%] m-auto">
               <p className="text-gray-400">
                  I hope this message finds you well. I wanted to discuss the matter of user expulsions on the platform. As an active participant and user of this community, I understand the importance of maintaining a safe and respectful environment for everyone.

                  I fully support the platform's efforts to ensure that the community remains a positive and valuable space for all members. However, I believe that the process of user expulsions should be carried out thoughtfully and transparently.

                  Effective communication regarding the reasons for expulsion can go a long way in helping users understand the boundaries and expectations of the community. This, in turn, can reduce the likelihood of unintentional rule violations and foster a sense of fairness among the users.
                  <span className="text-red-500 font-bold" >
                   The account will be permanently deleted and will never return
                  </span>
               </p>

                              
            <div className="w-full m-auto text-center mt-16 space-x-4">
            <input 
            type="text"
             placeholder="Type User ID" 
             onChange={(e) => {setTheinputID(e.target.value)}}
             className="input input-bordered input-error w-full max-w-xs bg-transparent" />
            <button 
            onClick={handSupp}
            disabled={disablebtn}
            className="btn btn-outline btn-error">Banned</button>

               <p className="text-red-500 m-3">
                  {resmessage}
               </p>

            </div>

            </div>


         <Mainfooter />

      </>
    );
}