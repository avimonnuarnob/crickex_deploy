import demoBanner from "@/assets/images/demo-banner-sm.jpg";
import logo from "@/assets/images/logo-color.png";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LoginOrSignupHeader = () => {
  return (
    <>
      <div className='px-4 py-7 text-center'>
        <Image src={logo} alt='Logo' width={142} height={24} className='inline-block' />
      </div>

      <div className='mb-7'>
        <Swiper
          modules={[Pagination]}
          spaceBetween={5}
          loop
          centeredSlides
          slidesPerView={1.5}
          initialSlide={2}
          pagination={{
            clickable: true,
            bulletClass: "swiper-bullet",
            renderBullet: function (index, className) {
              return `<span class='${className} bg-[#7AA8D0] rounded-full h-0.5 w-4 inline-block mx-2.5 cursor-pointer'></span>`;
            }
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <div className='flex h-25 items-center justify-center rounded-md bg-gray-200'>
                <Image src={demoBanner} alt='Demo banner' className='h-full w-full rounded-md object-cover' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default LoginOrSignupHeader;
