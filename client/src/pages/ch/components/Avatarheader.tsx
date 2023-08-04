import { Link } from "react-router-dom";
import AvatarDemo from "../../../../public/assets/icons/avatar.png";
import SearchLogo from "../../../../public/assets/icons/search.png";
import Logo from "../../../../public/assets/logo.png";
function AvatarHeader() {
   return ( 
      <>
         <div className="navbar select-none relative z-50 ">
                  <div className="flex-1">
                     <ul className="md:flex hidden space-x-10 text-white ml-16 ">
                        <Link to="/"><li>Home</li></Link>
                        <li>Series</li>
                        <li>Movies</li>
                        <li>Premier</li>
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
                     <div className="dropdown dropdown-end mr-10">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                           <img src={AvatarDemo} />
                        </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu  menu-sm dropdown-content text-white rounded-box w-52 bg-[#222]">
                        <li>
                           <a className="justify-between">
                              Profile
                              <span className="badge bg-amber-400 border-none text-black">VIP</span>
                           </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                        </ul>
                     </div>
                  </div>
            </div>
      </>
    );
}

export default AvatarHeader;