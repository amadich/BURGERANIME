import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

// Define the interface for the decoded object
interface DecodedObject {
  id: string;
  avatar: string;
  ranks: {
    admin: number;
    helper: number;
    demo: number;
    vip: number;
  };
  favoriteAnime: string[];
  aboutme: string;
  datecreate: string;
  iat: number;
}

const Dock = () => {
  const [active, setActive] = useState("home");
  const [decoded, setDecoded] = useState<DecodedObject | null>(null);
  const [_, setCookies] = useCookies(["burgertoken"]);
  const [showDock, setShowDock] = useState(true); // State to control visibility of the dock

  // Default navigation items
  const navItems = [
    { id: "home", label: "Home", icon: "fas fa-home", path: "/" },
    { id: "seriesanime", label: "Series", icon: "fas fa-tv", path: "/series" },
    { id: "movies", label: "Movies", icon: "fas fa-film", path: "/movies" },
    // Add the Chat item here
    { id: "chat", label: "Chat", icon: "fas fa-comment", path: "/chat" },
  ];

  const token = window.localStorage.getItem("token");
  const SERVER = import.meta.env.VITE_HOSTSERVER;

  useEffect(() => {
    if (token) {
      axios
        .post(`${SERVER}/api/auth`, { token })
        .then((response) => {
          const newToken = response.data.token;
          if (newToken) {
            window.localStorage.setItem("token", newToken);
            setCookies("burgertoken", newToken);

            try {
              const decodedToken = jwtDecode(newToken);
              setDecoded(decodedToken as DecodedObject);
            } catch (error) {
              console.log(error);
            }
          } else {
            window.localStorage.removeItem("token");
            setCookies("burgertoken", "");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [token, SERVER, setCookies]);

  // Render admin and VIP-specific navigation items
  const renderAdminAndVipItems = () => {
    const items = [];

    if (decoded) {
      items.push({
        id: "profile",
        label: "Profile",
        icon: "fas fa-user",
        path: `/profile/${decoded?.id}`,
      });
    }

    if (decoded?.ranks.helper === 1) {
      items.push({
        id: "dashboard",
        label: "Dashboard",
        icon: "fas fa-tachometer-alt",
        path: "/dashboard_helper",
      });
    }
    if (decoded?.ranks.vip === 1) {
      items.push({
        id: "editprofile",
        label: "Edit Profile",
        icon: "fas fa-edit",
        path: `/profile/${decoded?.id}/changeavatar`,
      });
    }
    return items;
  };

  // Combine default nav items with admin/VIP-specific items
  const updatedNavItems = [
    ...navItems,
    ...renderAdminAndVipItems(),
  ];

  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowDock(false); // Hide the dock when scrolling down
      } else {
        setShowDock(true); // Show the dock when scrolling up
      }
      lastScrollY = window.scrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mini Icon Button to toggle Dock */}
      <div
        onClick={() => setShowDock(!showDock)}
        className="fixed bottom-6 left-10 transform z-50 flex items-center justify-center bg-blue-500 text-white w-10 h-10 rounded-full cursor-pointer"
      >
        <i className={`${showDock ? "fas fa-chevron-left" : "fas fa-chevron-right"} text-xl`}></i>
      </div>

      {/* Dock Container */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
          showDock
            ? "opacity-100 visibility-visible "
            : "opacity-0 visibility-hidden translate-x-[100%]"
        }`}
        style={{
          transition: "transform 0.5s ease, opacity 0.5s ease, visibility 0s 0.5s", // Visibility happens after transform and opacity
        }}
      >
        <div className="flex bg-[#22222299] backdrop-blur-md rounded-full px-4 py-2 shadow-2xl space-x-6">
          {updatedNavItems.map((item) => (
            <div
              key={item.id}
              className={`group relative transition-all ${
                active === item.id ? "scale-110" : ""
              }`}
              onMouseEnter={() => setActive(item.id)}
            >
              <span className="absolute bottom-14 text-xs px-2 py-1 bg-orange-500 text-black font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>

              <Link to={item.path} className="w-full h-full flex items-center justify-center">
                <button
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    active === item.id
                      ? "border-orange-500 text-white shadow-lg"
                      : "border-transparent bg-transparent text-gray-400"
                  } transform hover:scale-110 transition-all duration-300`}
                  onClick={() => setActive(item.id)}
                >
                  <i
                    className={`${item.icon} text-xl ${
                      active === item.id ? "animate-spin-slow" : ""
                    }`}
                  ></i>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dock;
