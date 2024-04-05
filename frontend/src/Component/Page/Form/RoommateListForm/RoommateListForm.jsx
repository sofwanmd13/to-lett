import { DatePicker, InputNumber, Radio, Tabs, Upload, message } from "antd";
const { TabPane } = Tabs;
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../Provider/AuthProvider";
import axios from "axios";

const RoommateListForm = () => {
  const { auths  } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const [fileList, setFileList] = useState([]);
  const user = auths?.user;

  const dateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const onFinish = async (values) => {
    if (selectedDate) {
      values.availableFrom = selectedDate;
    }
    setFormData({ ...formData, ...values });
    const data = new FormData();
    data.append("bedroomType", formData.type);
    data.append("bathroom", formData.bathroom);
    data.append("size", formData.size);
    data.append("rent", formData.rent);
    data.append("availableFrom", formData.availableFrom);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("postalCode", formData.postalCode);

    data.append("gender", formData.gender);
    data.append("pets", formData.pets);
    data.append("smoking", formData.smoking);
    data.append("employmentStatus", formData.employmentStatus);

    data.append("userGender", values.userGender);
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("Phone", values.Phone);
    data.append("userEmploymentStatus", values.userEmploymentStatus);

    fileList.forEach((file) => {
      data.append("images", file.originFileObj);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "http://localhost:5000/add/roommateList";

    try {
      const nextTab = (parseInt(activeTab) + 1).toString();
      if (nextTab === "5") {
        data.append("userEmail", user?.email);
        data.append("userId", user?._id);
        data.append("userImage", user?.user_image);
        await axios.post(url, data, config);
        message.success("Form submitted successfully!");
        setActiveTab("1");
      } else {
        setActiveTab(nextTab);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("Success:", formData);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    multiple: true,
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
    <div>
      <Tabs centered activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="DESCRIPTION" key="1" className="w-full">
          <div className="w-full flex justify-center mt-10">
            <Form
              name="basic"
              style={{
                maxWidth: "100%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="flex gap-20">
                <div>
                  <h1 className="font-bold text-2xl mb-5">Bedroom Type</h1>
                  <Form.Item name="type">
                    <Radio.Group>
                      <Radio
                        value="Private"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Private
                        </div>
                      </Radio>
                      <Radio
                        value="Shared"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Shared
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div>
                  <h1 className="font-bold text-2xl mb-3">Available From</h1>
                  <div className="flex items-center gap-2">
                    <Form.Item name="availableFrom">
                      <Radio.Group>
                        <Radio
                          value="Available Now"
                          className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                        >
                          <div className="font-bold text-lg">Available Now</div>
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="availableFrom">
                      <div className="flex gap-5 items-center border-2 border-black ps-5 pe-1 bg-[#e5f0f09d] rounded-xl">
                        <div className="font-bold text-lg">Available From</div>
                        <div>
                          <DatePicker
                            onChange={dateChange}
                            size={"large"}
                            placeholder=""
                            className="border-l-2"
                          />
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="font-bold text-2xl mb-5">Bathroom</h1>
                <Form.Item name="bathroom">
                  <Radio.Group>
                    <Radio
                      value="Private"
                      className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="flex items-center gap-3 font-bold text-lg ms-1">
                        Private
                      </div>
                    </Radio>
                    <Radio
                      value="Shared"
                      className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="flex items-center gap-3 font-bold text-lg ms-1">
                        Shared
                      </div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div>
                <h1 className="font-bold text-2xl mb-5">Size (sqft)</h1>
                <Form.Item>
                  <Form.Item name="size">
                    <InputNumber
                      min={1}
                      max={999}
                      className="border-2 border-black w-1/3 text-lg "
                    />
                  </Form.Item>
                </Form.Item>
              </div>
              
              <div>
                <h1 className="font-bold text-2xl mb-2">Rent</h1>
                <Form.Item>
                  <Form.Item name="rent">
                    <InputNumber
                      min={1}
                      className="border-2 border-black w-1/3 text-lg "
                    />
                  </Form.Item>
                </Form.Item>
              </div>
              
              <div>
                <h1 className="font-bold text-2xl mb-5">Location</h1>
                <div className="flex items-center gap-3 font-semibold">
                  <Form.Item name="address" className="w-full">
                    <TextArea
                      name="address"
                      placeholder="Address"
                      autoSize={{
                        minRows: 1.7,
                        maxRows: 3,
                      }}
                      className="border-2 border-black"
                    />
                  </Form.Item>
                  <Form.Item name="city" className="w-full">
                    <TextArea
                      name="city"
                      placeholder="City"
                      autoSize={{
                        minRows: 1.7,
                        maxRows: 3,
                      }}
                      className="border-2 border-black"
                    />
                  </Form.Item>
                  <Form.Item name="postalCode" className="w-full">
                    <TextArea
                      name="postalCode"
                      placeholder="Postal Code"
                      autoSize={{
                        minRows: 1.7,
                        maxRows: 3,
                      }}
                      className="border-2 border-black"
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary btn-wide text-white"
                >
                  Next
                </button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="ROOMMATE PREFERENCES" key="2">
          <div className="w-full flex justify-center mt-10">
            <Form
              name="basic"
              style={{
                minWidth: "40%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="font-semibold text-2xl mb-10">
                All choices are (optional)
              </h1>
              <div className="flex items-center justify-between gap-20 mb-10">
                <div>
                  <h1 className="font-bold text-2xl mb-5">Prefered Gender</h1>
                  <Form.Item name="gender">
                    <Radio.Group>
                      <Radio
                        value="Male"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Male
                        </div>
                      </Radio>
                      <Radio
                        value="Female"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Female
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div>
                  <h1 className="font-bold text-2xl mb-5">Pets</h1>
                  <Form.Item name="pets">
                    <Radio.Group>
                      <Radio
                        value="Okay"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Okay
                        </div>
                      </Radio>
                      <Radio
                        value="Not okay"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Not okay
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center justify-between gap-20">
                <div>
                  <h1 className="font-bold text-2xl mb-5">Smoking</h1>
                  <Form.Item name="smoking">
                    <Radio.Group>
                      <Radio
                        value="Okay"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Okay
                        </div>
                      </Radio>
                      <Radio
                        value="Not okay"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Not okay
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div>
                  <h1 className="font-bold text-2xl mb-5">Employment Status</h1>
                  <Form.Item name="employmentStatus">
                    <Radio.Group>
                      <Radio
                        value="Working"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Working
                        </div>
                      </Radio>
                      <Radio
                        value="Student"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Student
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary btn-wide text-white"
                >
                  Next
                </button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="IMAGES" key="3">
          <div className="w-full flex justify-center  mt-10">
            <div className="card w-96 bg-base-100 border-2 border-black shadow-2xl">
              <div className="card-body">
                <Form
                  name="basic"
                  style={{
                    maxWidth: "100%",
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item name="images">
                    <Form.Item
                      name="images"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="CONTACT PERSON" key="4">
          <div className="w-full flex justify-center mt-10">
            <Form
              name="basic"
              style={{
                minWidth: "40%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <div>
                  <h1 className="font-bold text-2xl mb-5">Prefered Gender</h1>
                  <Form.Item name="userGender">
                    <Radio.Group>
                      <Radio
                        value="Male"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Male
                        </div>
                      </Radio>
                      <Radio
                        value="Female"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Female
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="flex items-center gap-3 font-bold text-xl">
                  <Form.Item name="firstName" className="w-full">
                    <TextArea
                      name="firstName"
                      placeholder="First name(optional)"
                      autoSize={{
                        minRows: 2,
                        maxRows: 3,
                      }}
                      className="border-2 border-black text-lg"
                    />
                  </Form.Item>
                  <Form.Item name="lastName" className="w-full">
                    <TextArea
                      name="lastName"
                      placeholder="Last Name"
                      autoSize={{
                        minRows: 2,
                        maxRows: 3,
                      }}
                      className="border-2 border-black text-lg"
                    />
                  </Form.Item>
                </div>
                <Form.Item name="Phone" className="w-full">
                  <TextArea
                    name="Phone"
                    placeholder="Phone Number"
                    autoSize={{
                      minRows: 1.5,
                      maxRows: 3,
                    }}
                    className="border-2 border-black font-bold text-lg"
                  />
                </Form.Item>
                <div>
                  <h1 className="font-bold text-2xl mb-5">Employment Status</h1>
                  <Form.Item name="userEmploymentStatus">
                    <Radio.Group>
                      <Radio
                        value="Working"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Working
                        </div>
                      </Radio>
                      <Radio
                        value="Student"
                        className="border-2 border-black px-5 py-2  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          Student
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary btn-wide text-white"
                >
                  Submit
                </button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RoommateListForm;
