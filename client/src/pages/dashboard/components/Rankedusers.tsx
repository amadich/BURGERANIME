import { useState } from "react";
import Mainfooter from "../../../components/MainFooter";
import MainHeader from "../../../components/MainHeader";
import axios from "axios";

export default function Rankedusers() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;
   const [iduser , setIDuser] = useState<String>("");
   const [resmessage , setResmessage] = useState<String>("");

   const handvip = () => {
      const newRanks = {
         admin: 0, // Update to 0 to remove admin rank
         vip: 1,   // Update to 1 to make user VIP
         demo: 0   // Update to 0 to remove demo rank
       };

      axios.post(`${SERVER}/api/dashboard/tovip`, { id : iduser , newRanks } )
      .then((response) => {
            setResmessage(response.data.message);
      })
   }

   const handadmin = () => {
      const newRanks = {
         admin: 1, // Update to 0 to remove admin rank
         vip: 0,   // Update to 1 to make user VIP
         demo: 0   // Update to 0 to remove demo rank
       };

      axios.post(`${SERVER}/api/dashboard/toadmin`, { id : iduser , newRanks } )
      .then((response) => {
            setResmessage(response.data.message);
      })
   }


   const handdemo = () => {
      const newRanks = {
         admin: 0, // Update to 0 to remove admin rank
         vip: 0,   // Update to 1 to make user VIP
         demo: 1   // Update to 0 to remove demo rank
       };

      axios.post(`${SERVER}/api/dashboard/todemo`, { id : iduser , newRanks } )
      .then((response) => {
            setResmessage(response.data.message);
      })
   }


   return ( 
      <>
               <MainHeader />

               <div className="w-[80%] m-auto mt-16">
               <input 
               onChange={(e) => {setIDuser(e.target.value)}}
               type="text" 
               placeholder="ID User ..." 
               className="input input-bordered input-warning w-full max-w-xs bg-transparent" />

               <div className="space-x-4 inline-flex m-5">
               
               <button className="btn btn-warning" onClick={handdemo} >Demo</button>
               <button className="btn btn-success" onClick={handvip}>VIP</button>
               <button className="btn btn-error" onClick={handadmin}>Admin ♦</button>

               </div>

               <p className="text-green-500">
                  {resmessage}
               </p>

               </div>

               <Mainfooter />

      </>   
    );
}