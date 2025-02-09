import SwiperSlider from "@/components/SwiperSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const OrderSuccessPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const _id = params.get("id");
  const [order, setOrder] = useState([]);

  console.log("oreder data", order);

  const url = `${process.env.API_URL}/api/order/${_id}`;
  const fetchOrder = useCallback(async () => {
    if (!_id) return; // Early return if _id is not available or nafatOtpThree is already set

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
    //if (order.nafatOtpThree) return; // Stop polling if nafatOtpThree is already set
    const intervalId = setInterval(() => {
      fetchOrder();
    }, 2000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [fetchOrder, order.nafatOtpThree]);

  const handleWhatsAppRedirect = () => {
    // if (order.whatsappNumber) {
    window.open(
      `https://wa.me/${
        order.whatsappNumber ? order.whatsappNumber : "8801798645073"
      }`,
      "_blank"
    );
    // }
  };

  return (
    <section>
      <SwiperSlider />
      <div className="w-full py-10 lg:py-6 flex flex-col items-center justify-center text-center gap-2 text-black">
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
          className="w-40 h-40 lg:w-60 lg:h-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="success"
            // width="150"
            // height="150"
            viewBox="0 0 101 101"
            fill="none"
          >
            <ellipse
              cx="50.5171"
              cy="49.9367"
              rx="11.5213"
              ry="11.5497"
              fill="#00AC3E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="checkmark"
              d="M45.2576 48.604L49.084 52.6483L55.1814 46.1154"
              stroke="white"
              stroke-width="2.5"
            />
            <line
              className="line1"
              x1="61.8656"
              y1="13.4946"
              x2="58.3004"
              y2="26.8"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line2"
              x1="84.906"
              y1="32.622"
              x2="72.9767"
              y2="39.5094"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line3"
              x1="87.6729"
              y1="62.4366"
              x2="74.3675"
              y2="58.8715"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line4"
              x1="68.5467"
              y1="85.4764"
              x2="61.6593"
              y2="73.5471"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line5"
              x1="45.1935"
              y1="75.715"
              x2="41.6283"
              y2="89.0205"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line6"
              x1="29.1204"
              y1="64.8283"
              x2="17.1911"
              y2="71.7157"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line7"
              x1="25.4527"
              y1="45.765"
              x2="12.1473"
              y2="42.1998"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              className="line8"
              x1="36.3394"
              y1="29.6917"
              x2="29.452"
              y2="17.7624"
              stroke="#00AC3E"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </motion.div>

        <div className=" text-lg lg:text-3xl font-bold">
          <p>Your Order application complete.</p>
          <p className="mt-1 lg:mt-2 mb-4">
            Contact with whatsapp to proceed further.
          </p>
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-teal-600 px-6 py-3 lg:mr-3 mb-3 lg:mb-0 rounded-xl text-white text-base"
          >
            Contact with WhatsApp
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-teal-600 px-6 py-3 rounded-xl text-white text-base"
          >
            Back to Homepage
          </button>
        </div>
      </div>
      <div className="h-20 bg-teal-400 mt-5"></div>
    </section>
  );
};

export default OrderSuccessPage;
