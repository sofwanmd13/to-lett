import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Main = () => {
  
  return (
    <div>
    {/* this is navbar  */}
     <Navbar/>
      
      <Outlet />  
    </div>
  );
};

export default Main;
