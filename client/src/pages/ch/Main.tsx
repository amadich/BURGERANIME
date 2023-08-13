import AnimeList from "./components/AnimeList";
import AvatarHeader from "./components/Avatarheader";
import ChScene from "./components/ChScene";
import NavTitle from "./components/NavTitle";

function Main() {
   return ( 
      <>
         <ChScene />
         <AvatarHeader />
         <NavTitle />
         <AnimeList />
      </>
    );
}

export default Main;