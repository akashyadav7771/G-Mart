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
            <div key={index} className="flex gap-4 mb-4 group">
              {/* Icon */}
              <div
                className="
                bg-yellow-400/20 
                p-2 
                rounded-md
                transition 
                duration-300
                group-hover:scale-110
                group-hover:bg-yellow-400/40
              "
              >
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
