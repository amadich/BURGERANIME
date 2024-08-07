
import "../../../assets/css/Articlemain.css"
import { MdChevronLeft , MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CrownPremium from "../../../../public/assets/icons/crown.png";
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

function MyAnimeList(idUser: any) {

   const SERVER = import.meta.env.VITE_HOSTSERVER;

   

   const [open, setOpen] = useState(true);
   //const [Listanime , setListanime] = useState<Anime[]>([]);
   const [MyFavoriteAnime , setMyFavoriteAnime] = useState<Anime[]>([]);


   // Fetch My Favorite anime list from server
   useEffect(() => {
      
      
      idUser = idUser.idUser.toString();
      

    
         axios
           .get(`${SERVER}/api/profile/favAnimelist/${idUser}`)
           .then((response) => {
             const listAnime: Anime[] = response.data;
             setOpen(false);

             //console.log(listAnime);

             if ( listAnime == null) {
               setMyFavoriteAnime([]);
             }

             else {
               setMyFavoriteAnime(listAnime);
             }
             
             
             
           })
           .catch((error) => {
             console.error("Error fetching anime list:", error);
             setOpen(true);
           });
       
      
    }, [ idUser.idUser ]);

   

    {/* Slider 1 */}

   const sliderLeft = () => {
      let slider = document.getElementById("slider");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft - 500
      }
   }

   const sliderRight = () => {
      let slider = document.getElementById("slider");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft + 500
      }
   }


  



   return ( 
      <>
         {/* IF you are used image 'Supramain' in MainNav  change md:mt-[-620px] */}
         <article id="main_article" className=" w-full pt-[1%]  bg-[#222] md:relative  m-auto">
         

            {/* Details List animes saison   */}

               <div>
               
               <Backdrop
                     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                     open={open}
                     
                     >
                     <CircularProgress color="inherit" />
                </Backdrop>

                  <h1 className=" m-5  md:m-10 md:ml-32">
                     My Favorite Animes
                     <p className="text-[15px] text-gray-400 font-mono">
                     Share Your Favorite Animes with your Friends     </p>
                  </h1>
                  <div className=" h-[5px] rounded-xl m-5 md:m-10 md:ml-32 bg-custom-gradient"></div>

               </div>

               {/* Create Cards animes List */}
            <div className=" relative m-auto w-[90%] h-full flex justify-around items-center">
               <MdChevronLeft 
               onClick={sliderLeft}
               size={40} 
               className=" text-white  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

               <div id="slider" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth ">

                    
               {
               MyFavoriteAnime.length > 0 ? MyFavoriteAnime.reverse().map((anime, index) => (
                     <Link to={`/series/${anime._id}`} key={index}>
                              <div  title={anime.title} className="w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg">
                                    <div className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40" style={{ backgroundImage: `url(${anime.imageUrl1})` }}>
                                       {/* Premium Show */}
                                          <div style={anime.premium == 1 ? {display: "flex"} : {display : "none"}} className="text-yellow-500 rounded-lg p-2 flex space-x-2 m-2 float-right text-sm bg-[#00000083] font-bold " >
                                             <figure> 
                                                <img src={CrownPremium} alt="VIP" width={16} />  
                                             </figure>
                                             <p className=" text-xs ">Premium</p>
                                          </div>
                                    </div>
                                    
                                    <p className="text-white text-center">
                                       <span className="block overflow-hidden overflow-ellipsis p-2 ">
                                          {anime.title}
                                       </span>
                                       
                                       <span className="text-gray-500">Seasonal</span>
                                    </p>


                              </div>
                     </Link>
               )) : <p className="text-white font-bold text-center m-auto">No Anime Found</p>}
                    



               </div>

               <MdChevronRight 
               onClick={sliderRight}
               size={40} 
               className=" text-white duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

            </div>




                 




         </article>
      </>
    );
}

export default MyAnimeList;
