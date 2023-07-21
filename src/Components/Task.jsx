import React from "react";
import "../index.css";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

function Task({ title, description, editFunc, edit, index, deleteFunc, item, createdAt}) {
  return (
    <>
    <br />
      <div className=" flex items-center border-4 bg-slate-50 pl-2  border-lime-300  w-full ">
    
        <div className="w-full  text-xl text-green-600 font-bold">
          <span className="text-sm text-blue-400">Created At: 
          &nbsp;<span>{createdAt}</span></span>
          <div className="ml-1 overflow-hidden">
            {title}
           
          </div>


          <div className="text-lg overflow-hidden font-light ml-1 text-yellow-600">
            {description}
            {/* <span>{createdAt}</span> */}
          </div>
        </div>
        {edit === false && (
          <>
            <div className="">
              <button
                className="text-4xl px-2 py-2 text-green-500 focus:outline-none"
                onClick={() => editFunc(item, index)}
              >
                <BsFillPencilFill size={20} />
              </button>
            </div>
            <div className="text-green-400">
              {" "}
              <button
                className="text-4xl pr-2 text-red-500 py-2 focus:outline-none"
                onClick={() => deleteFunc(index)}
              >
                <AiFillDelete size={22} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Task;
