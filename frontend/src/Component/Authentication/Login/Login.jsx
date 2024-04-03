import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Form, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { validateEmail } from "../../../lib/utils";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import Lottie from "lottie-react";
import house from "../../../assets/login.json";

const Login = () => {
  const { googleSignIn, auths, setAuths, login, facebookSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setAllUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  if (navigation.state === "loading") {
    return <progress className="progress w-56"></progress>;
  }

  const onFinish = async ({ email, password }) => {
    try {
      await login(email, password);
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        const fullName = user.displayName.split(" ");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ");

        const saveUser = {
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: "",
          user_image: user?.photoURL,
          age: "",
          location: {
            address: "",
            city: "",
            postalCode: "",
          },
        };

        axios
          .post("http://localhost:5000/user", saveUser, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            message.success("Login successful"); // Display success message
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Error posting user data:", error);
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };
  const handleFB = () => {
    facebookSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);

        const fullName = user.displayName.split(" ");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ");

        console.log(user);
        const saveUser = {
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: "",
          user_image: user?.photoURL,
          age: "",
          location: {
            address: "",
            city: "",
            postalCode: "",
          },
        };
        console.log(saveUser);

        axios
          .post("http://localhost:5000/user", saveUser, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            message.success("Login successful"); // Display success message
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Error posting user data:", error);
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
      });
  };

  return (
    <div className="mt-5">
      <div className="flex justify-center lg:flex-row flex-col lg:gap-16 justify-items-center items-center lg:px-44">
        <div className="lg:w-[500px] lg:flex-row flex-col border border-black shadow-2xl rounded-lg">
          <div className="p-2">
            <div className="flex flex-col lg:w-auto border-opacity-50 ">
              <div className="grid card rounded-box place-items-center">
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    className="btn border-black btn-wide bg-[#1877F2]"
                    onClick={handleFB}
                  >
                    <FaFacebook size="2em" color="white" />{" "}
                    <span className="text-white font-bold">
                      Continue With Facebook
                    </span>
                  </button>
                  <button
                    className="btn border-2 border-black btn-wide mt-5"
                    onClick={handleGoogle}
                  >
                    <FcGoogle size="2.2em" />
                    <span className="text-black font-bold">
                      Continue With Google
                    </span>
                  </button>
                </div>
              </div>
              <div className="divider">OR</div>
              <div className="grid card rounded-box place-items-center">
                <div>
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          validator: (rule, value) => {
                            if (!validateEmail(value)) {
                              return Promise.reject(
                                "Please input a valid email address!"
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Enter your Email" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      className="mb-5 "
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter your password" />
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
                      >
                        Login with Email
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="flex justify-center">
            <div class="lg:w-[400px] xl:w-[600px]">
              <div class="overflow-hidden">
                <div class="aspect-w-16 aspect-h-9">
                  <Lottie
                    animationData={house}
                    loop={true}
                    class="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
