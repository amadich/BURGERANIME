import TestImg from "../../../../public/assets/images/689e2efcf9f192ba6c0f7a538ee99027.png";
import TestImg2 from "../../../../public/assets/images/77fb4ad8d5c781685695bc574eb34b0a.png";
import { MdChevronLeft , MdChevronRight } from "react-icons/md";
function AnimeList() {

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
             <article className=" w-full pt-[1%]  bg-[#222] md:relative ">

                     {/* Details List animes saison   */}

                        <div>
                           <h1 className=" m-5  md:m-10 md:ml-32">
                              Aperçu de la saison du été 2023
                              <p className="text-[15px] text-gray-400 font-mono">
                                 Regardez gratuitement les trois premiers épisodes de ces simulcast d'été !
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

                           
                           
                              <div className=" w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg ">
                                 <div
                                 className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40"
                                 style={{ backgroundImage: `url(${TestImg2})` }}
                                 ></div>

                                 <p className="text-white text-center ">
                                 JUJUTSU KAISEN <br />
                                    <span className="text-gray-500">VOST | Dub</span>
                                 </p>
                              
                              </div>



                        </div>

                        <MdChevronRight 
                        onClick={sliderRight}
                        size={40} 
                        className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

                     </div>


                     {/* Best Show List Anime */}




                     <div>
                           <h1 className=" m-5  md:m-10 md:ml-32">
                              Anime Best Show
                              <p className="text-[15px] text-gray-400 font-mono">
                                 Regardez gratuitement les trois premiers épisodes de ces simulcast d'été !
                              </p>
                           </h1>
                           <div id="ttborder2" className="w-[80%] h-[5px]  rounded-xl m-5 md:m-10 md:ml-32"></div>
                        </div>

                        {/* Create Cards animes bestShow */}

                        
                        <div className=" relative m-auto w-[90%] h-full flex justify-around items-center">
                        <MdChevronLeft 
                        onClick={sliderLeft}
                        size={40} 
                        className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

                        <div id="slider" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth">

                           
                           
                              <div className=" w-40 h-76 group cursor-pointer duration-300 bg-[#0000004a] rounded-lg ">
                                 <div
                                 className="bg-cover bg-center border-b w-40 h-64 transition-opacity duration-300 ease-in-out group-hover:opacity-40"
                                 style={{ backgroundImage: `url(${TestImg})` }}
                                 ></div>

                                 <p className="text-white text-center ">
                                    Spy X FAMILY <br />
                                    <span className="text-gray-500">VOST | Dub</span>
                                 </p>
                              
                              </div>



                        </div>

                        <MdChevronRight 
                        onClick={sliderRight}
                        size={40} 
                        className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />

                     </div>





                     </article>
      </>
    );
}

export default AnimeList;