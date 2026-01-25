import Navbar from "@/app/components/Navbar";
export default function Extension(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-6">
      <Navbar/>
      <div className="flex-1 my-20 flex items-center justify-center">
        <h1 className="text-2xl font-bold italic text-white">Coming Soon</h1>
      </div>
    </div>
  );
}