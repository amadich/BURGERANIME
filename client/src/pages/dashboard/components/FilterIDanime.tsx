import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface By_Anime {
  adminID : string;
  Name : string ;
}

interface AnimeData {
  _id: string;
  title: string;
  by_admin?: By_Anime;
}



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

interface FilterIDanimeProps {
  onAddToIDanime: (IDanime: string) => void;
}

export default function FilterIDanime({ onAddToIDanime }: FilterIDanimeProps) {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [animeList, setAnimeList] = useState<AnimeData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showsearchterm , setShowsearchterm] = useState<boolean>(false);
  
  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);


  useEffect(() => {
   searchTerm ? setShowsearchterm(true) : setShowsearchterm(false)
  }, [searchTerm])

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken as DecodedObject);

        if (Number(decoded?.ranks.admin) === 0 && Number(decoded?.ranks.helper) === 0 ) {
          window.location.href = "/";
        } else {
          axios.get(`${SERVER}/api/dashboard/getlistanime`)
            .then((response) => {
              setAnimeList(response.data.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/";
    }
  }, [token]);

  const filteredanime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anime._id.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Click #idinputanime
  const AddtoIDinputAnime = (IDanime: string) => {
    onAddToIDanime(IDanime);
  };
  

  return (
    <>
      <div className="flex justify-around items-center mt-10 p-10 select-none m-auto ">
         
        <input
          type="text"
          placeholder="Search by Anime Title or ID"
          value={searchTerm}
          className="input w-[70%] bg-transparent outline-none border-b border-b-green-500 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

         <Link to="/dashboard_helper" >
         <button className="btn btn-warning duration-500 hover:btn-primary">Dashboard</button>
         </Link>

      </div>
      <div className="overflow-x-auto ">
        <table className="table table-xs text-white font-bold text-center  " style={showsearchterm ? {display: "inline-table"}:  {display: "none"}}>
          <thead className="text-green-500">
            <tr className="border-b border-green-500">
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Uploded By</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredanime.map((user: AnimeData, index) => (
              <tr key={user._id} className="border-none">
                <th>{index + 1}</th>
                <th onClick={ () => AddtoIDinputAnime(user._id)} className=" cursor-pointer duration-300 hover:text-green-500 hover:text-xl " >{user._id}</th>
                <td>{user.title}</td>
                <td> <span>{user.by_admin?.Name || ""}</span> |  <span className="text-green-500" >{ user.by_admin?.adminID || "" }</span> </td> {/* Use optional chaining */}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
