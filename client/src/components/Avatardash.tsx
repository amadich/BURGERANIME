import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AvatarDemo from "../../public/assets/icons/avatar.png";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

// Define the interface for the decoded object
interface DecodedObject {
  id : String,
  avatar: String,
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
}

export default function Avatardash() {
  const [showAvatar, setShowAvatar] = useState<boolean>(true); // Set this to true initially
  const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
  const token = window.localStorage.getItem("token");
  const [_,setCookies] = useCookies(["burgertoken"]);

  useEffect(() => {
    if (token) {
      setShowAvatar(false); // Set showAvatar to false if token is present
      try {
        // Decode the token and store the decoded object in state
        const decodedToken = jwtDecode(token);
       
        
        setDecoded(decodedToken as DecodedObject);
      } catch (error) {
        // Handle invalid token (optional)
        console.error("Invalid token:", error);
      }
    }
  }, [token]); // Only run this effect when token changes


  /* Logout system */
  const Logoutuser = () => {
    window.localStorage.removeItem("token");
    setCookies("burgertoken","");
    window.location.href = "/signin";
    
  }

  return (
    <>
      {showAvatar ? (
        // Show the "Create new" button if showAvatar is true
        <Link to="/signup">
          <button className="p-2 rounded-md bg-[#d64d2b] duration-300 text-white hover:bg-[#e48022]">
            Create new
          </button>
        </Link>
      ) : (
        // Show the avatar dropdown if showAvatar is false and decoded is not null
        decoded && (
          <div className="dropdown dropdown-end mr-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img 
                
                src={decoded.avatar == "demo.png" ? AvatarDemo : `${decoded.avatar}`} 
                alt="Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content text-white rounded-box w-52 bg-[#222]"
            >
              <Link to={`/profile/${decoded.id}`}>
                  <li>
                    <span className="justify-between">
                      Profile
                      <span
                        className="badge border-none text-black"
                        style={
                          decoded.ranks.admin === 1 && decoded.ranks.demo === 0
                            ? { backgroundColor: "orangered" }
                            : { backgroundColor: "gold" }
                        }
                      >
                        {decoded.ranks.vip === 1 ? "VIP " : null}
                        {decoded.ranks.admin === 1 && decoded.ranks.helper === 1
                          ? "Admin"
                          : 
                          decoded.ranks.helper === 1 && decoded.ranks.admin === 0 ? "Helper " : null
                          }
                        
                        

                      </span>
                    </span>
                  </li>
              </Link>
              
              <li>
                <a>Settings</a>
              </li>
              <li onClick={Logoutuser}>
                <a>Logout</a>
              </li>
              {
               decoded.ranks.admin === 1 && decoded.ranks.demo === 0
                      ? <Link to="/dashboard" className="text-center"><li className="btn bg-orange-500 text-white mt-5">Dashboard</li></Link>
                      : null
               }

{
               decoded.ranks.helper === 1
                      ? <Link to="/dashboard_helper" className="text-center"><li className="btn bg-blue-700 text-white mt-5">Dashboard Helper</li></Link>
                      : null
               }
            </ul>
          </div>
        )
      )}
    </>
  );
}
