/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import { Button, Form, Input, Upload, message } from "antd";
import users from "../../../assets/user.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const MyAccount = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const { auths, setAuths } = useContext(AuthContext);
  const user = auths?.user;
  console.log("🚀 ~ MyAccount ~ user:", user);

  const update = () => {
    
  };
  useEffect(() => {
    update();
  }, []);
  const onFinish = async (values) => {
    console.log("values", values);
    const data = new FormData();
    data.append("firstName", values.firstName || user?.firstName);
    data.append("lastName", values.lastName || user?.lastName);
    data.append("age", values.age || user?.age);
    data.append("address", values.address || user?.location?.address);
    data.append("city", values.city || user?.location?.city);
    data.append("postalCode", values.postalCode || user?.location?.postalCode);
    data.append("password", values?.password || "");
    data.append("images", fileList[0]?.originFileObj || "");
    data.append("user_image", user?.user_image);
    data.append("user_pass", user?.password);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = `http://localhost:5000/update/${user?.email}`;

    try {
      const response = await axios.put(url, data, config);
      if (fileList.length > 0) {
        localStorage.setItem("access-token", response.data.token);
        setAuths({ status: "manual", user: response.data.user });
      } else {
        setAuths({ status: "firebase", user: response.data.user });
      }
      update();
      console.log("REsponse", response);
      message.success("Profile Update successful");
    } catch (error) {
      console.error("Update failed:", error?.response?.data?.error);
      message.error("Failed to update. Please try again later.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    setFileList(e.fileList);
    // console.log(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    fileList,
  };

  return (
    <div className="flex justify-center lg:flex-row flex-col lg:gap-16 justify-items-center items-center lg:px-44">
      <div className="flex justify-center lg:flex-row flex-col  items-center mt-5">
        <div className="shadow-lg border-2 border-black rounded-2xl">
          <div className="flex flex-col items-center justify-center p-4 ">
            <div className="">
              <img
                alt="profile"
                src={
                  auths.status === "manual"
                    ? `http://localhost:5000/image/${user?.user_image}`
                    : auths.status === "firebase"
                    ? user?.user_image ||
                      `http://localhost:5000/image/${user?.user_image}`
                    : " "
                }
                className="mx-auto object-cover rounded-full h-16 w-16 lg:h-32 lg:w-32 border-4 border-black"
              />
            </div>
            <div className="lg:w-[400px] p-2 mt-6 rounded-lg">
              <div className="flex flex-wrap px-1 lg:justify-between text-sm text-gray-600 ">
                <div className="flex-1">
                  <p className="flex mr-3 text-lg">
                    First Name : {user?.firstName}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">
                    Last Name : {user?.lastName}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">Age:{user?.age}</p>

                  <p className="flex flex-col mt-3 text-lg">
                    Address: {user?.location?.address}
                  </p>
                  <p className="flex flex-col mt-3 text-lg">
                    City: {user?.location?.city}
                  </p>
                  <p className="flex flex-col mt-3 text-lg mb-5">
                    Postal code: {user?.location?.postalCode}
                  </p>
                  <div className="w-72 mx-auto flex items-center justify-center">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="bg-green-500 px-12 py-3 text-white p-2 rounded-lg"
                    >
                      Update Profile
                    </button>
                    <div
                      className={`fixed flex justify-center items-center z-[100] ${
                        openModal ? "visible opacity-1" : "invisible opacity-0"
                      } inset-0 backdrop-blur-sm bg-black/20 duration-100`}
                    >
                      <div
                        className={`absolute max-w-sm lg:max-w-md h-[300px] overflow-y-auto lg:h-[500px] p-4 text-center bg-white drop-shadow-2xl rounded-lg ${
                          openModal
                            ? "scale-1 opacity-1 duration-300"
                            : "scale-0 opacity-0 duration-150"
                        }`}
                      >
                        <svg
                          onClick={() => setOpenModal(false)}
                          className="w-8 mx-auto mr-0 cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                              fill="#c51636"
                            ></path>
                          </g>
                        </svg>
                        <Form
                          name="basic"
                          labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 16,
                          }}
                          initialValues={{
                            firstName: user ? user?.firstName : "",
                            lastName: user ? user?.lastName : "",
                            age: user ? user?.age : "",
                            address: user ? user?.location?.address : "",
                            city: user ? user?.location?.city : "",
                            postalCode: user ? user?.location?.postalCode : "",
                          }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="on"
                        >
                          <Form.Item
                            label="First Name"
                            name="firstName"
                            className="mb-4 font-bold"
                            initialValue={user?.firstName}
                          >
                            <Input placeholder={user?.firstName} />
                          </Form.Item>
                          <Form.Item
                            label="Last Name"
                            name="lastName"
                            className="mb-4 font-bold"
                            initialValue={user?.lastName}
                          >
                            <Input placeholder={user?.lastName} />
                          </Form.Item>

                          <Form.Item
                            name="age"
                            label="Age"
                            className="font-bold"
                            initialValue={user?.age}
                          >
                            <Input placeholder={user?.age} />
                          </Form.Item>
                          {auths.status != "firebase" && (
                            <Form.Item
                              name="user_image"
                              valuePropName="fileList"
                              label="Image"
                              getValueFromEvent={normFile}
                            >
                              <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture"
                                {...props}
                              >
                                <Button icon={<UploadOutlined />}>
                                  Click to upload Image
                                </Button>
                              </Upload>
                            </Form.Item>
                          )}

                          <Form.Item
                            label="Address"
                            name="address"
                            className="mb-5 font-bold"
                            initialValues={user?.location?.address}
                          >
                            <Input placeholder={user?.location?.address} />
                          </Form.Item>
                          <Form.Item
                            label="City"
                            name="city"
                            className="mb-5 font-bold"
                            initialValues={user?.location?.city}
                          >
                            <Input placeholder={user?.location?.city} />
                          </Form.Item>
                          <Form.Item
                            label="Postal Code"
                            name="postalCode"
                            className="mb-5 font-bold"
                            initialValue={user?.location?.postalCode}
                          >
                            <Input placeholder={user?.location?.postalCode} />
                          </Form.Item>
                          <Form.Item
                            label="Password"
                            name="password"
                            className="mb-5 font-bold"
                          >
                            <Input.Password placeholder="Enter New Password" />
                          </Form.Item>
                          <Form.Item
                            wrapperCol={{
                              offset: 0,
                              span: 10,
                            }}
                          >
                            <button
                              className="btn btn-wide border-2 border-black btn-accent"
                              type="submit"
                              onClick={update()}
                            >
                              Update Profile
                            </button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="flex justify-center">
          <div class="lg:w-3/4 xl:w-1/2">
            <div class="overflow-hidden">
              <div class="aspect-w-16 aspect-h-9">
                <Lottie
                  animationData={users}
                  loop={true}
                  class="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
