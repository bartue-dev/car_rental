import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { CircleX, SquareMousePointer } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";

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

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-sm">Quick Actions</h1>
        <div className="flex justify-between items-center gap-5 mt-2">
          <div className="border rounded-sm w-60 h-20 p-5 flex items-center gap-5 shadow-xs cursor-pointer">
            <SquareMousePointer size={35} strokeWidth={1}/>
            <div>
              <h1 className="text-sm">Select testimonials</h1>
            </div>
          </div>
        </div>
      </div>
      {isLoading
        ? <p className="text-center italic">Retrieving testimonials data. Please wait!</p>
        : error 
        ? <p className="text-center italic">Sorry unable to retrieve testimonials data</p>
        : <div className="grid grid-cols-2 gap-3">
            {testimonials?.map((testimonial) => (
              <div 
                key={testimonial.testimonialId}
                className="border rounded-md p-5 flex flex-col gap-2 relative"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 bg-blue-400 text-white font-semibold flex items-center justify-center">
                    {testimonial?.user?.username.split("")[0].toUpperCase()}                  
                  </div>
                  <h1>{testimonial?.user?.username}</h1>
                </div>
                <div className="ml-12">
                  <p>{testimonial?.content}</p>
                </div>
                <div className="absolute top-3 right-2 cursor-pointer">
                 <CircleX strokeWidth={1}/>
                </div>
              </div>
            ))}
          </div>}
    </div>
  )
}

export default TestimonialsData;