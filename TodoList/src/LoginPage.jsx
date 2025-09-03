import Navbar from "./Navbar";
import LoginForm from "./forms/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-blue-400">
      {/* Transparent Navbar */}
      <Navbar />
      {/* Register Section */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-24 px-4 md:px-16 gap-10 min-h-screen">
        {/* Left SVG/Image */}
        

        {/* Right Register Form */}
        <LoginForm />
      </div>
    </div>
  );
}
