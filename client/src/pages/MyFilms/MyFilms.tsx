import Mainfooter from "../../components/MainFooter";
import AvatarHeader from "../ch/components/Avatarheader";
import GetMyFilms from "./components/GetMyFilms";

export default function MyFilms({userCount} : {userCount: number}) {
   return ( 
      <>
         <AvatarHeader userCount={userCount} />
         <GetMyFilms />
         <Mainfooter />
      </>
    );
}