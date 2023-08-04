import { Link } from "react-router-dom"
import "../assets/css/Headermain.css";
import Logo from "../../public/assets/logo.png";
function MainHeader() {
   return ( 
      <>
            <header className=" relative z-20 flex justify-around items-center h-16 bg-[#222] text-white">
               
               <div className="flex justify-around items-center">
                  
                  <Link to="/main"><img src={Logo} alt="Logo" width={50} draggable={false}/></Link>
                  <span className="ml-16 text-orange-300 hidden md:block">Burger </span>
                  <span className="hidden md:block">Anime </span>
                  
               </div>
               <ul className="flex space-x-8 text-gray-300 items-center">
                  <li className="hidden md:block text-orange-500 ">Home</li>
                  <Link to="/main"><li className="hidden md:block">Animes</li></Link>
                  <li className="hidden md:block">More</li>
                  <li className="hidden md:block">Search</li>

               <Link to="/signup">
                  <li>
                     <button className=" p-2 rounded-md bg-[#d64d2b] duration-300 text-white hover:bg-[#e48022]">Create new</button>
                  </li>
               </Link>
               </ul>
               
            
            </header>
            <div id="shd" className="mt-[-40%] md:mt-[-12%]  xl:mt-[-9%]"></div>
      </>
    );
}

export default MainHeader;