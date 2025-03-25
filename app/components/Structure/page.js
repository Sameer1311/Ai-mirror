import About from "../About/page"
import About2 from "../About2/page"
import Navbar from "../Navbar/page"


const Structure=()=>{
 return (
    <div className="w-full h-full overflow-hidden flex flex-col md:flex-row  bg-gradient-to-br from-gray-150 to-gray-300 dark:from-gray-900 dark:to-black  text-gray-900 dark:text-gray-100">
      <div className="absolute top-2 left-2 z-[30]">
       <Navbar/>
       </div>
       <div className="w-full h-full flex flex-col ">
       <About/>
       <About2/>  
       </div>
    </div>
 )
}

export default Structure

