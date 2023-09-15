import jwtDecode from "jwt-decode";
import { useState , useEffect  } from "react";
import MainHeader from "../../../components/MainHeader";
import K404 from "../../../../public/assets/images/konata_error_404_.png";
import KReadCataAfk from "../assets/images/catalog_afk.png";
{/* Firebase Imported */}
import { storage } from "../../../models/Firebase";
import { v4 } from "uuid";
import { ref , uploadBytes } from "firebase/storage";
import axios from "axios";
import FilterIDanime from "./FilterIDanime";
import Mainfooter from "../../../components/MainFooter";
import { Link } from "react-router-dom";

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
export default function AddEpes() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;

   // status
  const [animeimg1 , setAnimeImg1] = useState<File | null>(null);

   const token = window.localStorage.getItem("token");
   const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
   const [btndisable , setBtndisable] = useState<boolean>(true);

   
   const [idanime , setIDanime] = useState<string>("");
   const [animeurl , setAnimeurl] = useState<String>("");
   const [nbrps , setNbrps] = useState<Number>(0);

   // get state for show loading uploaded ...
   const [loadup , setLoadUp] = useState<String>("Loading ...");
   const [fixloadup , setFixloadUp] = useState<boolean>(false);


  {/* Submit The Form Data to Server .... */}
   const handsubmit = () => {
      
      

      if ((animeimg1) == null) return;
      
      if (animeimg1) {
         if ((animeimg1.type !== "image/png") && (animeimg1.type !== "image/jpeg")) 
            {
            alert('Please select a PNG or JPEG image.'); // Show an error message
            return;
            }
      }

   

      setFixloadUp(true);

   let myUUID_1 = v4();
   const photoRef = ref(storage, `animes/eps/${myUUID_1}`);

   if (animeimg1) {
   
   
      uploadBytes(photoRef, animeimg1)
      .then(() => {
         setLoadUp("Uploaded Successfully !!");
         

      
         const formData = {
            IDanime : idanime,
            nbrps,
            epsimage : myUUID_1,
            epsurl : animeurl
         
         }
         console.log(formData);
         

          axios.post(`${SERVER}/api/dashboard/addEps`, formData)
         .then((response) => {
            console.log(response.data);
            window.location.href = "/dashboard_helper";
            
         })
         

      } ).catch((e) => {console.log(e);}) 


   }

      
   }

   {/* Effects to accept change inputs !! */}




   useEffect(() => {
      if (idanime) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [idanime] )


   useEffect(() => {
      if (animeurl) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeurl] )

   useEffect(() => {
      if (nbrps) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [nbrps] )





   useEffect(() => {
      if (animeimg1) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeimg1] )


   const clickbacktoTrue = () => {
      setTimeout(() => {
         setBtndisable(true);
      }, 10);
      
   }

   {/* Check you are admin or not !! */ }

   useEffect(() => {
      if (token) {
        
         try {
             // Decode the token and store the decoded object in state
            const decodedToken = jwtDecode(token);
            setDecoded(decodedToken as DecodedObject);
            
               if (Number(decoded?.ranks.admin) == 0 && Number(decoded?.ranks.helper) == 0) {
                  window.location.href = "/"; 
                  
                  
               }
               
            
         } catch (error) {
               console.log(error);
                     
         }

      } 
      else {
         window.location.href = "/"; 
      }
   }, [token]);


    // Function to set idanime in AddEpes component
  const handleAddToIDanime = (IDanime: string) => {
   setIDanime(IDanime);
 };


   return ( 
      <>
            <MainHeader />
             {/* Filter ID Anime */}

           <FilterIDanime onAddToIDanime={handleAddToIDanime} />

           <nav className="  carousel w-full flex items-center m-auto text-center md:hidden  ">

           <figure className="m-auto relative">
               <img 
                  draggable={false}
                  src={K404} 
                  alt="Error 404" 
                  width={250} 
                  className="m-auto "
               />
               <p 
                  className="mt-[-5em] text-[#222] w-28 m-auto font-bold relative z-10"
               >
                  You Need a <span className="text-blue-500">Big Screen</span> to Use This!!
               </p>
            </figure>

           </nav>

               {/* */}

               <article className="w-[80%] m-auto mt-32 select-none ">
                  <p className="text-gray-500 w-[80%] duration-300 hover:text-gray-400 font-bold ">
                  The <span className="font-bold text-green-500 duration-200 hover:text-blue-500 ">Add Anime Episodes</span> page is a dedicated section within the dashboard of an application designed for administrators. Its primary purpose is to allow administrators to add new anime titles to the application's database. This feature enables the platform to expand its library of available anime content. 
                  </p>
               </article>

            {/* */}

            <nav className="  carousel w-full hidden md:flex select-none text-white ">
            
           

            <div id="slide1" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                           
                     <figure>
                     <img src={KReadCataAfk} alt="Catalog_Afk" width={150} draggable={false} />
                     </figure>
                           <input
                           className=" w-96 m-5 input bg-transparent text-white border border-green-500 font-bold" 
                           placeholder="ID Anime "
                           type="text" 
                           value={idanime}
                           onChange={(e) => {setIDanime(e.target.value)}}
                           
                           />
                           
                           <a href={!btndisable ? "#slide2" : ""}>
                           <button 
                           
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent"
                           onClick={clickbacktoTrue}>Next</button>
                           </a>
                        </div>
                        
            </div>


            <div id="slide2" className="carousel-item relative w-full">
                     <div className=" justify-around items-center m-auto text-center">
                     <a href="#slide1" >
                           <button 
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}

                           <input
                           className=" w-96 m-5 input bg-transparent text-white border border-green-500 font-bold" 
                           placeholder="Anime Frame HTML URL ..."
                           type="text" 
                           onChange={(e) => {setAnimeurl(e.target.value)}}/>

                           <div className="pb-5">
                              <Link to="/learn_discord" target="_blank" className="text-blue-500 underline uppercase" >
                              How can I get the URL?
                                 </Link>
                           </div>
                          
                          <a href="#slide3">
                           <button 
                           onClick={clickbacktoTrue}
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>


            <div id="slide3" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide2" >
                           <button 
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}

                           <input
                           className=" w-96 m-5 input bg-transparent text-white border border-green-500 font-bold" 
                           placeholder="Episode Number ..."
                           type="number" 
                           onChange={(e) => {setNbrps(Number(e.target.value))}}/>
                          
                          <a href="#slide4">
                           <button 
                           onClick={clickbacktoTrue}
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>



            



           

           



            



            <div id="slide4" className="carousel-item relative w-full">
                                 
                     <div className="flex justify-around items-center m-auto text-center">
                        
                     <a href="#slide3">
                           <button 
                           style={ !fixloadup ? { display: "block" } : { display: "none" } } 
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}

                           <label  style={ !fixloadup ? { display: "block" } : { display: "none" } } >
                              <span className="pl-10">Anime Episode Origin Image : </span>
                           <input 
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAnimeImg1(e.target.files && e.target.files[0])}}
                           type="file" 
                           accept=".png, .jpg, .jpeg"
                           className="file-input file-input-bordered file-input-success  w-full max-w-xs m-5 bg-[#222] " />
                           </label>
                           
                           
                          
                           <button 
                           disabled={fixloadup}
                           onClick={handsubmit}
                           className="btn  duration-500 btn-accent">Finish</button>

                              <div 
                              className="  ml-10 " 
                              style={ fixloadup ? { display: "block" } : { display: "none" } } 
                              >
                                    <h1 className="text-green-500 font-mono" >{loadup}</h1>
                              </div>
                          
                        </div>

                        
            </div>


            


            
               
            </nav>

           
          {/* Footer */}

          <Mainfooter />
            

      </>
    );
}
