import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserData {
  _id: string;
  title: string;
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

export default function FilterIDanime() {
  const SERVER = import.meta.env.VITE_HOSTSERVER;
  const [animeList, setAnimeList] = useState<UserData[]>([]);
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

         <Link to="/dashboard" >
         <button className="btn btn-warning duration-500 hover:btn-primary">Dashboard</button>
         </Link>

      </div>
      <div className="overflow-x-auto ">
        <table className="table table-xs text-white font-bold text-center  " style={showsearchterm ? {display: "inline-table"}:  {display: "none"}}>
          <thead className="text-green-500">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredanime.map((user: UserData, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th>{user._id}</th>
                <td>{user.title}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
