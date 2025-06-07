import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function TestimonialForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const content = formData.get("content");

      // create testimonials(user)
      await axiosPrivate.post("/v1/testimonials", {content});

    } catch (error) {
      console.error(error)
      // if refresh token expires in cookie navigate to log in
      navigate("/login", { state: { from: location }, replace:true })
    }
  }


  return (
    <div className="font-poppins w-1/2 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Share your feedback</h1>
      <p className="text-base">Thanks for using our service! We'd love to hear your thoughts—just a quick message to let us know how we can improve and do better next time.</p>

      <p className="text-base">Your feedback really helps us grow and serve you better. Feel free to share anything you liked or think we could do differently—we&apos;re always listening!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content"></label>
          <textarea className="textarea resize-none w-full" placeholder="Your message" id="content" name="content" rows={8}></textarea>
        </div>
        <button className="btn btn-primary mt-5" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TestimonialForm;