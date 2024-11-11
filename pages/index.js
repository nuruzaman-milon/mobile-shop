import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { useRouter } from "next/navigation";

const products = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    image: "/images/product-img-1.png",
  },
  {
    _id: 2,
    name: "Product 2",
    price: 200,
    image: "/images/product-img-2.png",
  },
  {
    _id: 3,
    name: "Product 3",
    price: 300,
    image: "/images/product-img-3.png",
  },
  {
    _id: 4,
    name: "Product 4",
    price: 400,
    image: "/images/product-img-1.png",
  },
  {
    _id: 5,
    name: "Product 5",
    price: 500,
    image: "/images/product-img-2.png",
  },
  {
    _id: 6,
    name: "Product 6",
    price: 600,
    image: "/images/product-img-3.png",
  },
];

// import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import ProductSlider from "@/components/ProductSlider";
import toast from "react-hot-toast";
import SwiperSlider from "@/components/SwiperSlider";
import axios from "axios";
import { Button, Select, SelectItem } from "@nextui-org/react";

const Home = () => {
  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState({
    model: "",
    color: "",
    storage: "",
    nationality: "",
    dob: "",
  });

  console.log("order details", orderDetails);

  const modelList = [
    {
      key: "iphone 14",
      label: "iphone 14",
    },
    {
      key: "iphone 14 Pro Max",
      label: "iphone 14 Pro Max",
    },
    {
      key: "iphone 15",
      label: "iphone 15",
    },
    {
      key: "iphone 15 Pro Max",
      label: "iphone 15 Pro Max",
    },
    {
      key: "iphone 16",
      label: "iphone 16",
    },
    {
      key: "iphone 16 Pro Max",
      label: "iphone 16 Pro Max",
    },
  ];
  const storageList = [
    {
      key: "128GB",
      label: "128GB",
    },
    {
      key: "256GB",
      label: "256GB",
    },
    {
      key: "512GB",
      label: "512GB",
    },
  ];

  const countryList = [
    { key: "Bangladesh", label: "Bangladesh" },
    { key: "India", label: "India" },
    { key: "Pakistan", label: "Pakistan" },
    { key: "Philippines", label: "Philippines" },
    { key: "Nepal", label: "Nepal" },
    { key: "Saudi Arabia", label: "Saudi Arabia" },
    { key: "Afghanistan", label: "Afghanistan" },
    { key: "Egypt", label: "Egypt" },
    { key: "Ghana", label: "Ghana" },
    { key: "Granada", label: "Granada" },
    { key: "France", label: "France" },
    { key: "Ehiopia", label: "Ehiopia" },
    { key: "Indonesia", label: "Indonesia" },
    { key: "Iran", label: "Iran" },
    { key: "Kenya", label: "Kenya" },
    { key: "Lebanon", label: "Lebanon" },
    { key: "Morocco", label: "Morocco" },
    { key: "Palestine", label: "Palestine" },
    { key: "Yemen", label: "Yemen" },
    { key: "Uganda", label: "Uganda" },
    { key: "Sri Lanka", label: "Sri Lanka" },
    { key: "Syria", label: "Syria" },
  ];

  const handleSubmit = () => {
    if (
      orderDetails.color &&
      orderDetails.model &&
      orderDetails.storage &&
      orderDetails.nationality &&
      orderDetails.dob
    ) {
      router.push({
        pathname: "/user-info",
        query: { ...orderDetails },
      });
    } else {
      toast.error("Please select all the options");
    }
  };

  return (
    <>
      <SwiperSlider />
      <div className="flex flex-col lg:flex-row gap-5 m-auto max-w-[1400px] px-7">
        <div className="flex-1 lg:w-1/2 mt-3">
          {/* e-commerce product view using SwiperSlide */}
          <ProductSlider products={products} />
        </div>
        <div className="flex-1 flex flex-col gap-3 lg:gap-5 lg:mt-5 items-start lg:items-start">
          <div className="w-full mb-2">
            <h4 className="font-semibold text-teal-800 text-center lg:text-start mb-2 lg:mb-4">
              Apple iPhones
            </h4>
            <h3 className="text-[#333] mb-0 transition ease-in delay-200 text-center lg:text-start">
              {orderDetails.model === "iphone 14"
                ? "iPhone 14"
                : orderDetails.model === "iphone 14 Pro Max"
                ? "iPhone 14 Pro Max"
                : orderDetails.model === "iphone 15"
                ? "iphone 15"
                : orderDetails.model === "iphone 15 Pro Max"
                ? "iphone 15 Pro Max"
                : orderDetails.model === "iphone 16"
                ? "iphone 16"
                : "iphone 16 Pro Max"}
            </h3>
          </div>
          {/* <hr /> */}
          {/* <div className="flex items-start gap-2">
            <p className="w-28">Model:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, model: "iphone-14" })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-14"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 14
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    model: "iphone-14-pro-max",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-14-pro-max"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 14 Pro Max
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    model: "iphone-15",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-15"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 15
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    model: "iphone-15-pro-max",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-15-pro-max"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 15 Pro Max
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    model: "iphone-16",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-16"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 16
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    model: "iphone-16-pro-max",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.model === "iphone-16-pro-max"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                iPhone 16 pro max
              </button>
            </div>
          </div> */}
          {/* model selection */}
          <div className="flex gap-2 items-center w-full lg:w-auto">
            <p className="w-20 lg:w-28">Model:</p>
            <div className="w-60">
              <Select
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, model: e.target.value })
                }
                label="Select iPhone Model"
                // defaultSelectedKeys={"all"}
                className="max-w-xs"
              >
                {modelList.map((animal) => (
                  <SelectItem key={animal.key} value={animal.label}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="w-20 lg:w-28">Color: </p>
            <div className="flex items-center flex-wrap gap-1">
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, color: "#301934" })
                }
                className="w-10 h-10 lg:h-12 lg:w-12 rounded-full bg-[#301934] flex justify-center items-center"
              >
                <GiCheckMark
                  size={20}
                  color={`${
                    orderDetails.color === "#301934" ? "#fff" : "#301934"
                  }`}
                  className="transition ease-in delay-200"
                />
              </button>
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, color: "#215E7C" })
                }
                className="w-10 h-10 lg:h-12 lg:w-12 rounded-full bg-[#215E7C] flex justify-center items-center"
              >
                <GiCheckMark
                  size={20}
                  color={`${
                    orderDetails.color === "#215E7C" ? "#fff" : "#215E7C"
                  }`}
                  className="transition ease-in delay-200"
                />
              </button>
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, color: "#A50011" })
                }
                className="w-10 h-10 lg:h-12 lg:w-12 rounded-full bg-[#A50011] flex justify-center items-center"
              >
                <GiCheckMark
                  size={20}
                  color={`${
                    orderDetails.color === "#A50011" ? "#fff" : "#A50011"
                  }`}
                  className="transition ease-in delay-200"
                />
              </button>
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, color: "#F9E5C9" })
                }
                className="w-10 h-10 lg:h-12 lg:w-12 rounded-full bg-[#F9E5C9] flex justify-center items-center"
              >
                <GiCheckMark
                  size={20}
                  color={`${
                    orderDetails.color === "#F9E5C9" ? "#fff" : "#F9E5C9"
                  }`}
                  className="transition ease-in delay-200"
                />
              </button>
              <button
                onClick={() =>
                  setOrderDetails({ ...orderDetails, color: "#5C5B57" })
                }
                className="w-10 h-10 lg:h-12 lg:w-12 rounded-full bg-[#5C5B57] flex justify-center items-center"
              >
                <GiCheckMark
                  size={20}
                  color={`${
                    orderDetails.color === "#5C5B57" ? "#fff" : "#5C5B57"
                  }`}
                  className="transition ease-in delay-200"
                />
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <p className="w-20 lg:w-28">Storage: </p>
            <div className="w-60">
              <Select
                value={orderDetails.storage}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, storage: e.target.value })
                }
                // defaultSelectedKeys={"all"}
                label="Select Storage"
                className="max-w-xs"
              >
                {storageList.map((animal) => (
                  <SelectItem key={animal.key} value={animal.label}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    storage: "128GB",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.storage === "128GB"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                128GB
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    storage: "256GB",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.storage === "256GB"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                256GB
              </button>
              <button
                onClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    storage: "512GB",
                  })
                }
                className={`px-5 py-2 border-[1px] font-[400] ${
                  orderDetails.storage === "512GB"
                    ? "bg-teal-700 text-white hover:text-white"
                    : "border-gray-400"
                } hover:text-teal-800 transition-all duration-500 ease-in-out`}
              >
                512GB
              </button>
            </div> */}
          </div>
          <div className="flex gap-2 items-center w-full lg:w-auto">
            {/* date of birth */}
            <p className="w-[6.5rem] lg:w-28">Date Of Birth:</p>
            <input
              type="date"
              onChange={(event) =>
                setOrderDetails({
                  ...orderDetails,
                  dob: event.target.value,
                })
              }
              value={orderDetails.dob}
              className="px-5 py-3 flex-1 border-[1px] font-[400] border-gray-400 hover:border-teal-800 hover:text-teal-800 ease-linear delay-200 transition focus:outline-none"
            />
          </div>
          <div className="flex gap-2 items-center w-full lg:w-auto">
            <p className="w-20 lg:w-28">Country:</p>
            <div className="w-60">
              <Select
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    nationality: e.target.value,
                  })
                }
                label="Select Country"
                className="max-w-xs"
              >
                {countryList.map((country) => (
                  <SelectItem key={country.key} value={country.label}>
                    {country.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* <div className="flex gap-2 items-center w-full lg:w-auto">
            <p className="w-24 lg:w-28">Nationality:</p>
            <select
              onChange={(event) =>
                setOrderDetails({
                  ...orderDetails,
                  nationality: event.target.value,
                })
              }
              value={orderDetails.nationality}
              className="px-5 py-3 border-[1px] flex-1 font-[400] border-gray-400 hover:border-teal-800 hover:text-teal-800"
            >
              <option value="" disabled>
                Select Country
              </option>

              {countryList.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div> */}
          <Button
            color="primary"
            onClick={handleSubmit}
            className={`text-white h-12 bg-[#0D9488] w-full lg:w-3/4`}
          >
            NEXT <FaArrowRightLong size={16} />
          </Button>
        </div>
      </div>
      <div className="h-20 bg-teal-400 mt-5"></div>
    </>
  );
};

export default Home;
