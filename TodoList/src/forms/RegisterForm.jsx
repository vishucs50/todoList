import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import api from "../api";
import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
export default function RegisterForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async ({ username, email, password }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      await updateProfile(user, { username: username });
      const idToken = await user.getIdToken();
      await api.post("/user/register", {
        username,
        email,
        token: idToken,
      });
      await signOut(auth);
      navigate("/Login");
      toast.success("User Registered Successfully");
      toast.success("Login ");
    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-[350px] bg-zinc-900 text-white p-6 rounded-2xl border border-zinc-700 space-y-4 relative">
      <div className="relative flex items-center pl-8 text-2xl font-semibold text-cyan-400">
        Register
        <span className="absolute left-0 h-4 w-4 bg-cyan-400 rounded-full" />
        <span className="absolute left-0 h-4 w-4 bg-cyan-400 rounded-full animate-ping" />
      </div>

      <p className="text-sm text-white/70">
        Signup now and get full access to our app.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            {...register("username", { required: "Username is required" })}
            className="peer w-full bg-zinc-800 text-white px-3 pt-5 pb-2 rounded-md border border-zinc-600 outline-none focus:border-cyan-400"
          />
          <span className="absolute left-3 top-2 text-sm text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
            Username
          </span>
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            placeholder=" "
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            className="peer w-full bg-zinc-800 text-white px-3 pt-5 pb-2 rounded-md border border-zinc-600 outline-none focus:border-cyan-400"
          />
          <span className="absolute left-3 top-2 text-sm text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
            Email
          </span>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            placeholder=" "
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="peer w-full bg-zinc-800 text-white px-3 pt-5 pb-2 rounded-md border border-zinc-600 outline-none focus:border-cyan-400"
          />
          <span className="absolute left-3 top-2 text-sm text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
            Password
          </span>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-400 text-white py-2 rounded-md hover:bg-cyan-500 transition"
        >
          Submit
        </button>
      </form>

      <p className="text-sm text-center text-white/70">
        Already have an account?{" "}
        <a href="/Login" className="text-cyan-400 hover:underline">
          Signin
        </a>
      </p>
    </div>
  );
}
