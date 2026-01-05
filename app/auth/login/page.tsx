"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login(){
  const router = useRouter()
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const[step,setStep] = useState<1 | 2 | 3>(1);
  const[loading,setLoading] = useState(false)
  const[masterpassword,setmasterpassword] = useState("")

  const handleSendOtp = async ()=>{
    setLoading(true);
    const res = await fetch("/api/auth/send-otp",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email})
    });
    
    if(res.status == 404){
      alert("User does not exist")
      setLoading(false);
      return;
    }

    if(res.ok){
      setStep(2);
    }

    else{
      alert("Failed to sent otp")
    }
    setLoading(false);
  }

  const handleVerifyMasterPassword = async (e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/verify-masterpassword",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({email,masterpassword})  
    })

    if(res.ok){
      alert("Login Successful")
      localStorage.setItem("userEmail", email);
      sessionStorage.setItem("masterPassword", masterpassword);
      setLoading(false);
      router.push("/dashboard");
    }
    else{
      alert("Wrong MasterPassword");
      setLoading(false);
      }
  
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
      setStep(3)
     
    }
    else{
      alert("Unseccesful");
    }
    setLoading(false);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleSendOtp();
    } else if (step === 2) {
      handleVerifyOtp(e);
    } else if (step === 3) {
      handleVerifyMasterPassword(e);
    }
  };

  return (
    <div className="flex items-center justify-center">
    <form onSubmit={handleSubmit} className="flex flex-col">
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
      {step === 3 && (
        <>
          <label>
            <span>Master Password</span>
            <input
            className="border-2"
            type="text"
            onChange={(e)=>setmasterpassword(e.target.value)}
            value = {masterpassword}  
            required
            />
          </label>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </>
      )}
    </form>
  </div>
  );
}