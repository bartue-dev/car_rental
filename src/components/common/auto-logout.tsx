import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/feature/hooks";
import { userState } from "@/feature/user/user-slice";
import useLogout from "@/hooks/common/use-logout";

const EVENTS = [
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
  "keydown",
] as const;

export default function AutoLogout() {
  const logout = useLogout();
  const navigate = useNavigate();
  const user = useAppSelector(userState);
  const timerRef = useRef<number | null>(null);

  
  useEffect(() => {
    // 15 minutes.
    const INACTIVITY_MS = 15 * 60 * 1000;

    // helper: clear running timer
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    // callback when inactivity timeout expires
    const onTimeout = async () => {
      // remove listeners first
      removeListeners();
      clearTimer();
      try {
        await logout();
      } finally {
        navigate("/login");
      }
    };

    // start or restart timer
    const startTimer = () => {
      clearTimer();
      // window.setTimeout returns a number in browsers
      timerRef.current = window.setTimeout(onTimeout, INACTIVITY_MS);
    };

    // event handler that resets timer
    const handleUserActivity = () => {
      startTimer();
    };

    const addListeners = () => {
      EVENTS.forEach((ev) => window.addEventListener(ev, handleUserActivity));
    };

    const removeListeners = () => {
      EVENTS.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
    };

    if (user?.username) {
      // user is present -> add listeners AND start the timer immediately
      addListeners();
      startTimer();
    } else {
      // not logged in -> ensure everything cleaned up
      removeListeners();
      clearTimer();
    }

    return () => {
      // cleanup on unmount or dependency change
      removeListeners();
      clearTimer();
    };

  }, [user?.username, logout, navigate]);

  return null;
}
