import { Link } from "react-router-dom";
import MainHeader from "../../../components/MainHeader";
import Mainfooter from "../../../components/MainFooter";

export default function Learn_discord() {
   return ( 
      <>
         <MainHeader />
         <div className="block m-auto text-center">
            <Link to="https://discord.gg/VU8Xe9r4n6" target="_blank">
               <button className="btn btn-primary">
                  Discord BURGER ANIME 
               </button>
            </Link>

            <div className="text-center block m-auto mt-5">
            <video src="https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/videos%2FBurgernewGetdiscordbot.mp4?alt=media" controls
            className="m-auto rounded-xl shadow-orange-600 border border-orange-500 " ></video>

            </div>
         </div>
         <Mainfooter />
      </>
    );
}