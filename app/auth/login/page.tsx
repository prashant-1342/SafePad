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
    <form onSubmit={handleVerifyOtp} className="flex flex-col">
      {step === 1 && (
        <>
          <label>
            <span>Email</span>
            <input
             className="border-solid border-2"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
          </label>
          <Button 
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <label>
            <span>OTP</span>
            <input
            className="border-2"
            type="text"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            required
            />
          </label>
          <Button 
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Log in"}
          </Button>
        </>
      )}
    </form>
  </div>
  );
}