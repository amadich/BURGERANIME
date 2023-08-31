import "../assets/css/Articlemain.css"
import { MdChevronLeft , MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
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
   eps: Episode[];
   // Add other fields specific to anime data as needed
 }

function Mainarticle() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;
   const [open, setOpen] = useState(true);
   const [Listanime , setListanime] = useState<Anime[]>([]);
   const [seasonalAnimeList, setSeasonalAnimeList] = useState<Anime[]>([]);
   const [FilmAnimeList, setFilmAnimeList] = useState<Anime[]>([]);

   const [reversedListAnime, setReversedListAnime] = useState<Anime[]>([]);
   

   useEffect(() => {
      axios
        .get(`${SERVER}/api/dashboard/getlistanime`)
        .then((response) => {
          const listAnime: Anime[] = response.data.data;
          setListanime(listAnime);
          setReversedListAnime([...Listanime].reverse());
  
          // Filter animeList to get only the seasonal anime
          const filteredSeasonalAnimeList = listAnime.filter(anime => anime.seasonal === 1);
          setSeasonalAnimeList(filteredSeasonalAnimeList);

           // Filter animeList to get only the Film anime
           const filteredFilmAnimeList = listAnime.filter(anime => anime?.format?.filmChecked === 1);
           setFilmAnimeList(filteredFilmAnimeList);

          setOpen(false);
        })
        .catch((error) => {
          console.error("Error fetching anime list:", error);
          setOpen(true);
        });
    }, []);

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


   {/* Slider 2 */}

   const sliderLeft_2 = () => {
      let slider = document.getElementById("slider_2");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft - 500
      }
   }

   const sliderRight_2 = () => {
      let slider = document.getElementById("slider_2");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft + 500
      }
   }

   {/* Slider 3 */}

   const sliderLeft_3 = () => {
      let slider = document.getElementById("slider_3");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft - 500
      }
   }

   const sliderRight_3 = () => {
      let slider = document.getElementById("slider_3");
      if(slider) {
         slider.scrollLeft = slider.scrollLeft + 500
      }
   }



   return ( 
      <>
         <article id="main_article" className=" w-full pt-[1%]  bg-[#222] md:relative md:mt-[-620px]">
         

            {/* Details List animes saison   */}

               <div>
               
               <Backdrop
                     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                     open={open}
                     
                     >
                     <CircularProgress color="inherit" />
                </Backdrop>

                  <h1 className=" m-5  md:m-10 md:ml-32">
                     Preview of the Summer  Season
                     <p className="text-[15px] text-gray-400 font-mono">
                     Watch the first three episodes of these summer simulcasts for free!
                     </p>
                  </h1>
                  <div id="ttborder1" className="w-[80%] h-[5px]  rounded-xl m-5 md:m-10 md:ml-32"></div>
               </div>

               {/* Create Cards animes List */}
            <div className=" relative m-auto w-[90%] h-full flex justify-around items-center">
               <MdChevronLeft 
               onClick={sliderLeft}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

               <div id="slider" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth">

                    
               {seasonalAnimeList.map((anime, index) => (
                     <Link to={`/series/${anime._id}`} key={index}>
                              <div  title={anime.title} className="w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg">
                                    <div className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40" style={{ backgroundImage: `url(${anime.imageUrl1})` }}></div>
                                    
                                    <p className="text-white text-center">
                                       <span className="block overflow-hidden overflow-ellipsis p-2 ">
                                          {anime.title}
                                       </span>
                                       
                                       <span className="text-gray-500">Seasonal</span>
                                    </p>


                              </div>
                     </Link>
          ))}
                    



               </div>

               <MdChevronRight 
               onClick={sliderRight}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

            </div>




                  {/* Film  List Anime */}




                  <div>
                                    <h1 className=" m-5  md:m-10 md:ml-32">
                                    Find your Favorite Movies
                                       <p className="text-[15px] text-gray-400 font-mono">
                                       All anime movies are presented in high quality. You can choose your favorite movie!
                                       </p>
                                    </h1>
                                    <div id="ttborder2" className="w-[80%] h-[5px]  rounded-xl m-5 md:m-10 md:ml-32"></div>
                                 </div>

                                 {/* Create Cards animes bestShow */}

                                 
                                 <div className=" relative m-auto w-[90%] h-full flex justify-around items-center">
                                 <MdChevronLeft 
                                 onClick={sliderLeft_2}
                                 size={40} 
                                 className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

                                 <div id="slider_2" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth">

                                    
                                    
                                 {FilmAnimeList.reverse().map((anime, index) => (
                                       <Link to={`/series/${anime._id}`} key={index}>
                                             <div  title={anime.title} className="w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg">
                                                <div className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40" style={{ backgroundImage: `url(${anime.imageUrl1})` }}></div>
                                                
                                                <p className="text-white text-center p-2">
                                                   <span className="block overflow-hidden overflow-ellipsis">
                                                      {anime.title}
                                                   </span>
                                                
                                                
                                                   <span className="text-gray-500"> Dub edition</span>
                                                
                                                </p>


                                             </div>
                                       </Link>
                           ))}



                                 </div>

                                 <MdChevronRight 
                                 onClick={sliderRight_2}
                                 size={40} 
                                 className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

                              </div>
            {/* End Film List Anime */}


            {/* Best Show List Anime */}




            <div>
                  <h1 className=" m-5  md:m-10 md:ml-32">
                     Anime Best Show
                     <p className="text-[15px] text-gray-400 font-mono">
                     Watch the first three episodes of these summer simulcasts for free!
                     </p>
                  </h1>
                  <div id="ttborder2" className="w-[80%] h-[5px]  rounded-xl m-5 md:m-10 md:ml-32"></div>
               </div>

               {/* Create Cards animes bestShow */}

               
               <div className=" relative m-auto w-[90%] h-full flex justify-around items-center">
               <MdChevronLeft 
               onClick={sliderLeft_3}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

               <div id="slider_3" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth">

                    
                    
               {reversedListAnime.map((anime, index) => (
                     <Link to={`/series/${anime._id}`} key={index}>
                           <div  title={anime.title} className="w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg">
                              <div className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40" style={{ backgroundImage: `url(${anime.imageUrl1})` }}></div>
                              
                              <p className="text-white text-center p-2">
                                 <span className="block overflow-hidden overflow-ellipsis">
                                    {anime.title}
                                 </span>
                              
                              
                                 <span className="text-gray-500"> Dub edition</span>
                              
                              </p>


                           </div>
                     </Link>
          ))}



               </div>

               <MdChevronRight 
               onClick={sliderRight_3}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

            </div>





         </article>
      </>
    );
}

export default Mainarticle;
