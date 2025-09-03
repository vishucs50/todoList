import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import api from "../api";
import { useNavigate } from "react-router";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserContext } from "../../context/UserContext";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
const LoginForm = () => {
  const { setUserData } = useUserContext();
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
  const onSubmit = async ({ email, password }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const idToken = await user.getIdToken();
      const userid = await api.post("/user/login", {
        email,
        token: idToken,
      });
      setUserData(userid.data.user);
      toast.success(`Welcome back,${userid.data.user.username}`);
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };
  return (
    <div className="max-w-[350px] bg-zinc-900 text-white p-6 rounded-2xl border border-zinc-700 space-y-4 relative">
      <div className="relative flex items-center pl-8 text-2xl font-semibold text-cyan-400">
        Login
        <span className="absolute left-0 h-4 w-4 bg-cyan-400 rounded-full" />
        <span className="absolute left-0 h-4 w-4 bg-cyan-400 rounded-full animate-ping" />
      </div>

      <p className="text-sm text-white/70">
        Login now and get full access to our app.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            type="email"
            required
            className="peer w-full bg-zinc-800 text-white px-3 pt-5 pb-2 rounded-md border border-zinc-600 outline-none focus:border-cyan-400"
            placeholder=" "
            {...register("email", { required: "Email is required" })}
          />
          <span className="absolute left-3 top-2 text-sm text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
            Email
          </span>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="password"
            required
            autoComplete="true"
            className="peer w-full bg-zinc-800 text-white px-3 pt-5 pb-2 rounded-md border border-zinc-600 outline-none focus:border-cyan-400"
            placeholder=" "
            {...register("password", { required: "Password is required" })}
          />
          <span className="absolute left-3 top-2 text-sm text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
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
          className="w-full bg-cyan-400 text-white py-2 rounded-md hover:bg-cyan-300 transition"
        >
          Submit
        </button>
      </form>

      <p className="text-sm text-center text-white/70">
        Don't have an account?{" "}
        <a href="/register" className="text-cyan-400 hover:underline">
          SignUp
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
