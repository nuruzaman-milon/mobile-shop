// import { useRouter, useSearchParams } from "next/navigation";

// // Import Swiper styles
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import SwiperSlider from "@/components/SwiperSlider";
// import { Button } from "@nextui-org/react";

// const OrderConfirmationOtp = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   // a countdown timer function
//   const [time, setTime] = useState(90);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime === 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {
//       orderConfirmationOtp: e.target.orderConfirmationOtp.value,
//     };
//     // console.log("submitData", submitData);
//     // console.log('params.get(id)', params.get('id'))
//     if (submitData.orderConfirmationOtp === "") {
//       toast.error("Please enter your order confirmation otp");
//     } else {
//       // post all the data through api localhost:3000/api/order
//       fetch(`${process.env.API_URL}/api/order/${params.get("id")}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // console.log('data', data)
//           if (data) {
//             router.push({
//               pathname: "/profession",
//               query: { id: data._id },
//             });
//           } else {
//             toast.error("Please enter correct otp");
//           }
//         });
//     }
//   };

//   return (
//     <>
//       {/* create a form so that I can add user-name, email, phone number etc add some design also */}
//       <SwiperSlider />
//       <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
//         <h1 className="text-4xl font-bold text-gray-600 mt-10">
//           Order Confirmation OTP
//         </h1>
//         {/* a countdown timer for 180s design */}
//         <div className="flex justify-center items-center gap-2 mt-5 border-4 h-28 w-28 rounded-full">
//           <h1 className="text-2xl font-bold text-gray-600 m-0">
//             {Math.floor(time / 60)}:
//           </h1>
//           <h1 className="text-2xl font-bold text-gray-600 m-0">{time % 60}</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="w-3/4 my-14">
//           <div className="relative z-0 w-full mb-6 group">
//             <input
//               type="number"
//               name="orderConfirmationOtp"
//               id="orderConfirmationOtp"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//               placeholder=""
//               required
//             />
//             <label
//               htmlFor="firstOtp"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Enter Order Confirmation OTP
//             </label>
//           </div>
//           {/* <button
//             type="submit"
//             className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
//           >
//             Next <FaArrowRightLong size={16} />
//           </button> */}
//           <Button
//             color="primary"
//             type="submit"
//             className={`w-full text-white h-12 bg-[#0D9488]`}
//           >
//             Submit OTP <FaArrowRightLong size={16} />
//           </Button>
//         </form>
//       </div>
//       <div className="h-20 bg-teal-400 mt-5"></div>
//     </>
//   );
// };

// export default OrderConfirmationOtp;

import { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ModernOrderConfirmationOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [time, setTime] = useState(90);
  const [orderConfirmationOtp, setOrderConfirmationOtp] = useState("");

  // Countdown timer (90 seconds)
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
      orderConfirmationOtp: orderConfirmationOtp,
    };

    if (submitData.orderConfirmationOtp === "") {
      toast.error("Please enter your order confirmation OTP");
      return;
    }

    // API call with toast
    toast.promise(
      fetch(`${process.env.API_URL || ""}/api/order/${params.get("id")}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data._id) {
            setTimeout(() => {
              router.push(`/profession?id=${data._id}`);
            }, 1000);
            return data;
          } else {
            throw new Error("Please enter correct OTP");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        }),
      {
        loading: "Verifying OTP...",
        success: "Order confirmed! Redirecting...",
        error: "Please enter correct OTP",
      }
    );
  };

  // Format time display
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const isExpired = time === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">
              Order Confirmation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Confirm Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enter the confirmation code to finalize your order
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-800">
          {/* Timer Display */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${
                  isExpired
                    ? "from-red-500 to-orange-500"
                    : "from-teal-500 to-cyan-500"
                } rounded-full blur opacity-25 animate-pulse`}
              ></div>
              <div
                className={`relative w-32 h-32 rounded-full border-4 ${
                  isExpired ? "border-red-500" : "border-teal-500"
                } bg-slate-800/50 backdrop-blur-xl flex items-center justify-center`}
              >
                <div className="text-center">
                  <FaClock
                    className={`w-6 h-6 ${
                      isExpired ? "text-red-400" : "text-teal-400"
                    } mx-auto mb-2`}
                  />
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={`text-3xl font-bold ${
                        isExpired ? "text-red-400" : "text-white"
                      }`}
                    >
                      {minutes.toString().padStart(2, "0")}
                    </span>
                    <span
                      className={`text-3xl font-bold ${
                        isExpired ? "text-red-400" : "text-white"
                      }`}
                    >
                      :
                    </span>
                    <span
                      className={`text-3xl font-bold ${
                        isExpired ? "text-red-400" : "text-white"
                      }`}
                    >
                      {seconds.toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {isExpired ? (
              <p className="text-red-400 text-sm font-medium mt-4">
                ⚠️ OTP has expired
              </p>
            ) : (
              <p className="text-gray-400 text-sm font-medium mt-4">
                Time remaining
              </p>
            )}
          </div>

          {/* OTP Form */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Enter Confirmation Code
              </h2>
              <p className="text-gray-400">
                Please enter the OTP code sent to your phone
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FaLock className="text-teal-400" />
                Order Confirmation OTP
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="orderConfirmationOtp"
                  value={orderConfirmationOtp}
                  onChange={(e) => setOrderConfirmationOtp(e.target.value)}
                  className="w-full px-4 py-4 text-center text-2xl tracking-widest bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                  placeholder="000000"
                  maxLength="6"
                  disabled={isExpired}
                  required
                />
              </div>
              {isExpired && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  ⚠️ Please request a new OTP code
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400 flex items-start gap-2">
                <FaCheckCircle className="text-teal-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-teal-400">Final Step:</strong> This
                  confirmation code verifies your order details and completes
                  your purchase.
                </span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isExpired}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                isExpired
                  ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-teal-500/50"
              }`}
            >
              {isExpired ? "OTP Expired" : "Confirm Order"}
              {!isExpired && (
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            {/* Resend Link */}
            <div className="text-center">
              <button
                className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
                onClick={() => toast.info("Resend functionality coming soon")}
              >
                {`Didn't receive the code? Resend OTP`}
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400 flex items-start gap-2">
                <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-teal-400">Security Reminder:</strong>{" "}
                  Never share your OTP code with anyone. Our team will never ask
                  for your OTP.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {/* <div className="mt-12 max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Step 8 of 9</span>
            <span className="text-sm text-teal-400 font-medium">95% Complete</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
