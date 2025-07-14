import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getRandomColor } from "../../../utils/randomColor";


function HomeTestimonials() {
  const [homeTestimonials, setHomeTestimonials] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [slideIndex, setSlideIndex] = useState(1)

  useEffect(() => {
    const controller = new AbortController();

    const getSelectedTestimonials = async () => {
      try {
      const response = await axiosPrivate.get("/v1/selectedTestimonials-public", {signal: controller.signal});

      console.log(response?.data?.data?.selectedTestimonials)

      setHomeTestimonials(response?.data?.data?.selectedTestimonials);

      } catch (error) {
        console.error(error)
      } finally {
        setIsloading(false)
      }
    }

    getSelectedTestimonials();

    return () => controller.abort();
  },[axiosPrivate])

  //next btn
  const handleNextbtn = () => {
    setSlideIndex(prev => {
      if (prev >= homeTestimonials.length) {
        return 1
      }
      return prev + 1
    })

  }

  //prev btn
  const handlePrevbtn = () => {
    setSlideIndex(prev => {
      if (prev <= 1) {
        return homeTestimonials.length
      }
      return prev - 1
    })

    if (slideIndex <= 1) return setSlideIndex(homeTestimonials.length)
  }

  return (
    <div className="bg-gray-100 p-10 font-poppins relative">
        {isLoading
          ? <p className="text-xs italic"> Retreiving Customer Testimonials. Please Wait</p>
          : <div className="place-self-center w-3/4 flex flex-col justify-center items-center gap-5">
              <h1 className="font-semibold " >WHAT OUR CUSTOMER SAY</h1>
              {homeTestimonials.length > 0
                &&  <div className="text-center flex flex-col justify-between items-center gap-8">
                      <p className="text-base italic">{homeTestimonials[slideIndex - 1]?.testimonial.content}</p>
                      <div 
                        className="rounded-full w-10 h-10 text-white flex items-center justify-center text-xl"
                        style={{backgroundColor: getRandomColor()}}
                      >
                        {homeTestimonials[slideIndex - 1]?.testimonial?.user?.username.charAt(0).toUpperCase()}             
                      </div>
                    </div>}
            </div>}

      <button>
        <ChevronLeft 
        onClick={() => handlePrevbtn()}
        className="absolute top-1/2 left-10 cursor-pointer"
        />
      </button>
      <button>
        <ChevronRight 
        onClick={() => handleNextbtn()}
        className="absolute top-1/2 right-10 cursor-pointer"
        />
      </button>
    </div>
  )
}

export default HomeTestimonials;