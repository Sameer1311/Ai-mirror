"use client"; 
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../utils/animation";
import { Button } from "@/components/ui/button";

const TransitionLink = ({ href, label }) => {
  const router = useRouter(); 
  const pathname = usePathname();

  const handleClick = () => {
    if (!href || typeof href !== "string") {
      console.error("🚨 Error: Invalid href in TransitionLink:", href);
      return;
    }

    if (pathname !== href) {
      animatePageOut(href, router);  // Ensure href is correctly passed
    }
  };

  return <Button onClick={handleClick}>{label}</Button>;
};

export default TransitionLink;
