import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import avatarImg from "../../assets/placeholder.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const MenuDropDown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { auths, logOut } = useContext(AuthContext);
  const user = auths?.user;
  console.log("Menu",auths?.user?.user)
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block">
          <Link to="/createFlatList"><button className="disabled:cursor-not-allowed cursor-pointer bg-green-400 border border-black py-3 px-4 text-sm font-semibold rounded-full  transition">
            Create new FlatList
          </button></Link>
          <Link to="/createRoommateList"><button className="disabled:cursor-not-allowed ms-2 cursor-pointer bg-green-400 border border-black py-3 px-4 text-sm font-semibold rounded-full  transition">
            Create new RoommateList
          </button></Link>
        </div>
        {/* DropDownButton
         */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-2 flex flex-row items-center 
                 gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* avatar  */}
            <img
              className="rounded-full"
              src={
                auths.status === "manual"
                  ? `http://localhost:5000/image/${user?.user_image}`
                  : auths.status === "firebase"
                  ? user?.user_image
                  : avatarImg
              }
              height="30"
              width="30"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm z-10">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Wishlist
                </Link>
                <Link
                  to="/myAccount"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My Account
                </Link>
                <Link
                  to="/myListing"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My Listing
                </Link>
                <div
                  onClick={logOut}
                  className="px-14 py-3 hover:bg-neutral-100 bg-slate-400 transition font-semibold cursor-pointer"
                >
                  LogOut
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropDown;
