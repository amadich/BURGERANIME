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

interface DecodedObject {
  id: string; // Change 'String' to 'string' to match TypeScript type conventions
  avatar: string
  otheraboutme: string
  aboutme:string
}

export default function Profile() {
  const { id } = useParams<{ id: string }>(); // Add type annotation for useParams

  const SERVER = import.meta.env.VITE_HOSTSERVER;

  const token = window.localStorage.getItem("token");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);

  // status
  const [avatar , setAvatar] = useState<File | null>(null);
  const [isSubmitting , setIsSubmitting] = useState<boolean>(false);
  const [isclickupdate , setIsclickupdate] = useState<boolean>(false);
  const [aboutme,setAboutme] = useState<String>("");

  const [disableChangeAvatar , setDisableChangeAvatar] = useState<boolean>(true);

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
  // Submit Changz avatar
  
  const handupload = async (e: FormEvent) => {
   e.preventDefault();
   
   
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
                     placeholder="..."
                     className="bg-transparent outline-none w-96 md:w-full text-white font-bold "
                     defaultValue={decoded && me ? `${decoded.aboutme}` : `${otheraboutme}`}
                     />

            </div>

            <button
            disabled={isclickupdate}
            onClick={handupdateabout}
            style={me ? {display:"block"} : {display: "none"}}
             type="button" 
             className="btn btn-secondary">
               Update Information
            </button>

            <form onSubmit={handupload}>
                  <div style={me ? {display:"block"} : {display: "none"}} className="space-y-5">
                  <button
                   className="btn btn-primary"
                    disabled={disableChangeAvatar || isSubmitting} >
                    Change Avatar</button>
                  <input 
                  accept=".png, .jpg, .jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAvatar(e.target.files && e.target.files[0])}}
                  type="file"
                     className="file-input file-input-bordered file-input-primary w-full max-w-xs ml-1 md:ml-5" />


                  </div>
            </form>
            
          </div>
        </div>
      </div>

      {/* Footer */}

      <Mainfooter />
    </>
  );
}
