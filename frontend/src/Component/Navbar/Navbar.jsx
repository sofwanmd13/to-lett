import { Link } from "react-router-dom";
import MenuDropDown from "./MenuDropDown";
import { GiFamilyHouse } from "react-icons/gi";

const Navbar = () => {
  
  return (
    <div className=" w-full bg-white z-10 shadow-sm px-16">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          {/* log0 */}
          <Link  to="/">
            <GiFamilyHouse size="3.5em" color="black" />
          </Link>
          {/* DropDown  */}
          <MenuDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
