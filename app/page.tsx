import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div>
  
      <section className="hero">
        <Navbar/>   
        <div className="h-[100vh] w-full">
          <div className="text-6xl">The most Secured Password Manager</div>
          <div>Defend against hackers and data breaches with SafePad, the best password manager for securely managing sensitive information.</div>
          <Button>Get Started</Button>
          <div>
            <div>End-to-End Encrypted</div>
            <div>Zero-Knowledge</div>
            <div>Multi-Device Sync</div>
          </div>
          <img  src="/dried-flowers-vase-blue-wall.jpg"/>
        </div>
        <div className="h-[100vh]">Page2</div>




      </section>
     

    </div>
  );
}
