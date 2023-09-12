import { Link, useParams } from "react-router-dom";
import Mainfooter from "../../components/MainFooter";
import MainHeader from "../../components/MainHeader";
import Crownbtn from "../../../public/assets/icons/crown.png";
import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";


interface DecodedObject {
  id: string; // Change 'String' to 'string' to match TypeScript type conventions
  avatar: string;
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
  otheraboutme: string
  aboutme:string
}

export default function Profile() {
  const { id } = useParams<{ id: string }>(); // Add type annotation for useParams

  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);

  // status

  const [isclickupdate , setIsclickupdate] = useState<boolean>(false);
  const [aboutme,setAboutme] = useState<String>("");

  const [disableChangeInfo , setDisableChangeInfo] = useState<boolean>(true);

  // information
  const [user,setUser] = useState<String>("");
  const [me,setMe] = useState<boolean>(false);
  const [otheravatar,setOtheravatar] = useState<String>("");
  const [otheraboutme,setOtherAboutme] = useState<String>("");
  const [otherRanks , setOtherRanks] = useState<String>("");


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedObject; // Add type assertion to match DecodedObject interface
      setDecoded(decodedToken);
      axios
        .get(`${SERVER}/api/profileinfo/${id}/${decodedToken.id}`) // Use decodedToken.id instead of decoded.id
        .then((response) => {
         setUser(response.data.username);
         setMe(response.data.me);
         setOtheravatar(response.data.avatar);
         setOtherAboutme(response.data.aboutme);

         {/* Ranks Other users */}
         response.data.ranks.demo === 1 ? setOtherRanks("Demo") : null;
         response.data.ranks.vip === 1 ? setOtherRanks("VIP") : null;
         response.data.ranks.helper === 1 ? setOtherRanks("Helper") : null;
         response.data.ranks.admin === 1 ? setOtherRanks("Admin") : null;

         
         


        })
        .catch((error) => {
          console.error("Error fetching profile info:", error);
        });
    }

    else {
      window.location.href = "/signin";
    }


    

  }, [id, token , me]); // Include 'id' and 'token' in the dependency array

  // Click Update information
  const handupdateabout = () => {
   setIsclickupdate(true);
   decoded && axios.post(`${SERVER}/api/profile/updateaboutme`, {id : decoded.id  , aboutme})
   .then((response) => {
      alert(response.data.message);
      setIsclickupdate(false);
   })
  }
  

  useEffect(() => {
      if (aboutme) {
        setDisableChangeInfo(false);
      }
      else {
        setDisableChangeInfo(true);
      }
  },[aboutme])

  return (
    <>
      {/* Header */}

      <MainHeader />

      {/* Hero */}
      <div className="hero min-h-screen bg-base-400">
        <div className="hero-content flex-col lg:flex-row">
          <img 
          src={decoded && me ? decoded.avatar : otheravatar ? `${otheravatar}` : `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/avatars%2Favatar.png?alt=media`} 
          className="max-w-sm rounded-lg shadow-2xl" 
          draggable={false} />

          <div>
            <h1 
              className="text-5xl font-bold text-white">
              {user.toUpperCase()}
              <span 
                style={otherRanks === "Demo" ? { color : "gold"} : otherRanks === "VIP" ? {color:  "limegreen"} : otherRanks === "Admin" ? {color: "orangered"} : otherRanks === "Helper" ? { color: "deepskyblue" } :  {}  }
                
                className="pl-5  text-sm select-none">
                {otherRanks}
              </span>
            </h1>

            <div className="py-6">
              <h1 className=" text-3xl font-mono text-gray-500">About me</h1>
              <textarea
              onChange={(e) => {setAboutme(e.target.value)}}
                     rows={5}
                     cols={100}
                     readOnly={!me}
                     style={!me ? { resize: "none" } : {}}
                     maxLength={250}
                     placeholder="..."
                     className="bg-transparent outline-none w-96 md:w-full text-white font-bold "
                     defaultValue={decoded && me ? `${decoded.aboutme}` : `${otheraboutme}`}
                     />

            </div>

            <button
            disabled={isclickupdate || disableChangeInfo }
            onClick={handupdateabout}
            style={me ? {display:"block"} : {display: "none"}}
             type="button" 
             className="btn btn-secondary">
               Update Information
            </button>

            
                <button 
                disabled={ decoded?.ranks.vip == 1 ? false : true }
                  style={ me ? {display: "block"} : {display:"none"} }
                className="  btn btn-accent mt-5  ">
                  <Link 
                  className="flex justify-between items-center space-x-4"
                  to={ decoded?.ranks.vip === 1 ? `/profile/${decoded.id}/changeavatar` : "" } 
                  >
                    <p>Change Avatar</p>
                    <img src={Crownbtn} alt="Crownbtn" width={20} />
                  </Link>
                </button>
           
            
          </div>
        </div>
      </div>

      {/* Footer */}

      <Mainfooter />
    </>
  );
}
