import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const FindRoommate = () => {
  const [activeButton, setActiveButton] = useState("roommate");
  const [roomMate, setRoomMate] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roommatesPerPage] = useState(8);
  const { auths } = useContext(AuthContext);
  const user = auths?.user;

  const handleClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const getAllCat = async () => {
      const res = await axios.get(
        `http://localhost:5000/roommateList?search=${searchValue}&sort=${priceSort}&gender=${gender}`
      );
      setRoomMate(res.data);
    };
    getAllCat();
  }, [searchValue, priceSort, gender]);

  // console.log("ggggggggggggggg", roomMate);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePriceSort = (e) => {
    setPriceSort(e.target.value);
  };

  const handleGenderFilter = (e) => {
    setGender(e.target.value);
  };

  const indexOfLastRoommate = currentPage * roommatesPerPage;
  const indexOfFirstRoommate = indexOfLastRoommate - roommatesPerPage;
  const currentRoommates = roomMate.slice(
    indexOfFirstRoommate,
    indexOfLastRoommate
  );

  // add To Roommate Wishlist ---------------------------

  const addToRoommateWishlist = async (roommate) => {
    console.log(roommate);
    try {
      const roomMates = {
        userEmail: user?.email,
        userId: user?._id,
        roommateWishList: roommate,
        flatWishList: "",
      };
      console.log(roomMates);
      await axios.post(`http://localhost:5000/wishlist`, roomMates);
      console.log("Added to wishlist:", roommate);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <>
      <div className="px-5 lg:px-12 flex flex-wrap justify-center gap-10 py-5">
        <div className="flex border border-black rounded-lg">
          <Link to="/">
            <button
              className={`px-4 py-3 rounded-lg mr-2 lg:w-44 ${
                activeButton === "sublet"
                  ? "bg-green-400 text-black font-semibold border border-black"
                  : "bg-white text-black font-semibold"
              }`}
              onClick={() => handleClick("sublet")}
            >
              Find Sublet/Flat
            </button>
          </Link>
          <Link to="/findRoommate">
            <button
              className={`px-4  py-3 rounded-lg lg:w-44 ${
                activeButton === "roommate"
                  ? "bg-green-400 text-black font-semibold border border-black"
                  : "bg-white text-black font-semibold"
              }`}
              onClick={() => handleClick("roommate")}
            >
              Find Roommate
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <div className="bg-gray-100 border border-black rounded-full px-6">
            <span>Where</span>
            <br />
            <input
              value={searchValue}
              onChange={handleSearch}
              className="bg-gray-100"
              placeholder="Search Location"
            />
          </div>
          <select
            onChange={handleGenderFilter}
            defaultValue={"bold"}
            className="select select-bordered  border border-gray-800 bg-gray-100 px-10 py-2 lg:w-auto w-[20vw] font-bold border-main focus:border-main rounded-full  join-item"
          >
            <option className="font-bold" value="bold" disabled>
              Gender
            </option>
            <option>Female</option>
            <option>Male</option>
          </select>

          <select
            onChange={handlePriceSort}
            defaultValue={"bold"}
            className="select select-bordered border border-gray-800 bg-gray-100 px-4 py-2 lg:w-auto w-[20vw] font-bold border-main focus:border-main rounded-full  join-item"
          >
            <option className="font-bold" value="bold" disabled>
              Rent
            </option>
            <option>High To Low</option>
            <option>Low To High</option>
          </select>
        </div>
      </div>
      {/* roommate cards  */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 mt-10 gap-5">
        {currentRoommates.map((roommate, index) => (
          <Link
            key={index}
            to={`/roommateDetails/${roommate._id}`}
            className="block"
          >
            <div className="bg-white shadow-lg px-4 py-5 rounded-lg border-black border-2">
              <div className="relative grid h-[20rem] w-full max-w-[22rem] flex-col items-end justify-end overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                <div
                  className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent  bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
                  style={{
                    backgroundImage: `url(http://localhost:5000/image/${roommate.roomateList.images[0]})`,
                  }}
                >
                  <div className="flex justify-end items-center left-4 right-4 top-4 absolute">
                    <button
                      className="flex justify-end px-5 py-6"
                      onClick={() => addToRoommateWishlist(roommate)}
                    >
                      <svg
                        width={30}
                        className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white "
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: "pointer" }}
                      >
                        <g strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative top-1 p-6 px-6 py-6 md:px-5">
                  <img
                    alt="user"
                    src={`http://localhost:5000/image/${roommate.userImage}`}
                    className="relative inline-block h-[80px] w-[80px] !rounded-lg border-2 border-white object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-between text-sm px-2 ">
                <div>
                  <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    Location:{" "}
                    {roommate.roomateList.description.location.address},
                    {roommate.roomateList.description.location.city},
                  </h3>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    HomeType: {roommate.roomateList.description.bedroomType}
                  </p>
                </div>
                <p className="text-gray-900 font-bold text-lg">
                  $ {roommate.roomateList.description.rent}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* for pagination */}

      <div className=" flex flex-wrap justify-center mb-10 mt-24">
        <button
          className="join-item btn btn-outline mr-2"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr; Previous page
        </button>
        {Array.from(
          { length: Math.ceil(roomMate.length / roommatesPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-outline mr-2 ${
                currentPage === i + 1 ? "bg-green-400 text-white" : ""
              }`}
              onClick={() => handlePagination(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className="join-item btn btn-outline mr-2"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(roomMate.length / roommatesPerPage)
          }
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default FindRoommate;
