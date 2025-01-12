import { Link } from "react-router-dom";
import Logo from "../../public/assets/logo.png";
import "../assets/css/Footermain.css";
function Mainfooter() {
   return ( 
      <>
         <footer className=" h-full mt-10 p-10">
            <div className="flex justify-around items-center">
               <p className="text-white font-bold">All <Link to={"/copyright"}><span className=" text-orange-400 duration-150 hover:text-orange-500 ">© copyrights</span></Link> are reserved 
                <span className="text-gray-500"> Github/amadich 😺</span>
               </p>
               <img src={Logo} alt="Logo" width={50} />
            </div>

       

         </footer>
      </>
    );
}

export default Mainfooter;