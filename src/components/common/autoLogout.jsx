import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AutoLogout = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const {user} = useAuth();
  
  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    let timer;
    // this function sets the timer that logs out the user after 10 secs
    const handleLogoutTimer = () => {
      timer = setTimeout(() => {  
        //removes existing listeners
        removeListener()
        // logs out user
        logoutAction();
      }, 15 * 60 * 1000); // 10000ms = 10secs. You can change the time.
    };


    // this resets the timer if it exists.
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
    };

    // Listener clean up. Removes the existing event listener from the window
    const removeListener = () => {
      events.forEach((item) => {
        window.removeEventListener(item, handleUserActivity);
      });
    }

    //reference function
    const handleUserActivity = () => {
      // clears any pending timer.
      resetTimer();
      handleLogoutTimer();
    }
    
    // logs out user by using logout custom hook and redirecting url to /login page.
    const logoutAction = async () => {
      await logout()
      navigate("/login")
    };

    //check if global state user exist then run each event listener otherwise remove it to the DOM
    if (user) {
      events.forEach((item) => {
        window.addEventListener(item, handleUserActivity);
      });
    } else {
      resetTimer();
      removeListener();
    }
    
    //removes when the component unmount
    return () => {
      resetTimer();
      removeListener();
    } 
  
}, [logout, navigate, user]);

  return <></>;
};

export default AutoLogout;