import { useState } from "react";
import {
  FaArrowRight,
  FaUser,
  FaBuilding,
  FaDollarSign,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
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
    if (!fullName || fullName.trim().length === 0) {
      toast.error("Please enter your full name");
      return;
    }

    if (fullName.trim().length < 3) {
      toast.error("Full name must be at least 3 characters");
      return;
    }

    if (!companyName || companyName.trim().length === 0) {
      toast.error("Please enter your company name");
      return;
    }

    if (!monthlySalary || monthlySalary === "") {
      toast.error("Please enter your monthly salary");
      return;
    }

    if (isNaN(monthlySalary) || Number(monthlySalary) <= 0) {
      toast.error("Please enter a valid salary amount");
      return;
    }

    // Build query params with all data
    const queryParams = new URLSearchParams({
      model: params.model,
      color: params.color,
      storage: params.storage,
      nationality: params.nationality,
      dob: params.dob,
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      monthlySalary: monthlySalary,
    });

    // Show success toast and redirect
    toast.success("Details saved! Redirecting...");

    setTimeout(() => {
      router.push(`/user-info?${queryParams.toString()}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">Step 2 of 3</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Tell Us About{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Yourself
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We need a few more details to complete your order
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

                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-gray-400">Date of Birth</span>
                  <span className="text-white font-semibold">{params.dob}</span>
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
            <h2 className="text-2xl font-bold text-white mb-2">
              Personal Information
            </h2>
            <p className="text-gray-400 mb-6">
              Please fill in your details below
            </p>

            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaUser className="text-teal-400" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
                {fullName.trim().length > 0 &&
                  fullName.trim().length < 3 &&
                  isFormSubmit && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      ⚠️ Full name must be at least 3 characters
                    </p>
                  )}
                {fullName.trim().length === 0 && isFormSubmit && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    ⚠️ Full name is required
                  </p>
                )}
              </div>

              {/* Company Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaBuilding className="text-teal-400" />
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                    placeholder="Enter your company name"
                  />
                </div>
                {companyName.trim().length === 0 && isFormSubmit && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    ⚠️ Company name is required
                  </p>
                )}
              </div>

              {/* Monthly Salary Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaDollarSign className="text-teal-400" />
                  Monthly Salary
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="monthlySalary"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                    placeholder="Enter monthly salary (SAR)"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter your monthly salary in SAR
                </p>
                {monthlySalary !== "" &&
                  (isNaN(monthlySalary) || Number(monthlySalary) <= 0) &&
                  isFormSubmit && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      ⚠️ Please enter a valid salary amount
                    </p>
                  )}
                {monthlySalary === "" && isFormSubmit && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    ⚠️ Monthly salary is required
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                <p className="text-sm text-gray-400">
                  <strong className="text-teal-400">Privacy:</strong> Your
                  information is secure and will be used only for verification
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
