import axios from "@/api/axios";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import type { SelectedTestimonialsTypes } from "@/lib/types";
import { getRandomColor } from "@/helper/random-color";

function HomeTestimonials() {
  const [slideIndex, setSlideIndex] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)


  //react-query, useQuery method
  const {data: selectedTestimonials = [], isLoading} = useQuery({
    queryKey: ["selectedTestimonials"],
    queryFn: async () : Promise<SelectedTestimonialsTypes[]> => {
      const response = await axios.get("/v1/selectedTestimonials-public",{
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
      });

      return response?.data?.data?.selectedTestimonials
    }
  });

  //next btn fn
  const handleNextbtn = () => {
    setSlideIndex(prev => {
      if (prev >= selectedTestimonials.length) {
        return 1
      }
      return prev + 1
    })

  }

  //prev btn fn
  const handlePrevbtn = () => {
    setSlideIndex(prev => {
      if (prev <= 1) {
        return selectedTestimonials.length
      }
      return prev - 1
    })

    if (slideIndex <= 1) return setSlideIndex(selectedTestimonials.length)
  }

  return (
    <div className="bg-white h-[350px] p-10 font-poppins relative overflow-auto">
        {isLoading
          ? <p className="text-sm italic text-center"> Retrieving Customer Testimonials. Please Wait...</p>
          : <div className="place-self-center w-3/4 flex flex-col justify-center items-center gap-5 mt-2">
              <h1 className="font-semibold" >WHAT OUR CUSTOMER SAY</h1>
              {selectedTestimonials.length > 0
                &&  <div 
                      className="text-center flex flex-col justify-between items-center gap-8"
                      >
                      <div
                        className="text-sm md:text-base italic "
                      >
                          { isExpanded 
                          || selectedTestimonials[slideIndex - 1]?.testimonial?.content.length <= 500 
                          ? <span> 
                              {selectedTestimonials[slideIndex - 1]?.testimonial?.content + " "}
                            </span> 
                          : <span>
                              {selectedTestimonials[slideIndex - 1]?.testimonial?.content?.substring(0,500) + " "}
                            </span> }
                          {
                            selectedTestimonials[slideIndex - 1]?.testimonial?.content.length >= 500 
                            && <button
                                  onClick={() => setIsExpanded(prev => !prev)}
                                  className="text-gray-600 text-xs md:text-sm"
                                >
                                    {isExpanded ? " Read less" : "...Read more"}
                                </button>  
                          }
                      </div>
                      <div 
                        className="rounded-full w-10 h-10 text-white flex items-center justify-center text-xl bg-gray-400"
                        style={{backgroundColor: getRandomColor()}}
                      >
                        {selectedTestimonials[slideIndex - 1]?.testimonial?.user?.username?.charAt(0).toUpperCase()}             
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