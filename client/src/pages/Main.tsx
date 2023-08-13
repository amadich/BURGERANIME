import Mainarticle from "../components/MainArticle";
import Mainfooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import Mainnav from "../components/Mainnav";
import Mainscene from "../components/Mainscene.";

function Main() {
   return ( 
      <>
         <Mainscene />
         <MainHeader />
         <Mainnav />
         <Mainarticle />
         <Mainfooter />
      </>
    );
}

export default Main;