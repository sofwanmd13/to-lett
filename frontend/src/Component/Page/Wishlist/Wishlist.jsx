import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { auths } = useContext(AuthContext);
  const user = auths?.user;
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const getWishListDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/wishlist/${user?.email}`
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error fetching flat details:", error);
      }
    };
    getWishListDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/wishlists/${id}`);
      setListData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-250 shadow-md max-w-[800px] bg-white md:w-[700px] p-8 my-10 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-slate-800 uppercase">
            Description
          </h4>
          <p className="text-sm font-medium text-slate-800 uppercase">Type</p>
          <p className="text-sm font-medium text-slate-800 uppercase">Action</p>
        </div>
        <hr />
        {/*  Cart  map */}
        {listData?.map((item, index) => (
          <div
            key={item?.id}
            className="flex flex-col md:flex-row justify-between items-center border-b pb-6"
          >
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <h5 className="text-base text-center lg:text-start">
                  BedroomType:
                  {item.flatWishList
                    ? item.flatWishList.flatList.description.type
                    : item.roommateWishList.roomateList.description.bedroomType}
                </h5>
                <p className="text-base text-center mt-1 lg:text-start">
                  Bathroom:{" "}
                  {item.flatWishList
                    ? item.flatWishList.flatList.description.bathroom
                    : item.roommateWishList.roomateList.description.bathroom}
                </p>
                <h5 className="text-base text-center mt-1 lg:text-start">
                  Size:{" "}
                  {item.flatWishList
                    ? item.flatWishList.flatList.description.size
                    : item.roommateWishList.roomateList.description.size}
                </h5>
                <p className="text-base text-center mb-5 mt-1 lg:text-start">
                  Rent:{" "}
                  {item.flatWishList
                    ? item.flatWishList.flatList.description.rent
                    : item.roommateWishList.roomateList.description.rent}
                </p>
              </div>
            </div>
            <div className="mb-5 lg:mb-0 bg-green-500 font-medium hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">
              {item.flatWishList ? (
                <>
                  <Link to={`/flatDetails/${item?.flatWishList._id}`}>
                    FlatData
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/roommateDetails/${item?.roommateWishList?._id}`}>
                    Roommate
                  </Link>
                </>
              )}
            </div>
            {/* item increase decrees  */}
            <div className="flex flex-wrap items-center gap-4 md:gap-10">
              <div className="space-x-3">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
