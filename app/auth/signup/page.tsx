"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function Signup(){
  const [name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[masterpassword,setmasterpassword] = useState("");
  const[loading,setLoading] = useState(false);

  const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault()
     setLoading(true);
     try{
      const response = await fetch("api/auth/signup",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name,email,masterpassword})
        
      })
      const data = await response.json()
      console.log(data)
     }
     catch(error){
      console.log(error)
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
        />
        <input
        placeholder="Email"
        />
        <input
        placeholder="Password"
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