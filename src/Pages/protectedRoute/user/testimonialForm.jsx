import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import useLogout from "@/hooks/useLogout";

function TestimonialForm() {
  const [errMsg, setErrMsg] = useState()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const content = formData.get("content");

      if (content.length <= 0) {
        setErrMsg("Content must not be empty");
      }

      setErrMsg()

      // create testimonials(user)
      const response = await axiosPrivate.post("/v1/testimonials", {content});

      console.log("TESTIMONIAL RESPONSE:", response)

      toast.success("Testimonial submitted")

      e.target.reset();

    } catch (error) {
      console.error(error)
      // if refresh token expires in cookie logout and navigate to log in
      if (error?.status === 403) {
        await logout();
        navigate("/login", { state: { from: location }, replace:true })
      }
    }
  }


  return (
    <div className="font-poppins w-1/2 flex flex-col gap-5 place-self-center">
      <Toaster position="top-center"/>
      <h1 className="text-3xl font-bold">Share your feedback</h1>
      <p className="text-base">Thanks for using our service! We'd love to hear your thoughts—just a quick message to let us know how we can improve and do better next time.</p>

      <p className="text-base">Your feedback really helps us grow and serve you better. Feel free to share anything you liked or think we could do differently—we&apos;re always listening!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content"></label>
          <textarea className="textarea resize-none w-full border" placeholder="Your message" id="content" name="content" rows={8}></textarea>
          {errMsg && <p className="text-xs text-red-500 mt-3">{errMsg}</p>}
        </div>
        <button className="btn btn-primary mt-5" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TestimonialForm;