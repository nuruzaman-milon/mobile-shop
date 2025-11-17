// import { FaArrowRightLong } from "react-icons/fa6";
// import { useRouter, useSearchParams } from "next/navigation";
// import SwiperSlider from "@/components/SwiperSlider";
// import { useEffect, useState } from "react";
// import { Button, CircularProgress } from "@nextui-org/react";

// const Address = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   // const [time, setTime] = useState(30)
//   // a countdown timer function
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setValue((v) => {
//         if (v >= 100) {
//           clearInterval(interval);
//           return 100; // Stop at 100%
//         }
//         return v + 1;
//       });
//     }, 150); // 1200 milliseconds = 1.2 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const params = new URLSearchParams(searchParams);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const submitData = {
//       city: event.target.city.value,
//       details: event.target.details.value,
//     };

//     if (submitData.city === "") {
//       toast.error("Please enter your city");
//     } else if (submitData.details === "") {
//       toast.error("Please enter your address details");
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
//           if (data) {
//             router.push({
//               pathname: "/nafat-otp-two",
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
//       <SwiperSlider />
//       <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
//         <h1 className="text-4xl font-bold text-gray-600 mt-10">
//           User Address Details
//         </h1>
//         {/* if time is > 0 then run countdown. after that the from */}
//         {value < 100 ? (
//           <>
//             {/* <div className="flex justify-center items-center gap-2 mt-5 border-4 h-28 w-28 rounded-full"> */}
//             <CircularProgress
//               classNames={{
//                 svg: "w-36 h-36 drop-shadow-md",
//                 indicator: "stroke-[#0D9488]",
//                 track: "#0D9488",
//                 value: "text-3xl font-semibold text-gray-700",
//               }}
//               value={value}
//               strokeWidth={4}
//               showValueLabel={true}
//             />
//             {/* </div> */}
//             <h3 className="text-xl font-bold text-gray-600 mt-10">
//               Please wait for the process to be completed...
//             </h3>
//           </>
//         ) : (
//           <form onSubmit={handleSubmit} className="w-3/4 my-14">
//             <div className="grid md:grid-cols-2 md:gap-6">
//               <div className="relative z-0 w-full mb-6 group">
//                 <input
//                   type="text"
//                   name="city"
//                   id="city"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                   placeholder=""
//                   required
//                 />
//                 <label
//                   htmlFor="city"
//                   className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   City
//                 </label>
//               </div>
//               <div className="relative z-0 w-full mb-6 group">
//                 <input
//                   type="text"
//                   name="details"
//                   id="details"
//                   className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                   placeholder=""
//                   required
//                 />
//                 <label
//                   htmlFor="details"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Details
//                 </label>
//               </div>
//             </div>

//             {/* <button
//               type="submit"
//               className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
//             >
//               Next <FaArrowRightLong size={16} />
//             </button> */}
//             <Button
//               color="primary"
//               type="submit"
//               className={`w-full text-white h-12 bg-[#0D9488]`}
//             >
//               Submit Address <FaArrowRightLong size={16} />
//             </Button>
//           </form>
//         )}
//       </div>
//       <div className="h-20 bg-teal-400 mt-5"></div>
//     </>
//   );
// };

// export default Address;

import { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaCity,
  FaHome,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ModernAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [value, setValue] = useState(0);
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  // Progress countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(interval);
          return 100;
        }
        return v + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Set minimum date to tomorrow
  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // Set to 9:00 AM
    return tomorrow.toISOString().slice(0, 16);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submitData = {
      city: city,
      details: details,
      deliveryDate: deliveryDate ? new Date(deliveryDate).toISOString() : null,
    };

    if (submitData.city === "") {
      toast.error("Please enter your city");
      return;
    }

    if (submitData.details === "") {
      toast.error("Please enter your address details");
      return;
    }

    if (!submitData.deliveryDate) {
      toast.error("Please select a delivery date and time");
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
              router.push(`/nafat-otp-two?id=${data._id}`);
            }, 1000);
            return data;
          } else {
            throw new Error("Could not process your request");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        }),
      {
        loading: "Saving address...",
        success: "Address saved successfully! Redirecting...",
        error: "Please enter correct information",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">
              Address Information
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Address
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Provide your delivery address details
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {value < 100 ? (
          // Loading State
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-800 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - value / 100)}`}
                    className="text-teal-500 transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {value}%
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Processing...
            </h3>
            <p className="text-gray-400">
              Please wait for the process to be completed
            </p>
          </div>
        ) : (
          // Form State
          <div className="space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Address Details
                </h2>
                <p className="text-gray-400">
                  Please provide your complete address information
                </p>
              </div>

              <div className="space-y-6">
                {/* City Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaCity className="text-teal-400" />
                    City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                      placeholder="Enter your city name"
                      required
                    />
                  </div>
                </div>

                {/* Details Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaHome className="text-teal-400" />
                    Address Details
                  </label>
                  <div className="relative">
                    <textarea
                      name="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500 resize-none"
                      placeholder="Street, Building number, Apartment number, etc."
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    💡 Include all relevant details for accurate delivery
                  </p>
                </div>

                {/* Delivery Date & Time Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaCalendarAlt className="text-teal-400" />
                    Preferred Delivery Date & Time
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="deliveryDate"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={getMinDateTime()}
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    📅 Select your preferred delivery date and time
                  </p>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-teal-400">
                        Delivery Information:
                      </strong>{" "}
                      Your address will be used for order delivery. Please
                      ensure all details are accurate.
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Submit Address
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Address Tips */}
            <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-400" />
                Address Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>
                    Include your complete street address and building number
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>Add apartment or unit number if applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>Mention nearby landmarks for easier delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>
                    Delivery slots are available from 9:00 AM to 9:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
