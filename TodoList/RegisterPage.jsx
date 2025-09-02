import Navbar from "./src/Navbar";
import RegisterForm from "./src/forms/RegisterForm";
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-blue-400">
      {/* Transparent Navbar */}
      <Navbar/>

      {/* Register Section */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-24 px-4 md:px-16 gap-10 min-h-screen">
        {/* Left SVG/Image */}
        {/* <div className="w-full md:w-1/2 flex justify-center">

        </div> */}

        {/* Right Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
}
