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
}

export default function Search({ userCount }: { userCount: number}) {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [listAnime, setListAnime] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${SERVER}/api/dashboard/getlistanime`).then((response) => {
      const listAnimeData: Anime[] = response.data.data;
      setListAnime(listAnimeData);
    });
  }, []);

  // Function to handle genre selection/deselection
  const handleGenreSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      // Deselect genre
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      // Select genre
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Filter anime based on search query and selected genres
  const filteredAnime = listAnime.filter((anime) => {
    const titleMatches = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const genreMatches =
      selectedGenres.length === 0 || selectedGenres.every((genre) => anime.genres.includes(genre));
    return titleMatches && genreMatches;
  });

  return (
    <>
      <AvatarHeader userCount={userCount} />
      <div className="text-center">
        <input
          className="w-[80%] border-b border-b-orange-500 bg-transparent text-3xl p-5 outline-none text-white font-bold"
          placeholder="Search..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Genre selection section */}
      <div className="text-center mt-4">
        <h2 className="text-white text-xl font-bold">Filter by Genres:</h2>
        <div className=" flex-wrap justify-center space-x-4 space-y-4 mt-5 w-[70%] m-auto ">
          {listAnime.reduce((genres, anime) => {
            anime.genres.forEach((genre) => {
              if (!genres.includes(genre)) {
                genres.push(genre);
              }
            });
            return genres;
          }, [] as string[]).map((genre) => (
            <button
              key={genre}
              className={`${
                selectedGenres.includes(genre)
                  ? "bg-orange-500 text-white"
                  : "bg-transparent text-orange-500"
              } border border-orange-500 px-3 py-1 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white transition-colors`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-full mt-16 p-16 space-y-4 m-auto text-center">
        <h1 className="text-white text-2xl font-bold"></h1>

        <div className="flex overflow-auto md:inline-grid md:grid-cols-2 gap-4 space-x-4">
          {filteredAnime.map((anime) => (
            <Link to={`/series/${anime._id}`} key={anime._id}>
              <div className="w-64  m-1 bg-[#0000004a] cursor-pointer">
                <div
                  style={{ backgroundImage: `url(${anime.imageUrl2})` , backgroundSize: "cover" , backgroundPosition: "center" , backgroundRepeat: "no-repeat"}}
                  className="h-32 bg-cover bg-center bg-no-repeat duration-500 hover:transition-opacity hover:opacity-25"
                ></div>
                <div className="p-5" title={anime.title}>
                  <h1 className="text-xl text-white font-bold overflow-hidden overflow-ellipsis truncate">
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
