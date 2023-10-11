import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(username, password);
      toast.info(`Login successfully`, {
        position: "top-left",
      });
      navigate("/home");
    } catch (error) {
      toast.error(` ${error.message}`, {
        position: "top-left",
      });
    }
  };

  return (
    <div className="w-full  flex justify-center items-center flex-col bg-green-100 h-screen sm:h-full p-[30px] sm:p-[97px]">
      <h1 className=" text-2xl sm:text-4xl animate-bounce">Please Login!!</h1>
      <form
        className="w-full h-full px-6 xl:px-80 py-14"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-10">
          <input
            autoComplete="off"
            value={username}
            type="email"
            placeholder="Your Email"
            className="w-full h-10 p-2 focus:outline-none bg-transparent border-b-4 text-2xl border-green-900 text-yellow-400"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            autoComplete="off"
            value={password}
            type="password"
            placeholder="Your Password"
            className="w-full h-10 p-2 focus:outline-none bg-transparent border-b-4 text-2xl border-green-900 text-yellow-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center py-14">
          <button
            type="submit"
            className="bg-green-800 px-10 py-2 text-yellow-500 text-2xl login"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
