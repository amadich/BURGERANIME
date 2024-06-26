

export default function UserConnecting({userCount} : any) {
  return (
         <div className="flex items-center space-x-2">
               <div className="relative flex items-center justify-center">
               <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </div>
               <div className="text-white text-lg"> <span className=" text-sm text-gray-300 ">O<span className="lowercase">nline</span> </span>  <span className="font-bold text-sm text-green-500 ">{userCount}</span> </div>
         </div>
  )
}
