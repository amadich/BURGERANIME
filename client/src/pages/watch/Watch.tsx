import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import KonataError404 from "../../../public/assets/images/konata_error_404_.png";
import axios from "axios";
import Mainfooter from "../../components/MainFooter";

import jwtDecode from "jwt-decode";

interface Episode {
  _id: string;
  title: string;
  nbrps: number;
  epsimage: string;
  epsurl: string;
}

interface Anime {
  _id: string;
  title: string;
  genres: string[];
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  rating?: number;
  seasonal?: number;
  premium :  number;
  eps: (Episode | null)[];
}

// Define the interface for the decoded object
interface DecodedObject {
  id : String,
  avatar: String,
  ranks: {
    admin: number;
    helper:number;
    demo: number;
    vip: number;
  };
}

export default function Watch() {
  const { id, epsid } = useParams();
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const token = window.localStorage.getItem("token");
  const [decodeduser , setDecodedUser] = useState<DecodedObject |  null>(null);

  const [anime, setAnime] = useState<Anime | null>(null);
  const [animeEpsURL, setAnimeEpsURL] = useState<Episode[]>([]);
  const [nexteps, setNextEps] = useState<string | undefined>("");

  useEffect(  () => 
  {
    try {

      // Decode the token and store the decoded object in state
      if (token) {
        const decodedToken = jwtDecode(token);
        setDecodedUser(decodedToken as DecodedObject);
      }

      
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  ,[token])

  useEffect(() => {
    if ( ((anime?.premium == 1) &&  (decodeduser?.ranks.vip !== 1))          ) {
      window.location.replace("/");
  }
  },[token , anime])

  useEffect(() => {
    if (!id || !epsid) {
      return;
    }

    axios.get(`${SERVER}/api/dashboard/getlistanime_watch/${id}`).then((response) => {
      if (response.data.success) {
        const fetchedAnime = response.data.anime;
        setAnime(fetchedAnime);

        const filteredURL = fetchedAnime.eps.filter(
          (animeeps: Episode | null) =>
            animeeps?._id && epsid && animeeps._id.toLowerCase().includes(epsid.toLowerCase())
        );
        setAnimeEpsURL(filteredURL);

        if (filteredURL.length > 0 && filteredURL[0]?.nbrps < fetchedAnime.eps.length - 1) {
          const nextid = fetchedAnime.eps[filteredURL[0]!.nbrps + 1]?._id;
          setNextEps(nextid);
        }
      }
    });
  }, [id, epsid]);

  if (!anime || !id || !epsid) {
    return (
      <>
        <div className="select-none mt-[5%]">
          <figure className="m-auto relative">
            <img
              draggable={false}
              src={KonataError404}
              alt="Error 404"
              width={250}
              className="m-auto"
            />
            <p className="mt-[-4.3em] text-[#222] w-48 m-auto font-bold relative z-10">
              Loading ... <span className="text-blue-500">Anime ID</span>
            </p>
          </figure>
        </div>
        <MainFooter />
      </>
    );
  }

  return (
    <>
      <MainHeader />

      <div className="w-full h-96 border-none">
        {animeEpsURL.length > 0 && animeEpsURL[0]?.epsurl && (
          <iframe src={animeEpsURL[0].epsurl} className="w-full h-full" allowFullScreen></iframe>
        )}
      </div>

      <div className="h-56 w-[80%] m-16 space-y-4">
        <h1 className="text-orange-500 text-3xl font-bold">
          <span>{anime.title} | </span>

          <div className="inline-flex space-x-3">
            {nexteps && (
              <Link to={`/series/${anime._id}/${nexteps}`}>
                <button className="btn bg-orange-500 text-white duration-500 hover:bg-red-500">
                  Next Episode
                </button>
              </Link>
            )}

            <Link to={`/series/${anime._id}`}>
              <button className="btn bg-blue-500 text-white duration-500 hover:bg-green-500">
                Back To List
              </button>
            </Link>
          </div>
        </h1>
        {animeEpsURL.length > 0 && (
          <p className="text-2xl text-slate-200">Episode - {animeEpsURL[0].nbrps}</p>
        )}
        <p>VOST | <span className="text-blue-500 font-bold">Dub</span></p>
        <p className="text-gray-400">
          {anime.description}
        </p>

        <Link to="/contactus">
          <span className="text-red-500 block float-right font-mono">
            Report an anime episode that does not work?
          </span>
        </Link>

        <Mainfooter />
      </div>
      
    </>
  );
}
