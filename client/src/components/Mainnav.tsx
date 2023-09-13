import SupraMain from "../../public/assets/images/supramain_1.png";
import Burgeranime_sh_0 from "../../public/assets/Burgeranime_sh_0.png";
import "../assets/css/Navmain.css"
function Mainnav() {
   const moveDown = () => {
      document.getElementById("main_article")?.scrollIntoView({
         behavior: "smooth"
      })
   }
   return ( 
      <>
         <nav>


                  <div className=" m-28 flex justify-around">
                  <p className="text-white md:w-96 font-mono select-none hidden md:block">
                  <span className="text-orange-500 font-bold text-6xl uppercase  ">Burger<span className="text-white">Anime</span></span> 
                  <span className="block text-gray-100">
                     is a captivating virtual sanctuary where anime enthusiasts embark on an exhilarating journey through a world of vibrant storytelling, boundless creativity, and awe-inspiring artistry. Nestled within its digital realm, this captivating website curates a delectable collection of hand-picked anime titles, serving them up like a gourmet spread of culinary wonders.
                  </span>
                  <br />
                  {/* <button onClick={moveDown} id="btn_showme">Show me</button> */}
                  <figure onClick={moveDown} className=" hidden duration-500 hover:mt-[-70%] cursor-pointer ">
                     <img src={Burgeranime_sh_0} alt="Burgeranime_sh0" draggable={false} />
                  </figure>
                  </p>
                  <img src={SupraMain} alt="Supra Anime" draggable={false} className="select-none hidden md:block scale-x-[-1] "  />
                  </div>
               

         </nav>
      </>
    );
}

export default Mainnav;
