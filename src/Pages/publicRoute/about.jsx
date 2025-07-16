import ContactUs from "@/components/common/contact-us";

function About() {

  return (
    <div>
      <div className="flex justify-center items-center px-30">
        <div>
          <h1 className="text-4xl font-bold">Who are we</h1>
          <p className="text-left mt-5 "><span className="font-semibold">EzRent</span> is your trusted partner for convenient and reliable car rentals. We offer a wide selection of well-maintained vehicles at transparent prices, perfect for any trip or occasion. Our mission is to make every journey simple, stress-free, and backed by exceptional customer service..</p>
        </div>
        <img src="/car2.png" alt="car" className="w-140"/>
      </div>

      <ContactUs/>
    </div>
  )
}

export default About;