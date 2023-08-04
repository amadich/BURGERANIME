import { useEffect } from "react";
import "../assets/css/mainchain.css";
function NavTitle() {
   const Mytitle = "ready to start watching";

   useEffect(() => {
      // animataion texteur !
            setTimeout(() => {
               let t = document.getElementById("title_nav");
               let text = 'jujutsu kaisen'.toUpperCase();
               let i = 0;
               let type = () => {
               if (i < text.length) {
                     if (t) {
                        t.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, 100)
                     }
               }

               }
               type();
            },500)


            // fin animation
   }, [])

   return ( 
      <>
         <div className="  p-20" id="chnav">
            <h1 className="text-white font-bold text-3xl md:text-5xl  md:w-[50%]">
               {Mytitle.toUpperCase() }

               <p id="title_nav" className="mt-10 text-gray-300">
               
               </p>

            </h1>

               <div>
               <button id="btn_chaine" className=" w-28 h-8 font-mono  text-white border-none mt-5 duration-300 hover:w-36 hover:text-black">Play ♣</button>
               </div>
         </div>
      </>
    );
}

export default NavTitle;