import { Link } from "react-router-dom"
import "../assets/css/Headermain.css";
import Logo from "../../public/assets/logo.png";
import Avatardash from "./Avatardash";
function MainHeader() {

   const moveDown = () => {
      document.getElementById("main_article")?.scrollIntoView({
         behavior: "smooth"
      })
   }

   return ( 
      <>
            <header className=" relative z-20 flex justify-around items-center h-16 bg-[#222] text-white">
               
               <div className="flex justify-around items-center">
                  
                  <Link to="/main"><img src={Logo} alt="Logo" width={50} draggable={false}/></Link>
                  <span className="ml-16 text-orange-300 hidden md:block">Burger </span>
                  <span className="hidden md:block">Anime </span>
                  
               </div>
               <ul className="flex space-x-8 text-gray-300 items-center">
                  <Link to="/"><li className="hidden md:block text-orange-500 ">Home</li></Link>
                  <Link to="/main"><li className="hidden md:block">Animes</li></Link>
                  <li onClick={moveDown} className="hidden md:block cursor-pointer ">More</li>
                  <Link to="/search"><li className="hidden md:block">Search</li></Link>

                  <li><Avatardash /></li>
               </ul>
               
            
            </header>
            <div id="shd" className="mt-[-40%] md:mt-[-12%]  xl:mt-[-9%]"></div>
      </>
    );
}

export default MainHeader;