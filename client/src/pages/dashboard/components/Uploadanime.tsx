import jwtDecode from "jwt-decode";
import { useState , useEffect } from "react";
import MainHeader from "../../../components/MainHeader";
import K404 from "../../../../public/assets/images/konata_error_404_.png";
import KReadCataAfk from "../assets/images/catalog_afk.png";
{/* Firebase Imported */}
import { storage } from "../../../models/Firebase";
import { v4 } from "uuid";
import { ref , uploadBytes } from "firebase/storage";
import axios from "axios";
import Mainfooter from "../../../components/MainFooter";

// Define the interface for the decoded object
interface DecodedObject {
   id : String,
   avatar: String,
   ranks: {
     admin: number;
     demo: number;
     vip: number;
   };
 }
export default function Uploadanime() {

   const SERVER = import.meta.env.VITE_HOSTSERVER;

   // status
  const [animeimg1 , setAnimeImg1] = useState<File | null>(null);
  const [animeimg2 , setAnimeImg2] = useState<File | null>(null);
  const [animeSes, setAnimeSes] = useState<Number>(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const availableGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Supernatural' , 'Romance', 'School' , 'Sci-Fi' , 'Shounen', "Bloody", "Mystery"];

  const [rating, setRating] = useState<number>(3); // Initial rating value

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };


   const token = window.localStorage.getItem("token");
   const [decoded, setDecoded] = useState<DecodedObject | null >(null); // Set initial decoded to null
   const [btndisable , setBtndisable] = useState<boolean>(true);

   const [animeTitle,setAnimeTilte] = useState<String>("");
   const [animeBio, setAnimeBio] = useState<String>("");

   // get state for show loading uploaded ...
   const [loadup , setLoadUp] = useState<String>("Loading ...");
   const [fixloadup , setFixloadUp] = useState<boolean>(false);


   // Film || Series
   const [seriesChecked, setSeriesChecked] = useState<number>(1);
   const [filmChecked, setFilmChecked] = useState<number>(0);

   const handleTypeChange = (type: 'series' | 'film') => {
      if (type === 'series') {
         setSeriesChecked(1);
         setFilmChecked(0);
      } else {
         setSeriesChecked(0);
         setFilmChecked(1);
      }
   };

  {/* Submit The Form Data to Server .... */}
   const handsubmit = () => {
      
      

      if ((animeimg1 || animeimg2) == null) return;
      
      if (animeimg1) {
         if ((animeimg1.type !== "image/png") && (animeimg1.type !== "image/jpeg")) 
            {
            alert('Please select a PNG or JPEG image.'); // Show an error message
            return;
            }
      }

      if (animeimg2) {
         if ((animeimg2.type !== "image/png") && (animeimg2.type !== "image/jpeg")) 
            {
            alert('Please select a PNG or JPEG image.'); // Show an error message
            return;
            }
      }

      setFixloadUp(true);

   let myUUID_1 = v4();
   const photoRef = ref(storage, `animes/${myUUID_1}`);

   if (animeimg1) {
   
   
      uploadBytes(photoRef, animeimg1)
      .then(() => {
         setLoadUp("Image 1 Uploaded Wait to Upload the Second one ....");

         if (animeimg2) {
            
            let myUUID_2 = v4();
            const photoRef_2 = ref(storage, `animes/${myUUID_2}`);

            uploadBytes(photoRef_2, animeimg2)
            .then(() => {

               setLoadUp("Uploaded Successfully !!");

               const format = {
                  seriesChecked,
                  filmChecked
               }
               const formData = {
                  animeTitle,
                  selectedGenres,
                  animeBio,
                  animeimgOr : myUUID_1,
                  animeimgBack : myUUID_2,
                  rating,
                  format,
                  animeSes
               }

               axios.post(`${SERVER}/api/dashboard/uploadanime`, formData)
               .then((response) => {
                  console.log(response.data);
                  window.location.href = "/dashboard";
                  
               })
               

            } ).catch((e) => {console.log(e);})


         }


         
   }).catch((e) => {console.log(e);})


   }


      
   }

   {/* Effects to accept change inputs !! */}

   useEffect(() => {
      if (animeTitle) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeTitle] )




   useEffect(() => {
      if (animeBio) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeBio] )

   useEffect(() => {
      if (animeimg1) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeimg1] )


   useEffect(() => {
      if (animeimg2) {
         setBtndisable(false);
      }
      else {
         setBtndisable(true);
      }
   }, [animeimg2] )

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
            
               if (Number(decoded?.ranks.admin) == 0) {
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


   return ( 
      <>
            <MainHeader />
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
                  The <span className="font-bold text-orange-500 duration-200 hover:text-blue-500 ">Upload Anime</span> page is a dedicated section within the dashboard of an application designed for administrators. Its primary purpose is to allow administrators to add new anime titles to the application's database. This feature enables the platform to expand its library of available anime content. 
                  </p>
               </article>

            {/* */}

            <nav className="  carousel w-full hidden md:flex select-none ">
            
           

            <div id="slide1" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                           
                     <figure>
                     <img src={KReadCataAfk} alt="Catalog_Afk" width={150} draggable={false} />
                     </figure>
                           <input
                           className=" w-96 m-5 input bg-transparent text-white border border-yellow-500 font-bold" 
                           placeholder="Anime Title ..."
                           type="text" 
                           onChange={(e) => {setAnimeTilte(e.target.value)}}/>
                           <a href={!btndisable ? "#slide2" : ""}>
                           <button 
                           
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent"
                           onClick={clickbacktoTrue}>Next</button>
                           </a>
                        </div>
                        
            </div>


            <div id="slide2" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide1" >
                           <button 
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>
                           
                           {/* Select Gendre */}

                        <div className="m-5 text-white ">
                                 <h2>Select Anime Genres:</h2>
                                 <table>
                                    <thead>
                                    <tr>
                                       <th>Genre</th>
                                       <th>Select</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {availableGenres.map((genre) => (
                                       <tr key={genre}>
                                          <td>{genre}</td>
                                          <td>
                                          <input
                                             type="checkbox"
                                             checked={selectedGenres.includes(genre)}
                                             onChange={() => {
                                                if (selectedGenres.includes(genre)) {
                                                setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
                                                } else {
                                                setSelectedGenres([...selectedGenres, genre]);
                                                }
                                             }}
                                          />
                                          </td>
                                       </tr>
                                    ))}
                                    </tbody>
                                 </table>
                           </div>
                          <a href="#slide3">
                           <button 
                           onClick={clickbacktoTrue}
                           
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>



            <div id="slide3" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide2">
                           <button 
                           
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>
                           <textarea 
                           className="textarea textarea-warning m-5 bg-transparent text-white w-[30em] font-bold" 
                           placeholder="Anime Description..."
                           onChange={(e) => {setAnimeBio(e.target.value)}}
                           ></textarea>
                          <a href={!btndisable ? "#slide4" : ""}>
                           <button 
                           onClick={clickbacktoTrue}
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>



            <div id="slide4" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide3" >
                           <button 
                           
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}
                           <label>
                              <span className="pl-10">Anime Origin Image : </span>
                           <input 
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAnimeImg1(e.target.files && e.target.files[0])}}
                           type="file" 
                           accept=".png, .jpg, .jpeg"
                           className="file-input file-input-bordered file-input-warning w-full max-w-xs m-5" />
                           </label>
                           
                          <a href={!btndisable ? "#slide5" : ""}>
                           <button 
                           onClick={clickbacktoTrue}
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>


            <div id="slide5" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide4">
                           <button 
                           
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}
                           <label>
                              <span className="pl-10">Anime Background Origin Image : </span>
                              <input 
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAnimeImg2(e.target.files && e.target.files[0])}}
                              type="file" 
                              accept=".png, .jpg, .jpeg"
                              className="file-input file-input-bordered file-input-secondary w-full max-w-xs m-5" />
                           </label>
                           
                          <a href={!btndisable ? "#slide6" : ""}>
                           <button 
                           onClick={clickbacktoTrue}
                           disabled={btndisable}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>



            <div id="slide6" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide5">
                           <button 
                           
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}
                           <div className="m-5">
                              <h2>Rate the Anime:</h2>
                              <div className="rating">
                              {[1, 2, 3, 4, 5].map((value) => (
                                 <input
                                    key={value}
                                    type="radio"
                                    name="rating"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === value}
                                    onChange={() => handleRatingChange(value)}
                                 />
                              ))}
                              </div>
                           </div>
                           
                           
                          <a href="#slide7">
                           <button 
                           onClick={clickbacktoTrue}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>


            <div id="slide7" className="carousel-item relative w-full">
                     <div className="flex justify-around items-center m-auto text-center">
                     <a href="#slide6">
                           <button 
                           
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}

                           <div className="block p-16">
                                 <div className="form-control">
                                    <label className="label cursor-pointer">
                                       <span className="label-text pr-5 font-bold text-white">Series ? </span> 
                                       <input 
                                       type="radio" 
                                       name="radio-10" 
                                       className="radio checked:bg-red-500" 
                                       checked 
                                       onChange={() => handleTypeChange('series')}
                                       />
                                    </label>
                                 </div>
                                 
                                 <div className="form-control">
                                    <label className="label cursor-pointer">
                                       <span className="label-text pr-5 font-bold text-white">Film ?</span> 
                                       <input 
                                       type="radio" 
                                       name="radio-10" 
                                       className="radio checked:bg-blue-500"  
                                       onChange={() => handleTypeChange('film')}
                                       />
                                    </label>
                                 </div>
                           </div>
                           
                           
                          <a href="#slide8">
                           <button 
                           onClick={clickbacktoTrue}
                           className="btn btn-warning duration-500 hover:btn-accent">Next</button>
                           </a>
                        </div>
            </div>



            



            <div id="slide8" className="carousel-item relative w-full">
                                 
                     <div className="flex justify-around items-center m-auto text-center">
                        
                     <a href="#slide7">
                           <button 
                           style={ !fixloadup ? { display: "block" } : { display: "none" } } 
                           className="btn btn-error duration-500 hover:btn-error">Back</button>
                           </a>

                           {/* inputs */}
                           <div className="form-control" style={ !fixloadup ? { display: "block" } : { display: "none" } } >
                              <label className="cursor-pointer label">
                                 <span className="label-text pl-5 text-white ">seasonal ? </span>
                                 <input 
                                 onChange={() => {setAnimeSes(1)}}
                                 type="checkbox"  
                                 className="checkbox checkbox-warning m-5 " />
                              </label>
                           </div>
                           
                          
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
