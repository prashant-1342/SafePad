"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function Signup(){
  const router = useRouter();
  const [name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[masterpassword,setmasterpassword] = useState("");
  const[loading,setLoading] = useState(false);

  const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault()
     setLoading(true);
     try{
      const response = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name,email,masterpassword})
        
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        router.push("/dashboard");
      }
     }
     catch(error){
      console.log(error)
      alert("Something went wrong")
     }
     finally{
      setLoading(false)
     }
     


  }

  return (
    <div className="flex justify-center items-center h-screen  ">
      <form className="flex flex-col gap-4 w-[320px] border-2 border-black p-1   rounded-lg" >
        <h1>Create Account</h1>
        <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />
        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        />
        <input
        placeholder="Password"
        value={masterpassword}
        onChange={(e)=>setmasterpassword(e.target.value)}
        required
        />
        <Button 
        onClick={handleSubmit}
        disabled={loading}
        >
          Sign Up
        </Button> 
      </form>
     
    </div>

  );
}