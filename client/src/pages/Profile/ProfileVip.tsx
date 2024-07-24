import { useParams } from "react-router-dom";
import Mainfooter from "../../components/MainFooter";
import MainHeader from "../../components/MainHeader";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { storage } from "../../models/Firebase";
import { v4 } from "uuid";
import { ref , uploadBytes } from "firebase/storage";

import { auth } from "../../models/Firebase";
import { signInWithEmailAndPassword , signOut } from "firebase/auth";
import Crownbtn from "../../../public/assets/icons/crown.png";

interface DecodedObject {
  id: string; // Change 'String' to 'string' to match TypeScript type conventions
  avatar: string
  otheraboutme: string
  aboutme:string
}

export default function ProfileVip({userCount} : {userCount: number}) {
  const { id } = useParams<{ id: string }>(); // Add type annotation for useParams

  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);

  // status
  const [avatar , setAvatar] = useState<File | null>(null);
  const [isSubmitting , setIsSubmitting] = useState<boolean>(false);

  const [disableChangeAvatar , setDisableChangeAvatar] = useState<boolean>(true);
  const [messageResavatar , setMessageResavatar] = useState<string>("");

  // information
  const [user,setUser] = useState<String>("");
  const [me,setMe] = useState<boolean>(false);
  const [otheravatar,setOtheravatar] = useState<String>("");
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

  
  // Submit Changz avatar
  
  const handupload = async (e: FormEvent) => {
   e.preventDefault();

   setMessageResavatar("Loading ...")
   
   
   if (avatar == null || me == false) return;
   if ((avatar.type !== "image/png") && (avatar.type !== "image/jpeg")) 
   {
    alert('Please select a PNG or JPEG image.'); // Show an error message
    return;
   }

   setIsSubmitting(true);
   

   await signInWithEmailAndPassword(auth,"upload@me.me","gitmegit");

   let myUUID = v4();
   const photoRef = ref(storage, `avatars/${myUUID}`);

   uploadBytes(photoRef,avatar)
   .then( async  () => {
    await signOut(auth);
      if ( token && decoded) {
         axios.post(`${SERVER}/api/profile/changeavatar`,{id : decoded.id , avatarID : myUUID , token})
         .then(() => {
            setIsSubmitting(false)
            
            
            window.location.href = "";
            
         }).catch( async (e) => {
          await signOut(auth);
          console.log(e);
          window.location.replace("/");
        })
      }
   }).catch( async (e) => {
          await signOut(auth);
          console.log(e);
          window.location.replace("/");
  })


}

useEffect(() => {

  if (avatar == null) {setDisableChangeAvatar(true)}
  if (avatar) {
      
      
      
        if ((avatar.type !== "image/png") && (avatar.type !== "image/jpeg")) 
        {
          setDisableChangeAvatar(true);
        }
        else {
          setDisableChangeAvatar(false)
        }
   }

   
  
} , [avatar]);



  return (
    <>
      {/* Header */}

      <MainHeader userCount={userCount} />

      {/* Hero */}
      <div className="hero min-h-screen bg-base-400">
        <div className="hero-content flex-col lg:flex-row">
          <img 
          src={decoded && me ? decoded.avatar : otheravatar ? `${otheravatar}` : `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/avatars%2Favatar.png?alt=media`} 
          className="max-w-sm rounded-lg shadow-2xl" 
          draggable={false} />

          <div>
           
            <h1 
              className=" flex items-center text-5xl font-bold text-white space-x-4">
              {user.toUpperCase()}
              <span 
                style={otherRanks === "Demo" ? { color : "gold"} : otherRanks === "VIP" ? {color:  "limegreen"} : otherRanks === "Admin" ? {color: "orangered"} : otherRanks === "Helper" ? { color: "deepskyblue" } :  {}  }
                
                className="  text-sm select-none ml-5 badge badge-secondary badge-outline ">
                {otherRanks}
              </span>
              <img src={Crownbtn} alt="Crownbtn" width={20} />
            </h1>

           

            <form onSubmit={handupload}>
                  <div style={me ? {display:"block"} : {display: "none"}} className="space-y-5">
                 
                  <input 
                      accept=".png, .jpg, .jpeg"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAvatar(e.target.files && e.target.files[0])}}
                      type="file"
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs  md:ml-5 bg-[#222] text-white " />

                  <button
                   className="btn btn-accent ml-5 "
                    disabled={disableChangeAvatar || isSubmitting} >
                    Change Avatar
                  </button>

                  <span className=" block ml-7 text-green-500 font-mono " > {messageResavatar} </span>

                  </div>
            </form>

            <p className=" text-gray-400 font-mono text-center uppercase ">
                Through this page, you can change your profile picture. To learn more about subscription and features, <span title="DISCORD : amadich" className="text-purple-500 cursor-default ">contact us</span>
            </p>
            
          </div>
        </div>
      </div>

      {/* Footer */}

      <Mainfooter />
    </>
  );
}
