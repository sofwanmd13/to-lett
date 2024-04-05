import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RoommateDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roommateDetails, setRoommateDetails] = useState([]);
  const { id } = useParams();
  const [allRoommateImages, setAllRoommateImages] = useState([]);
  // console.log(id);
  useEffect(() => {
    const getRoommateDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/roommate/${id}`);
        // console.log("id", res.data);
        setRoommateDetails(res.data);
        if (res.data.roomateList.images) {
          setAllRoommateImages(res.data.roomateList.images);
        }
      } catch (error) {
        console.error("Error fetching flat details:", error);
      }
    };
    getRoommateDetails();
  }, [id]);

  console.log(roommateDetails);

  const menus = [
    {
      location: "Khilgaon, Dhaka",
      image: "https://source.unsplash.com/350x150/?northern",
      HomeType: 2,
      price: 15000,
    },

    {
      location: "Khilgaon, Dhaka",
      image: "https://source.unsplash.com/350x150/?northern",
      HomeType: 2,
      price: 15000,
    },

    {
      location: "Khilgaon, Dhaka",
      image: "https://source.unsplash.com/350x150/?northern",
      HomeType: 2,
      price: 15000,
    },

    {
      location: "Khilgaon, Dhaka",
      image: "https://source.unsplash.com/350x150/?northern",
      HomeType: 2,
      price: 15000,
    },
  ];
  return (
    <>
      {/* details hero section  */}
      <div className="w-11/12 mx-auto lg:flex border-2 border-black mt-3 rounded-lg">
        <div className="lg:w-[50%]">
          <img
            src={`http://localhost:5000/image/${roommateDetails?.roomateList?.images[0]}`}
            alt=""
            className=" h-[500px] w-full"
          />
        </div>
        <div className="lg:w-[50%] grid grid-cols-1 md:grid-cols-2  h-[500px] ">
          <div className="bg-cover overflow-hidden relative border-2 border-black">
            <img
              src={`http://localhost:5000/image/${roommateDetails?.roomateList?.images[1]}`}
              alt=""
              className="w-full h-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125  duration-300"
            />
          </div>
          <div className="bg-cover overflow-hidden relative border-2 border-black">
            <img
              src={`http://localhost:5000/image/${roommateDetails?.roomateList?.images[2]}`}
              alt=""
              className="w-full h-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125  duration-300"
            />
          </div>
          <div className="bg-cover overflow-hidden relative border-2 border-black">
            <img
              src={`http://localhost:5000/image/${roommateDetails?.roomateList?.images[3]}`}
              alt=""
              className="w-full h-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125  duration-300"
            />
          </div>
          <div className="bg-cover overflow-hidden relative border-2 border-black">
            <img
              src={`http://localhost:5000/image/${roommateDetails?.roomateList?.images[4]}`}
              alt=""
              className="w-full h-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125  duration-300"
            />
            <div className="absolute left-0  bottom-[5%] w-full flex justify-end  text-center ">
              <div className=" bg-white px-3 py-2 text-black rounded-lg shadow-lg border-2 border-black mr-3">
                <div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-sm  px-5 py-[6px] text-black"
                    id="_modal_NavigateUI"
                  >
                    Show All Photo
                  </button>
                  <div
                    onClick={() => setOpenModal(false)}
                    className={`fixed z-[100] flex items-center justify-center ${
                      openModal ? "visible opacity-100" : "invisible opacity-0"
                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                  >
                    <div
                      onClick={(e_) => e_.stopPropagation()}
                      className={`text- absolute max-w-xl rounded-sm h-96 overflow-y-auto bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${
                        openModal
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                      }`}
                    >
                      <h1 className="mb-2 text-2xl font-semibold">
                        All Room Images!
                      </h1>
                      {allRoommateImages.map((image, index) => (
                        <div key={index} className="flex-1 gap-2 ">
                          <img
                            src={`http://localhost:5000/image/${image}`}
                            alt=""
                            className="h-[500px] w-full mb-4"
                          />
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          onClick={() => setOpenModal(false)}
                          className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* card details information  */}
      <div>
        {/* details sections starts */}
        <div className="mx-auto mt-16 md:px-16 ">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="main_details px-5 md:px-0 md:w-3/4">
              <div className=" px-5 md:px-0 md:w-3/4">
                <div className="mb-16">
                  <div className="mb-5 flex justify-start gap-10">
                    <div>
                      {" "}
                      <img
                        src="https://i.postimg.cc/6prP9jW9/pexels-pixabay-271795.jpg"
                        alt=""
                        className="w-16 h-16 rounded-lg"
                      />
                    </div>
                    <div>
                      <h2 className="lg:text-xl font-medium text-black">
                        User Name:{" "}
                        {
                          roommateDetails?.roomateList?.contact_person
                            ?.firstName
                        }{" "}
                        {roommateDetails?.roomateList?.contact_person?.lastName}
                      </h2>
                      <h2 className="lg:text-xl font-medium text-black">
                        Home type:{" "}
                        {roommateDetails?.roomateList?.description?.bedroomType}
                      </h2>
                      <p className="text-black  font-medium inline-block md:text-lg mt-1">
                        Location:{" "}
                        {
                          roommateDetails?.roomateList?.description?.location
                            ?.address
                        }
                        ,{" "}
                        {
                          roommateDetails?.roomateList?.description?.location
                            ?.city
                        }
                      </p>
                    </div>
                  </div>
                  <div className="border-t-4 border-b-4">
                    <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                      Personal Information
                    </h1>
                    <ul className="mb-8 lg:text-lg  text-black">
                      <li>
                        - Name :{" "}
                        {
                          roommateDetails?.roomateList?.contact_person
                            ?.firstName
                        }
                      </li>
                      <li>- Available From : {
                          roommateDetails?.roomateList?.description
                            ?.availableFrom
                        }</li>
                      <li className="">
                        - Age and Gender :{" "}
                        {
                          roommateDetails?.roomateList?.contact_person
                            ?.userGender
                        }{" "}
                      </li>
                      <li>
                        - Employment :{" "}
                        {
                          roommateDetails?.roomateList?.contact_person
                            ?.userEmploymentStatus
                        }
                      </li>
                    </ul>
                    <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                      Match Preferences
                    </h1>
                    <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                      Home Details
                    </h1>
                    <ul className="mb-8 lg:text-xl  text-black">
                      <li>
                        - Bedroom Type :{" "}
                        {roommateDetails?.roomateList?.description?.bedroomType}
                      </li>
                    </ul>

                    <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                      Flatmate Preferences
                    </h1>
                    <ul className="mb-8 lg:text-lg  text-black">
                      <li>
                        - Gender & Sexuality :{" "}
                        {
                          roommateDetails?.roomateList?.roomatePreferences
                            ?.gender
                        }{" "}
                      </li>
                      <li>
                        - Smoking at Home :{" "}
                        {
                          roommateDetails?.roomateList?.roomatePreferences
                            ?.smoking
                        }
                      </li>
                      <li>
                        - Pets :{" "}
                        {roommateDetails?.roomateList?.roomatePreferences?.pets}
                      </li>
                      <li>
                        - Employment :{" "}
                        {
                          roommateDetails?.roomateList?.roomatePreferences
                            ?.employmentStatus
                        }
                      </li>
                    </ul>
                  </div>

                  {/* map */}
                  <div className="relative h-full max-md:min-h-[350px] mt-16">
                    <iframe
                      src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            {/* div for right side */}
            <div className="flex flex-col gap-3">
              <div className="h-auto p-5 md:w-[416px] max-w-[416px] mt-3 border-2 border-black rounded-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold my-5">
                      ${roommateDetails?.roomateList?.description?.rent}
                    </h2>
                    <svg
                      width={30}
                      className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-black "
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
                  </div>
                  <button
                    className="text-black px-4 py-3 mx-2 w-full border-2 mt-16 border-black rounded-lg bg-green-400  
                                 transition-all duration-500 capitalize items-center flex justify-center gap-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"
                      />
                    </svg>
                    +88 {roommateDetails?.roomateList?.contact_person?.phone}
                  </button>
                </div>
              </div>
              <div className="md:w-[416px] max-w-[416px] h-fit p-5 underline flex justify-center items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464l-.003.001l-.006.003l-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35c-.816.252-1.879.523-2.71.523c-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007l.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255c-.81.252-1.872.523-2.734.523c-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"
                  />
                </svg>
                report this listing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* suggestion card  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {menus.map((flat, index) => (
          <Link key={index} to="/flatDetails/:id" className="block">
            <div
              key={index}
              className="px-4 py-8 shadow-lg max-w-[350px] font-sans rounded-xl space-y-6 my-5 mx-auto bg-white"
            >
              <div className="flex justify-center w-full h-48 lg:h-[280px] relative">
                <div className="flex justify-end items-center left-4 right-4 top-4 absolute">
                  <div className="flex items-center">
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
                  </div>
                </div>
                <img
                  className="rounded-lg bg-black/40 w-full h-full"
                  src={flat.image}
                  alt="card navigate ui"
                />
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    Location {flat.location}
                  </h3>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    HomeType: {flat.HomeType} bedroom Flat
                  </p>
                </div>
                <p className="text-gray-900 font-bold text-2xl">
                  ${flat.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RoommateDetails;
