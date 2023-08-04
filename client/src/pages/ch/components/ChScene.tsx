import Vmainscene from "../../../../public/assets/videos/showscene.mp4";
function ChScene() {
   return ( 
      <>
         <div className="relative">
            <video
               src={Vmainscene} // Replace 'your_video_file.mp4' with the actual video file name
               autoPlay
               loop
               muted
               className="absolute -z-10 top-0 left-0 w-full h-[100vh] object-cover border border-black"
               
               />

               {/* Div with background color and opacity */}
               <div
                     className="absolute -z-10  top-0 left-0 w-full h-[100vh]"
                     style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set your desired background color with opacity (0.5 in this case)
                        pointerEvents: 'none', // Ensures that the div doesn't block interaction with elements beneath it
                     }}
                     />

               {/* Your content goes here */}
               <div className="relative z-10">
               {/* Add your other components and content here */}
               </div>
            </div>
      </>
    );
}

export default ChScene;