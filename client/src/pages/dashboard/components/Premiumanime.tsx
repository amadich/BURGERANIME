import { useState } from "react";
import MainHeader from "../../../components/MainHeader";
import FilterIDanime from "./FilterIDanime";
import K404 from "../../../../public/assets/images/konata_error_404_.png";
import KReadCataAfk from "../assets/images/Burgeranime_premium_anime.png";
import Mainfooter from "../../../components/MainFooter";
import axios from "axios";

export default function Premiumanime() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;
   const [ IDanime , setIDanime ] = useState<string>("");
   const [ msgResponse , setMsgResponse ] = useState<string>("");

   const handPremium = () => {

         axios.put(`${SERVER}/api/dashboard/premium_anime`, {IDanime})
         .then((response : any) => {

               setMsgResponse(response.data.message);
               window.location.href =  "/";


         }).catch((e) => {
            console.log(e);
         })


   }



   const handUnPremium = () => {

      axios.put(`${SERVER}/api/dashboard/unpremium_anime`, {IDanime})
      .then((response : any) => {

            setMsgResponse(response.data.message);


      }).catch((e) => {
         console.log(e);
      })


}

   return ( 
      <>
            <MainHeader />
            <FilterIDanime />

            <nav className="  carousel w-full flex items-center m-auto text-center md:hidden  ">

               <figure className="m-auto relative">
                  <img 
                     draggable={false}
                     src={K404} 
                     alt="Error 404" 
                     width={250} 
                     className="m-auto "
                  />
                  <p 
                     className="mt-[-5em] text-[#222] w-28 m-auto font-bold relative z-10"
                  >
                     You Need a <span className="text-blue-500">Big Screen</span> to Use This!!
                  </p>
               </figure>

            </nav>



            <div id="slide1" className="carousel-item relative w-full hidden md:flex ">
                     <div className="flex justify-around items-center m-auto text-center">
                           
                     <figure>
                     <img src={KReadCataAfk} alt="Catalog_Afk" width={150} draggable={false} />
                     </figure>
                           <input
                           className=" w-96 m-5 input bg-transparent text-white border border-yellow-500 font-bold "
                           style={{filter: "drop-shadow(0 0 10px gold)"}} 
                           placeholder="ID Anime "
                           type="text" 
                           onChange={(e) => {setIDanime(e.target.value)}}
                           />
                          
                          <div className="space-x-4 space-y-3" >
                              <button 
                                 className="btn btn-warning duration-500 hover:btn-accent"
                                 onClick={handPremium}
                              >
                                    Premium
                              </button>

                              <button  
                              className="btn btn-error"
                              onClick={handUnPremium}>Remove Premium</button>
                          </div>
                        
                         
                        </div>
                        
            </div>

                           <div className="text-center">
                              <p className="font-bold text-yellow-500 ">
                                 {msgResponse}
                              </p>
                           </div>

                  {/* */}

                  <article className="w-[80%] m-auto mt-32 select-none ">
                     <p className="text-gray-500 w-[80%] duration-300 hover:text-gray-400 font-bold ">
                     The <span className="font-bold text-green-500 duration-200 hover:text-blue-500 ">Make Anime Premium</span> page is a dedicated section within the dashboard of an application designed for administrators. Its primary purpose is to allow administrators to add new anime titles to the application's database. This feature enables the platform to expand its library of available anime content. 
                     </p>
                  </article>

               {/* */}

               <Mainfooter />
      </>
    );
}