import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import KonataError404 from "../../../public/assets/images/konata_error_404_.png";
import KonataErrorVIP from "../../../public/assets/images/konata_error_vip_.png";
import axios from "axios";
import Mainfooter from "../../components/MainFooter";
import jwtDecode from "jwt-decode";

import LikeYes from "./assets/icons/like_checked.png";
import Like from "./assets/icons/like.png";

import DisLike from "./assets/icons/dislike.png";
import DisLikeYes from "./assets/icons/dislike_checked.png";

interface Episode {
  _id: string;
  title: string;
  nbrps: number;
  epsimage: string;
  epsurl: string;
  SystemLikeUser: {
    userID: string;
    HeLiked: boolean;
    HeDesLiked: boolean;
  }[];
  Likes: {
    HeLiked: number;
    HeDesLiked: number;
  };
}

interface Anime {
  _id: string;
  title: string;
  genres: string[];
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  rating?: number;
  format: {
    // Define the properties of the 'format' object here
  };
  seasonal?: number;
  premium: number;
  by_admin: {
    // Define the properties of the 'by_admin' object here
  };
  eps: Episode[];
}

// Define the interface for the decoded object
interface DecodedObject {
  id: string;
  avatar: string;
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
}

export default function Watch() {
  const { id, epsid } = useParams();
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const token = window.localStorage.getItem("token");
  const [decodeduser, setDecodedUser] = useState<DecodedObject | null>(null);

  const [anime, setAnime] = useState<Anime | null>(null);
  const [animeEpsURL, setAnimeEpsURL] = useState<Episode[]>([]);
  const [nexteps, setNextEps] = useState<string | undefined>("");

  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);

  const [heclickLike, setHeclickLike] = useState<boolean>(true);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    try {
      // Decode the token and store the decoded object in state
      if (token) {
        const decodedToken = jwtDecode(token);
        setDecodedUser(decodedToken as DecodedObject);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

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

  useEffect(() => {
    if (!token && anime && anime.premium === 1) {
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  }, [anime]);

  useEffect(() => {
    if (anime && anime.premium === 1 && decodeduser && decodeduser.ranks.vip !== 1) {
      // Redirect if the anime is premium and the user is not a VIP
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  }, [anime, decodeduser]);

  useEffect(() => {
    // Initialize like and dislike statuses based on user's previous actions
    if (animeEpsURL.length > 0) {
      const episode = animeEpsURL[0];
      const userLike = episode.SystemLikeUser.find((user) => user.userID === decodeduser?.id);
      if (userLike) {
        setLikeStatus(userLike.HeLiked);
        setDislikeStatus(userLike.HeDesLiked);
      }

      // Set the like and dislike counts from the episode data
      episode.Likes ? setLikeCount(episode.Likes.HeLiked) : setLikeCount(0);
      episode.Likes ? setDislikeCount(episode.Likes.HeDesLiked) : setDislikeCount(0);
    }
  }, [animeEpsURL, decodeduser]);

  const handleLike = async () => {
    setHeclickLike(false);

    if (!decodeduser) {
      window.location.href = "/signin";
      return;
    }

    if (!decodeduser || likeStatus) {
      // User not authenticated or already liked, handle accordingly
      return;
    }

    if (anime && animeEpsURL.length > 0) {
      const IDanime = anime._id;
      const IDeps = animeEpsURL[0]._id;

      try {
        const response = await axios.post(
          `${SERVER}/api/animes/watchlike/${IDanime}/${IDeps}`,
          {
            IDuser: decodeduser.id,
            Like: true,
            DesLike: false,
          }
        );

        if (response.data.message === "User Updated Likes ANIME!!") {
          setLikeStatus(true);
          setDislikeStatus(false);

          // Update the like count in the state
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
          // Update the dislike count in the state if needed
          if (dislikeStatus) {
            setDislikeCount((prevDislikeCount) => prevDislikeCount - 1);
          }

          // Update the like count in local storage
          localStorage.setItem(`likeCount_${IDeps}`, likeCount.toString());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDislike = async () => {
    setHeclickLike(false);
    if (!decodeduser) {
      window.location.href = "/signin";
      return;
    }
    if (!decodeduser || dislikeStatus) {
      // User not authenticated or already disliked, handle accordingly
      return;
    }

    if (anime && animeEpsURL.length > 0) {
      const IDanime = anime._id;
      const IDeps = animeEpsURL[0]._id;

      try {
        const response = await axios.post(
          `${SERVER}/api/animes/watchlike/${IDanime}/${IDeps}`,
          {
            IDuser: decodeduser.id,
            Like: false,
            DesLike: true,
          }
        );

        if (response.data.message === "User Updated Likes ANIME!!") {
          setLikeStatus(false);
          setDislikeStatus(true);

          // Update the dislike count in the state
          setDislikeCount((prevDislikeCount) => prevDislikeCount + 1);
          // Update the like count in the state if needed
          if (likeStatus) {
            setLikeCount((prevLikeCount) => prevLikeCount - 1);
          }

          // Refresh the page
          //window.location.href = "";
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!token && anime && anime.premium === 1) {
    return (
      <>
        <div className="select-none mt-[5%]">
          <figure className="m-auto relative">
            <img draggable={false} src={KonataErrorVIP} alt="Error 404" width={250} className="m-auto" />
            <p className="mt-[-4.3em] text-[#222] w-48 m-auto font-bold relative z-10 text-center ">
              <span className="text-blue-600">Only Premuim</span> <span className="text-green-600">VIP</span>
              <br /> <Link to="/main"><button className="p-1 w-16 rounded-full bg-green-500 text-white duration-300 hover:bg-green-900">Back</button></Link>
            </p>
          </figure>
        </div>
        <MainFooter />
      </>
    );
  }

  if (anime && anime.premium === 1 && decodeduser && decodeduser.ranks.vip !== 1) {
    return (
      <>
        <div className="select-none mt-[5%]">
          <figure className="m-auto relative">
            <img draggable={false} src={KonataErrorVIP} alt="Error 404" width={250} className="m-auto" />
            <p className="mt-[-4.3em] text-[#222] w-48 m-auto font-bold relative z-10 text-center ">
              <span className="text-blue-600">Only Premuim</span> <span className="text-green-600">VIP</span>
              <br /> <Link to="/main"><button className="p-1 w-16 rounded-full bg-green-500 text-white duration-300 hover:bg-green-900">Back</button></Link>
            </p>
          </figure>
        </div>
        <MainFooter />
      </>
    );
  } else if (!anime || !id || !epsid) {
    return (
      <>
        <div className="select-none mt-[5%]">
          <figure className="m-auto relative">
            <img draggable={false} src={KonataError404} alt="Error 404" width={250} className="m-auto" />
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

      <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
        {animeEpsURL.length > 0 && animeEpsURL[0]?.epsurl && (
          <iframe
            src={animeEpsURL[0].epsurl}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="h-56 w-[80%] m-16 space-y-4  ">
        <h1 className="text-orange-500 text-3xl font-bold md:flex justify-between items-center ">
          <span>{anime.title} | </span>

          <div className="md:inline-flex md:space-x-3 space-y-3 md:space-y-0  mt-5 md:mt-0  ">
            {nexteps && (
              <a href={`/series/${anime._id}/${nexteps}`}>
                <button className="btn bg-orange-500 text-white duration-500 hover:bg-red-500">
                  Next Episode
                </button>
              </a>
            )}

            <Link to={`/series/${anime._id}`}>
              <button className="btn bg-blue-500 text-white duration-500 hover:bg-green-500">
                Back To List
              </button>
            </Link>

            <div className="w-32 h-12 rounded-lg flex justify-between items-center bg-green-500 select-none">
              <p
                className="text-black text-lg p-3 flex  items-center cursor-pointer"
                onClick={heclickLike ? handleLike : () => {}}
              >
                <span>{likeCount}</span>{" "}
                <figure className="ml-2">
                  <img
                    src={likeStatus ? LikeYes : Like}
                    alt="Like"
                    draggable={false}
                    className=" cursor-pointer "
                  />
                </figure>{" "}
              </p>
                            <p
                className="text-black text-lg pr-3  flex  items-center cursor-pointer"
                onClick={heclickLike ? handleDislike : () => {}}
              >
                <span>{dislikeCount}</span>{" "}
                <figure className="ml-2 mt-2">
                  <img
                    src={dislikeStatus ? DisLikeYes : DisLike}
                    alt="Like"
                    draggable={false}
                    className=" cursor-pointer "
                  />
                </figure>{" "}
              </p>
            </div>
          </div>
        </h1>
        {animeEpsURL.length > 0 && (
          <p className="text-2xl text-slate-200">Episode - {animeEpsURL[0].nbrps}</p>
        )}
        <p>
          VOST | <span className="text-blue-500 font-bold">Dub</span>
        </p>
        <p className="text-gray-400">{anime.description}</p>

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

