import React from "react";

const LandingPage = () => {
  return (
    <div className="flex  justify-center items-center flex-col py-4">
      <h1 className="text-2xl sm:text-4xl font-bold my-8 animate-bounce">
        Write your daily goals here.....
      </h1>

      <img
        src="https://www.weareteachers.com/wp-content/uploads/1-21-800x800.jpg"
        alt=""
        className="w-64 mb-4 shadow-2xl"
      />

      <h1 className="text-4xl font-bold ">SET GOALS</h1>
      <h1 className="text-4xl font-bold my-4">CRUSH THEM</h1>
      <h1 className="text-4xl font-bold">REPEAT</h1>

      <div className="flex sm:justify-end sm:items-end w-full sm:mr-24 mt-5  items-center justify-center">By Aastha Kalra</div>
    </div>
  );
};

export default LandingPage;
