import { CircleX } from 'lucide-react';
import { Button } from "../ui/button";
import { getRandomColor } from "@/helper/random-color";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/common/use-axios-private";
import type { TestimonialsAdmin } from '@/lib/types';
import { useState } from 'react';

export default function AdminTestimonialsData() {
  const [isExpanded, setIsExpanded] = useState<{[key: number] : boolean}>({})
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  //testimonial, useQuery
  const {
    data: testimonials,
    isLoading: testimonialIsLoading,
    isError: testimonialIsError,
    error: testimonialError
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () : Promise<TestimonialsAdmin[]> => {
      const response = await axiosPrivate.get("/v1/testimonials-admin");

      return response?.data?.data?.allTestimonials
    }
  });

  //deleteTestimonial, useMutation
  const {
    mutate: deleteTestimonial
  } = useMutation({
    mutationFn: async (testimonialId : string) => {
      const response = await axiosPrivate.delete(`/v1/testimonials-admin/${testimonialId}`);

      return response
    },
    onSuccess: (response) => {
      console.log("Testimonial: ",response)
      queryClient.invalidateQueries({queryKey: ["testimonials"]})
    }
  });

  //selectTestimonial, useMutation
  const {
    mutate: selectTesmonial
  } = useMutation({
    mutationFn: async (testimonialId : string) => {
      const isSelected = true
      const resSelectedTestimonial = await axiosPrivate.post(`/v1/selectedTestimonials-admin/${testimonialId}`);
      const resTestimonial = await axiosPrivate.put(`/v1/testimonials-admin/${testimonialId}`, {isSelected});

      return {
        resSelectedTestimonial,
        resTestimonial
      }
    },
    onSuccess: ({resTestimonial, resSelectedTestimonial}) => {
      console.log("Selected Testimonial: ",resSelectedTestimonial)
      console.log("Testimonial: ",resTestimonial)
      queryClient.invalidateQueries({queryKey: ["testimonials"]})
    }
  });

  //deselectTestimonial, useMutation
  const {
    mutate: deselectTestimonial
  } = useMutation({
    mutationFn: async (testimonialId : string) => {
      const isSelected = false
      const resTestimonial = await axiosPrivate.put(`/v1/testimonials-admin/${testimonialId}`, {isSelected});
      const resSelectedTestimonial = await axiosPrivate.delete(`/v1/selectedTestimonials-admin/${testimonialId}`)
      
      return {
        resTestimonial,
        resSelectedTestimonial
      }
    },
    onSuccess: ({resTestimonial, resSelectedTestimonial}) => {
      console.log("Deselected Testimonial: ",resSelectedTestimonial)
      console.log("Testimonial: ",resTestimonial)
      queryClient.invalidateQueries({queryKey: ["testimonials"]})
    }
  })


  //deleteTestimonial Fn
  const handleDeleteTestimonial = (testimonialId : string) => {
    deleteTestimonial(testimonialId)
  }

  //selectTesmonial Fn
  const handleSelectTestimonial = (testimonialId : string) => {
    selectTesmonial(testimonialId)
  }

  //deselectTestimonial Fn
  const handleDeselectTestimonial = (testimonialId : string) => {
    deselectTestimonial(testimonialId)
  }

  //if testimonial useQuery failed
  if (testimonialIsError) {
    return (
      <div>
        {testimonialError.message || "An unexpected error occured"}
      </div>
    )
  }

  return (
    <div>
      <h1 className="place-self-center font-semibold italic mb-5" >Pick Testimonials to Highlight on the Homepage</h1>
      {testimonialIsLoading
        ? <p className="text-center italic">Retrieving testimonials data. Please wait!</p>
        : <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">

            {testimonials?.map((testimonial, i) => (
              <div 
                key={testimonial.testimonialId}
                className="border rounded-md p-5 flex flex-col justify-between gap-2 shadow-md relative bg-white"
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
                  <div>
                    {isExpanded[i] || testimonial?.content?.length <= 100
                      ? (
                         <span>{testimonial?.content}</span>
                        )
                      : (
                          <span>{testimonial?.content.substring(0, 100)}</span>
                        )}
                  </div>
                  {testimonial?.content?.length >= 100
                    &&  <button
                          onClick={() => setIsExpanded(prev => ({
                            ...prev,
                            [i]: !prev[i]
                          }))}
                          className="cursor-pointer text-gray-600"
                        >
                          { isExpanded[i]
                            ? "Read less"
                            : "Read more..."}
                        </button>}
                </div>
                <div>
                  {testimonial.isSelected
                    ? <Button 
                        variant="destructive"
                        className="w-full shadow-sm cursor-pointer text-white"
                        onClick={() => handleDeselectTestimonial(testimonial.testimonialId)}
                      >
                        Deselect
                      </Button>
                    : <Button 
                        className="w-full shadow-sm cursor-pointer bg-cyan-600 text-white"
                        onClick={() => handleSelectTestimonial(testimonial.testimonialId)}
                      >
                        Select
                      </Button>}
                  
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