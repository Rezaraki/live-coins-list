import { useState,useEffect, RefObject } from "react";

export const useIntersection = (intersectingRef:  RefObject<HTMLElement>) => {
 
  const [isIntersecting, setIsIntersecting] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
     
    observer.observe(intersectingRef.current as HTMLElement);
    return () => observer.disconnect();
  }, []);

    return isIntersecting;
};