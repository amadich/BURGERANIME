import { useEffect, useState } from "react";
import AvatarHeader from "../ch/components/Avatarheader";
import axios from "axios";
import Mainfooter from "../../components/MainFooter";
import { Link } from "react-router-dom";

interface Episode {
  title?: string;
  nbrps?: number;
  epsimage?: string;
  epsurl?: string;
}

interface Anime {
  _id?: string;
  title: string;
  genres: string[];
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  rating?: number;
  seasonal?: number;
  eps: Episode[];
  // Add other fields specific to anime data as needed
}

export default function Search() {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [listAnime, setListAnime] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [affichelist , setAfficheList] = useState<boolean>(false);

  useEffect(() => {
   if (searchQuery) {
      setAfficheList(true);
   }
   else {
      setAfficheList(false);
   }
  },[searchQuery])

  useEffect(() => {
    axios.get(`${SERVER}/api/dashboard/getlistanime`).then((response) => {
      const listAnimeData: Anime[] = response.data.data;
      setListAnime(listAnimeData);
    });
  }, []);

  const filteredAnime = listAnime.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AvatarHeader />
      <div className="text-center">
        <input
          className="w-[80%] border-b border-b-orange-500 bg-transparent text-3xl p-5 outline-none text-white font-bold"
          placeholder="Search..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div 
      style={ affichelist ? {display: "block"} : {display: "none"}}
      className="w-full h-full mt-16 p-16 space-y-4 m-auto text-center">
        <h1 className="text-white text-2xl font-bold">Meilleurs résultats</h1>

        <div className=" sm:inline-grid md:grid-cols-2 gap-4 ">
          {filteredAnime.map((anime) => (
            <Link to={`/series/${anime._id}`}>
                     <div
                     key={anime._id}
                     className="w-72 h-56 bg-[#0000004a] cursor-pointer"
                     >
                     <div
                        style={{ backgroundImage: `url(${anime.imageUrl2})` }}
                        className="h-32 bg-cover bg-center bg-no-repeat duration-500 hover:transition-opacity hover:opacity-25"
                     ></div>
                     <div className="p-5">
                        <h1 className="text-xl text-white font-bold overflow-hidden overflow-ellipsis">
                           {anime.title}
                        
                        </h1>
                        
                        {/* Add other details like genres, description, etc. */}
                     </div>
                     </div>
            </Link>
          ))}
        </div>
      </div>
      <Mainfooter />
    </>
  );
}
