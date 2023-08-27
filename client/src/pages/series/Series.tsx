import { useState, useEffect } from "react";
import AvatarHeader from "../ch/components/Avatarheader";
import Star from "./assets/images/star.png";
import Konata_error_404_ from "../../../public/assets/images/konata_error_404_.png";
import { Link, useParams } from "react-router-dom";
import { MdChevronLeft , MdChevronRight } from "react-icons/md";
import axios from "axios";
import Mainfooter from "../../components/MainFooter";



interface Episode {
  _id?: string;
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

export default function Series() {
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null); // Change to nullable type
  const [animeEps , setAnimeEps] = useState<Episode[]>([]);
  const [firsteps , setFiestEps] = useState<String>("");

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

  useEffect(() => {
    axios
      .get(`${SERVER}/api/dashboard/getlistanime/${id}`)
      .then((response) => {
        if (response.data.success) {
          //console.log(response.data.anime);
          setAnime(response.data.anime);
          setAnimeEps(response.data.anime.eps);
          if (response.data.anime.eps[1] != null) {
            setFiestEps(response.data.anime.eps[1]._id);
            
          }
          
        }
      });
  }, [id]);

  if (!anime) {
    // Add a loading state
    return (
      <>
      <AvatarHeader />

        <div className=" select-none mt-[5%] ">
         
        <figure className="m-auto relative   ">
               <img 
                  draggable={false}
                  src={Konata_error_404_} 
                  alt="Error 404" 
                  width={250} 
                  className="m-auto "
               />
               <p 
                  className="mt-[-4.3em] text-[#222] w-48 m-auto font-bold relative z-10"
               >
                 Loading ... <span className="text-blue-500">Anime ID</span> 
               </p>
            </figure>

           
        
        </div>
        <Mainfooter />
      </>
    );


    

  }

  return (
    <>
      {/* Background Image */}
      <img
        src={anime.imageUrl2}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-lg"
      />
      {/* Content */}
      <div className="relative  ">
        <AvatarHeader />
        {/* Other content */}
        <div className="w-full h-full grid m-auto md:flex justify-around items-center  bg-[#222] p-5 md:bg-transparent md:p-0 ">
          <div
            className="md:w-64 md:h-96 w-16 h-28 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${anime.imageUrl1})` }}
          ></div>
          <div className="md:w-[70%]  space-y-4 md:border md:border-[#222] md:bg-[#222] md:p-5 rounded-lg">
            <h1 className="text-white font-bold text-3xl">
              {anime.title}
              <span className="text-black rounded-lg p-2 float-right text-sm bg-orange-500">
                { anime?.format ?  anime?.format?.seriesChecked == 1 ? <span>Serie</span> : <span>Film</span> : null  }
              </span>
            </h1>
            <p className="font-bold text-slate-200">
              {anime.genres.join(", ")}
            </p>
            <p className="flex space-x-3 items-center">
              <span>
                <img
                  src={Star}
                  alt="Star"
                  width={30}
                  draggable={false}
                />
              </span>
              <span className="font-bold text-white text-xl">
                {anime.rating && anime.rating*2 || "-"}
              </span>
            </p>
            <p className="text-slate-300">{anime.description}</p>
            <div className="flex justify-around items-center space-x-4">
              <button className="btn" disabled={true}>
                Watch Trailer
              </button>
              <Link to={`/series/${id}/${firsteps}`}>
                  <button className="btn border-none bg-orange-500 text-white font-bold duration-500 hover:bg-blue-500">
                    Watch The First Episode
                  </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Episodes Series ... */}

     
       
      
      

      <article className="relative m-auto mt-16 w-[90%] h-full flex justify-around items-center z-20 bg-[#0000004a] rounded-xl ">

     
              
               <MdChevronLeft 
               onClick={sliderLeft}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />
      <div id="slider" className=" relative m-auto p-3   w-[85%] h-full flex space-x-10 overflow-x-scroll whitespace-nowrap scroll-smooth">
       
      {animeEps.length == 1 ? (
                  <p>No Episodes Available</p>
                ) : (
                  animeEps
                  .slice(1)
                  .filter(val => val !== null)
                  .map((val , key) => {
                    return (
                      <Link to={`/series/${id}/${val._id}`} key={key}>
                          <div className=" w-56 h-42 bg-[#0000004a] rounded-lg">
                              <div
                                style={{backgroundImage: `url(${val.epsimage})`}}
                                className="w-full h-32 bg-cover bg-center bg-no-repeat duration-300 hover:transition-opacity  hover:opacity-30 rounded-lg ">
                            </div>

                              <div className="text-center">
                                
                              <div className="overflow-hidden">
                                  <p className="font-bold text-white truncate p-2">
                                   <span className="text-orange-500">{val.nbrps}</span> - {val.title} 
                                  </p>
                              </div>

                                  <p>
                                    VOST | <span className="text-orange-500 font-bold" >Dub</span>
                                  </p>
                              </div>



                          </div>
                      </Link>
                    )
                  })
                )
              
              }
              </div>
              <MdChevronRight 
               onClick={sliderRight}
               size={40} 
               className="  duration-300 opacity-100 hover:opacity-40 cursor-pointer" />
      </article>

      <Mainfooter />

    </>
  );
}
