"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login(){
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const[step,setStep] = useState<1 | 2>(1);
  const[loading,setLoading] = useState(false)

  const handleSendOtp = async ()=>{
    setLoading(true);
    const res = await fetch("/api/auth/send-otp",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email})
    });

    if(res.ok){
      setStep(2);
    }
    else{
      alert("Failed to sent otp")
    }
    setLoading(false);
  }

  const handleVerifyOtp = async (e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true)

    const res = await fetch("/api/auth/verify-otp",{
      method :"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,otp}),
    });

    if(res.ok){
      alert("Login successful");
    }
    else{
      alert("Unseccesful");
    }
    setLoading(false);
  };

 
  return (
    <div className="flex items-center justify-center">
    <form className="flex flex-col">
      <label>
        <span>Email</span>
        <input
         className="border-solid border-2"
        type = "email"
        onChange={(e)=>setEmail(e.target.value)}
        required
       
        
        />
      </label>
      <label>
        <span>OTP</span>
        <input
        className="border-2"
        onChange={(e)=>setOtp(e.target.value)}
        required
        />

      </label>
       <Button>
          Send OTP
        </Button>
      <Button type="submit">
        Log in
      </Button>
     
    </form>
  </div>
  );
}