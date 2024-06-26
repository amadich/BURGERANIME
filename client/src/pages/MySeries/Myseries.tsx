import Mainfooter from "../../components/MainFooter";
import AvatarHeader from "../ch/components/Avatarheader";
import GetMySeries from "./components/GetMySeries";

export default function Myseries({ userCount }: { userCount: number}) {
   return ( 
      <>
         <AvatarHeader userCount={userCount} />
         <GetMySeries />
         <Mainfooter />
      </>
    );
}