import useAxiosPrivate from "@/hooks/common/use-axios-private";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import useLogout from "@/hooks/common/use-logout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

//TestimonialSchema
const TestimonialSchema = z.object({
  content: z.string().min(1, "Content must not be empty")
});

//TestimonialsData infer TestimonialSchema type
type TestimonialData = z.infer<typeof TestimonialSchema>

//TestimonialFrom Component
export default function TestimonialForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset
  } = useForm<TestimonialData>({
    resolver: zodResolver(TestimonialSchema)
  });


  const {mutate: addTestimonial} = useMutation({
    mutationFn: async (data: TestimonialData) => {
      // create testimonials(user)
      const response = await axiosPrivate.post("/v1/testimonials", {
        content: data.content
      });

      return response
    },
    onSuccess: (response) => {
      console.log("TESTIMONIAL RESPONSE:", response)

      toast.success("Testimonial submitted")

      reset();
    },
    onError: async (error: ApiError) => {
      console.error(error)
      // if refresh token expires in cookie logout and navigate to log in
      if (error?.status === 403) {
        await logout();
        navigate("/login", { state: { from: location }, replace:true })
      }
    }
  })



  const onSubmit = (data: TestimonialData) => {
    addTestimonial(data)
  }


  return (
    <div className="font-poppins w-1/2 flex flex-col gap-5 place-self-center py-5">
      <Toaster position="top-center"/>
      <h1 className="text-3xl font-bold">Share your feedback</h1>
      <p className="text-base">Thanks for using our service! We'd love to hear your thoughts—just a quick message to let us know how we can improve and do better next time.</p>

      <p className="text-base">Your feedback really helps us grow and serve you better. Feel free to share anything you liked or think we could do differently—we&apos;re always listening!</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="content"></label>
          <Textarea 
            className="h-[180px] bg-white resize-none" 
            placeholder="Your message" 
            id="content" 
            {...register("content")}
            rows={8}
          >
            {/* text area */}
          </Textarea>
          {errors?.content && <p className="text-xs text-red-500 mt-3">{errors?.content.message}</p>}
        </div>
        <button 
          className="btn btn-primary mt-5" type="submit"
          disabled={isSubmitting}
        >
          Submit
          {isSubmitting 
            && <LoaderCircle 
                size={50}
                className="animate-spin" 
              />}
        </button>
      </form>
    </div>
  )
}