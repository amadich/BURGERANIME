import { useCookies } from "react-cookie";

import Profile_setting from "../components/Profile_setting";
import { Link } from "react-router-dom";

function Profile({user}) {
   const [cookie,setCookie] = useCookies(["acc_tokens"]);
   const storedUser = user ;//JSON.parse(window.localStorage.getItem("User"));
   return ( 
      <>
           
            
            <div className="flex justify-between bg-[#46393969]">

            <div className="drawer drawer-mobile mt-16 inline-flex ">
                  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                  
                  <div className="drawer-side ">
                     <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                     <ul className="menu p-4 w-80  text-gray-100  bg-[#454]">
            
                        <li><a>Profile Setting</a></li>
                        <li><a>Change Information</a></li>
                        {
                           storedUser.ranks.admin == 1 ? <li><Link to="Console">Console Admin</Link></li> : null
                        }
                     </ul>
                  
                  </div>
                  <div className="drawer-content flex flex-col items-center justify-center">
                  
                     <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden ">Open drawer</label>
                  
                  </div> 
            </div>

   
               <Profile_setting />

            </div>

      </>
    );
}

export default Profile;