// import React from 'react'
// import { assets, features } from '../assets/assets'

// const BottomBanner = () => {
//   return (
//     <div className='relative mt-24'>
//         <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block' />

//         <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden' />

//         <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
//             <div>
//                 <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>why We Are The Best?</h1>
//                 {features.map((feature, index)=>(
//                     <div key={index} className='flex items-center gap-4 mt-2'>
//                         <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
//                       <div>
//                       <h3 className='text-lg md:text-xl font-semibold'>{feature.title} </h3>
//                       <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
//                       </div>
//                     </div>
//                 ))}
//             </div>

//         </div>

//     </div>
//   )
// }

// export default BottomBanner

import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Desktop */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />

      {/* Mobile */}
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-24 px-4">
        <div className="max-w-md">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
            Why People Trust G-Mart
          </h2>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 mb-4 group"
            >
              {/* Icon */}
              <div className="
                bg-yellow-400/20 
                p-2 
                rounded-md
                transition 
                duration-300
                group-hover:scale-110
                group-hover:bg-yellow-400/40
              ">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-8 animate-pulse"
                />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white drop-shadow">
                  {feature.title}
                </h4>
                <p className="text-sm text-white/80 drop-shadow-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
