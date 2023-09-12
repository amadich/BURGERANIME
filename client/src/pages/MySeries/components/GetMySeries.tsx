import axios from "axios";
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface Episode {
   title?: string;
   nbrps?: number;
   epsimage?: string;
   epsurl?: string;
 }

 interface Format {
   seriesChecked : number;
   filmChecked : number;
 }

interface Anime {
   _id?: string;
   title: string;
   genres: string[];
   description: string;
   imageUrl1: string;
   imageUrl2: string;
   rating?: number;
   format?: Format;
   seasonal?: number;
   premium?:  number;
   eps: Episode[];
   // Add other fields specific to anime data as needed
 }

export default function GetMySeries() {
   const SERVER = import.meta.env.VITE_HOSTSERVER;
   const [ListanimeRev , setListanimeRev] = useState<Anime[]>([]);

   const [open , setOpen] = useState<boolean>(true);

   useEffect(() => {
      axios
        .get(`${SERVER}/api/dashboard/getlistanime/reversed`)
        .then((response) => {
          const listAnimeRev: Anime[] = response.data.data;
          setListanimeRev(listAnimeRev);
          setOpen(false);
     
           
           
        })
         
        .catch((error) => {
          console.error("Error fetching anime list:", error);
          
           
        });
    }, []);
   


   return ( 
      <>

      
      <article className=" w-full h-full container m-auto ">
      <nav className="border border-blue-500  "></nav>
            <Backdrop
                     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                     open={open}
                     
                     >
                     <CircularProgress color="inherit" />
                </Backdrop>

            {
               ListanimeRev.map((anime,key) => {
                  return (
                     <Link 
                     to={`/series/${anime._id}`}
                     key={key} 
                     className=" inline-flex  p-1  w-56 h-96 m-auto " >
                        
                        <div 
                           className=" w-full h-full bg-cover bg-center m-auto " 
                           style={{backgroundImage: `url(${anime.imageUrl1})`}}>
                           <div className="w-full h-full m-auto border border-transparent bg-[#2222227e] duration-300 hover:bg-[#5560ff7c] " >
                              <div className="w-full h-full m-auto " >

                                 <div className="w-12  bg-[#222] rounded-lg mt-1 ">
                                       <p className="flex justify-center items-center text-white font-bold " >
                                          { 
                                             anime.format?.seriesChecked == 1 ? 
                                             <span>Serie</span>
                                             :
                                             <span>Film</span>
                                          }
                                       </p>
                                 </div>
                                 
                                 <div
                                    className=" mt-[100%] bg-[#22222291] rounded-xl w-[90%] flex justify-center items-center m-auto   overflow-hidden   text-white font-bold text-center ">
                                    <p className="p-1" >
                                       {anime.title}
                                    </p>
                                 </div>

                              </div>
                           </div>
                           
                        </div>
                     </Link>
                  )
               })
            }

      </article>

      </>
    );
}