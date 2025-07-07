import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  const navigate = useNavigate();

  //redirect from the previous page
  const goBack = () => navigate(-1)

  return (
   <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
    <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
                <span className="sr-only">{error.statusText || error.message}</span>404
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn't find this page.</p>
            <button onClick={goBack} className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200 cursor-pointer">Back to home</button>
        </div>
    </div>
</section>
  )
}

export default ErrorPage;