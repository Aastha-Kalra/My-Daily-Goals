import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../index.css";
import { auth } from "../firebase";
function Header({ user }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-green-700 p-4 flex justify-around items-center w-full header mb-1 shadow-md shadow-black sticky top-0">
        <Link to={"/"} className="text-yellow-400 sm:text-3xl">
          My Daily Goals
        </Link>
        <div className="">
          {user ? (
            <>
              <Link to={"/home"} className="text-yellow-400  sm:text-3xl mx-7">
                My Goals
              </Link>
              <Link
                to={"/home"}
                onClick={() => {
                  auth.signOut();
                  navigate('/home')
                  
                }}
                className="text-yellow-400  sm:text-3xl"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"} className="text-yellow-400  sm:text-3xl mx-10">
                Login
              </Link>
              <Link to={"/signup"} className="text-yellow-400  sm:text-3xl">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
