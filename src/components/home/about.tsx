import ContactUs from "./contact-us"

export default function About() {

  return (
    <div>
      <div className="px-15 pt-10 lg:px-30">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Who are we</h1>
            <p className="text-left mt-5 text-base/7"><span className="font-semibold">EzRent</span> is your trusted partner for convenient and reliable car rentals. We offer a wide selection of well-maintained vehicles at transparent prices, perfect for any trip or occasion. Our mission is to make every journey simple, stress-free, and backed by exceptional customer service..</p>
          </div>
          <img 
            src="/car2.png" 
            alt="car" 
            className="w-100  hidden lg:block"
          />
        </div>

        <div className="flex justify-center items-center gap-8 mt-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Mission</h1>
            <p className="text-left mt-5 text-base/7">
              To provide fast, reliable, and affordable car rental services that prioritize customer convenience, safety, and satisfaction, ensuring a smooth and enjoyable travel experience every time.
            </p>
          </div>
          <div className="border self-stretch w-.5 border-gray-500"></div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Vision</h1>
            <p className="text-left mt-5 text-base/7">
              To become the leading car rental platform in the region by offering innovative solutions, expanding our vehicle fleet, and delivering exceptional service that sets new standards in the industry.
            </p>
          </div>
        </div>
      </div>

      <ContactUs/>
    </div>
  )
}