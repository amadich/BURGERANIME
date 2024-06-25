import { Link } from "react-router-dom";
import SearchLogo from "../../../../public/assets/icons/search.png";
import Logo from "../../../../public/assets/logo.png";
import Avatardash from "../../../components/Avatardash";
import Crown from "../../../../public/assets/icons/crown.png";


function AvatarHeader() {
   return ( 
      <>
         <div className="navbar select-none relative z-50 ">
                  <div className="flex-1 ">
                     <ul className="md:flex hidden space-x-10 text-white ml-16 items-center ">
                        <Link to="/"><li><img src={Logo} width={40} className=" duration-150 hover:w-[45px] " /></li></Link>
                        <Link to="/series"><li>Series</li></Link>
                        <Link to="/movies"><li>Movies</li></Link>
                        <li 
                              className="inline-flex items-center space-x-3 cursor-not-allowed duration-300 hover:text-orange-500 hover:font-semibold" >
                              <span>Premium</span>
                              <img src={Crown} alt="Crown Logo" width={16} draggable={false} /> 
                        </li>
                     </ul>
                    <Link to="/">
                        <img src={Logo} alt="Logo" width={50} draggable={false}
                        className="flex md:hidden ml-16" />
                    </Link>
                  </div>
                  <div className="flex-none gap-6">
                     <Link to="/search">
                        <div className="form-control">
                           <img src={SearchLogo} alt="Search" width={25}
                           style={{ filter: 'brightness(0) invert(1)', color: 'white' }}
                           
                           />
                        </div>
                     </Link>
                     <Avatardash />
                  </div>
            </div>
      </>
    );
}

export default AvatarHeader;
