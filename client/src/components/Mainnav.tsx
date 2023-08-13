import SupraMain from "../../public/assets/images/supramain.png";
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
                  <span className="text-red-500 font-bold text-3xl ">Burger<span className="text-white">Anime</span></span> is a captivating virtual sanctuary where anime enthusiasts embark on an exhilarating journey through a world of vibrant storytelling, boundless creativity, and awe-inspiring artistry. Nestled within its digital realm, this captivating website curates a delectable collection of hand-picked anime titles, serving them up like a gourmet spread of culinary wonders.
                  <br />
                  <button onClick={moveDown} id="btn_showme">Show me</button>
                  </p>
                  <img src={SupraMain} alt="Supra Anime" draggable={false} className="select-none hidden md:block"  />
                  </div>
               

         </nav>
      </>
    );
}

export default Mainnav;