import { InboxOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Tabs,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsBox, BsBuildings } from "react-icons/bs";
import { AuthContext } from "../../../../Provider/AuthProvider";

const { TabPane } = Tabs;

const FlatListForm = () => {
  const { auths  } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const [fileList, setFileList] = useState([]);
  const user = auths?.user;
  
  // console.log(userData)
  const dateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };
  const onFinish = async (values) => {
    if (selectedDate) {
      values.availableFrom = selectedDate;
    }

    setFormData({ ...formData, ...values });
    const data = new FormData();
    data.append("type", formData.type);
    data.append("availableFrom", formData.availableFrom);
    data.append("bedroom", formData.bedroom);
    data.append("bathroom", formData.bathroom);
    data.append("size", formData.size);
    data.append("rent", formData.rent);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("postalCode", formData.postalCode);
    data.append("phone", values.phone);
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("userCity", values.userCity);
    data.append("userPostalCode", values.userPostalCode);

    fileList.forEach((file) => {
      data.append("images", file.originFileObj);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "http://localhost:5000/add/flatList";
    try {
      const nextTab = (parseInt(activeTab) + 1).toString();

      if (nextTab === "4") {
        data.append("userEmail", user?.email);
        data.append("userId", user?._id);
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
  // console.log(formData)
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
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
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
                  <Form.Item name="type">
                    <Radio.Group>
                      <Radio
                        value="sublet"
                        className="border-2 border-black px-8 py-4  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          <BsBox size="1.8em" /> Sublet
                        </div>
                      </Radio>
                      <Radio
                        value="flat"
                        className="border-2 border-black px-8 py-4  bg-[#e5f0f09d] rounded-xl"
                      >
                        <div className="flex items-center gap-3 font-bold text-lg ms-1">
                          <BsBuildings size="1.8em" /> Flat
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
                <h1 className="font-bold text-2xl mb-5">Bedroom</h1>
                <Form.Item name="bedroom">
                  <Radio.Group>
                    <Radio
                      value="1"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">1</div>
                    </Radio>
                    <Radio
                      value="2"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">2</div>
                    </Radio>
                    <Radio
                      value="3"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">3</div>
                    </Radio>
                    <Radio
                      value="4"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">4</div>
                    </Radio>
                    <Radio
                      value="5"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">5</div>
                    </Radio>
                    <Radio
                      value="6"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">6</div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div>
                <h1 className="font-bold text-2xl mb-5">Bathroom</h1>
                <Form.Item name="bathroom">
                  <Radio.Group>
                    <Radio
                      value="1"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">1</div>
                    </Radio>
                    <Radio
                      value="2"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">2</div>
                    </Radio>
                    <Radio
                      value="3"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">3</div>
                    </Radio>
                    <Radio
                      value="4"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">4</div>
                    </Radio>
                    <Radio
                      value="5"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">5</div>
                    </Radio>
                    <Radio
                      value="6"
                      className="border-2 border-black px-2 py-1  bg-[#e5f0f09d] rounded-xl"
                    >
                      <div className="font-bold text-lg">6</div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div>
                <h1 className="font-bold text-2xl mb-2">Size (sqft)</h1>
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
        <TabPane tab="IMAGES" key="2">
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
        <TabPane tab="CONTACT PERSON" key="3">
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
                <div className="flex items-center gap-3 font-semibold ">
                  <Form.Item name="userCity" className="w-full">
                    <TextArea
                      name="userCity"
                      placeholder="City"
                      autoSize={{
                        minRows: 2,
                        maxRows: 3,
                      }}
                      className="border-2 border-black text-lg"
                    />
                  </Form.Item>
                  <Form.Item name="userPostalCode" className="w-full">
                    <TextArea
                      name="userPostalCode"
                      placeholder="Postal Code"
                      autoSize={{
                        minRows: 2,
                        maxRows: 3,
                      }}
                      className="border-2 border-black text-lg"
                    />
                  </Form.Item>
                </div>
                <Form.Item name="phone" className="w-full">
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
      </Tabs>
    </div>
  );
};

export default FlatListForm;
