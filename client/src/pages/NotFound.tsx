import Konata_error_404_ from "../../public/assets/images/konata_error_404_.png";
import Mainfooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
export default function NotFound() {
   return ( 
      <>
      <MainHeader />
            <div className=" select-none mt-[5%] ">
         
                  <figure className="m-auto relative  grayscale ">
                        <img 
                           draggable={false}
                           src={Konata_error_404_} 
                           alt="Error 404" 
                           width={250} 
                           className="m-auto "
                        />
                        <p 
                           className="mt-[-4.3em] text-[#222] w-32 m-auto font-bold relative z-10"
                        >
                           404 !! <span className="text-blue-500">Page Not Found </span>  
                        </p>
                     </figure>
                  
            </div>
            <Mainfooter />
      </>
    );
}