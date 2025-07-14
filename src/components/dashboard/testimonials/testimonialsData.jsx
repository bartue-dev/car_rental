import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { CircleX, SquareMousePointer } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { Button } from "../../ui/button";
import { getRandomColor } from "../../../../utils/randomColor";

function TestimonialsData() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const logout = useLogout();

  useEffect(() => {
    const controller = new AbortController();

    const getTestimonials = async () => {
      try {
        const response = await axiosPrivate.get("/v1/testimonials-admin", { signal: controller.signal });

        setTestimonials(response?.data?.data?.allTestimonials)
      } catch (error) {

        if (error?.code === "ERR_NETWORK") {
          setError(error?.message)
        } else if (error?.response?.status === 400) {
          setError(error?.response?.data?.message)
        } else if (error?.response?.status === 403) {
          await logout();
          navigate("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    getTestimonials();

    return () => controller.abort();
  }, [axiosPrivate])

  const handleDeleteTestimonial = async (testimonialId) => {

    try {
      await axiosPrivate.delete(`/v1/testimonials-admin/${testimonialId}`);

      setTestimonials(prev => (
        prev.filter(item => {
          return item.testimonialId !== testimonialId
        })
      ))

    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectTestimonial = async (testimonialId) => {
    try {
      console.log("SELECT BUTTON CLICKED!")
      const response = await axiosPrivate.post(`/v1/selectedTestimonials-admin/${testimonialId}`);

      console.log("SELECTED TESIMONIALS:", response)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1 className="place-self-center font-semibold italic mb-5" >Pick Testimonials to Highlight on the Homepage</h1>
      {isLoading
        ? <p className="text-center italic">Retrieving testimonials data. Please wait!</p>
        : error 
        ? <p className="text-center italic">Sorry unable to retrieve testimonials data</p>
        : <div className="grid grid-cols-3 gap-8">

            {testimonials?.map((testimonial) => (
              <div 
                key={testimonial.testimonialId}
                className="border rounded-md p-5 flex flex-col justify-between gap-2 shadow-md relative"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="rounded-full w-10 h-10 text-white font-semibold flex items-center justify-center"
                    style={{backgroundColor: getRandomColor()}}
                  >
                    {testimonial?.user?.username.split("")[0].toUpperCase()}                  
                  </div>
                  <h1>{testimonial?.user?.username}</h1>
                </div>
                <div className="text-sm leading-7 ml-12 flex-grow">
                  <p>{testimonial?.content}</p>
                </div>
                <div>
                  <Button 
                    variant="outline"
                    className="w-full shadow-sm cursor-pointer bg-cyan-600 text-white"
                    onClick={() => handleSelectTestimonial(testimonial.testimonialId)}
                  >
                    Select
                  </Button>
                </div>
                <button className="absolute top-3 right-2 cursor-pointer">
                 <CircleX 
                  strokeWidth={1}
                  onClick={() => handleDeleteTestimonial(testimonial.testimonialId)}
                  />
                </button>
              </div>
            ))}
          </div>}
    </div>
  )
}

export default TestimonialsData;