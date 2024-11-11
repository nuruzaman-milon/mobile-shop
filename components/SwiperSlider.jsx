import { Pagination, Autoplay, A11y, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FaArrowRightLong } from "react-icons/fa6";

const SwiperSlider = () => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y, EffectCards]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className="!h-[300px] xl:!h-[350px] 2xl:!h-[450px] w-full bg-[url('/images/iphone15.png')] bg-center bg-cover bg-no-repeat">
        <div className="h-[300px] flex flex-col justify-center items-center lg:items-end lg:mx-40">
          <h1 className="text-4xl font-bold text-white">Dreaming iPhone</h1>
          <button className="py-3 px-5 w-fit text-white hover:text-white hover:bg-teal-500 font-bold border-gray-500 hover:border-teal-500 border text-sm flex items-center gap-2 justify-center rounded-sm transition-all delay-150 ease-in-out">
            Order Now <FaArrowRightLong size={16} />
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!h-[300px] xl:!h-[350px] 2xl:!h-[450px] w-full bg-[url('/images/iphone14.png')] bg-center bg-cover bg-no-repeat">
        <div className="h-[300px] flex flex-col justify-center items-center lg:items-end lg:mx-40">
          <h1 className="text-4xl font-bold text-white">IPhone 15 Pro Max</h1>
          <button className="py-3 px-5 w-fit text-white hover:text-white hover:bg-teal-500 font-bold border-gray-500 hover:border-teal-500 border text-sm flex items-center gap-2 justify-center rounded-sm transition-all delay-150 ease-in-out">
            Order Now <FaArrowRightLong size={16} />
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!h-[300px] xl:!h-[350px] 2xl:!h-[450px] w-full bg-[url('/images/iphone4.jpeg')] bg-top bg-cover bg-no-repeat">
        <div className="h-[300px] flex flex-col justify-center items-center lg:items-end lg:mx-40">
          <h1 className="text-4xl font-bold text-white">IPhone 16 Pro Max</h1>
          <button className="py-3 px-5 w-fit text-gray-700 bg-gray-200 hover:text-white hover:bg-teal-500 font-bold border-gray-500 hover:border-teal-500 border text-sm flex items-center gap-2 justify-center rounded-sm transition-all delay-150 ease-in-out">
            Order Now <FaArrowRightLong size={16} />
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!h-[300px] xl:!h-[350px] 2xl:!h-[450px] w-full bg-[url('/images/iphone3.png')] bg-top bg-cover bg-no-repeat">
        <div className="h-[300px] flex flex-col justify-center items-center lg:items-end lg:mx-40">
          <h1 className="text-4xl font-bold text-white">Buy Your Dreams</h1>
          <button className="py-3 px-5 w-fit text-white hover:text-white hover:bg-teal-500 font-bold border-gray-500 hover:border-teal-500 border text-sm flex items-center gap-2 justify-center rounded-sm transition-all delay-150 ease-in-out">
            Order Now <FaArrowRightLong size={16} />
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
