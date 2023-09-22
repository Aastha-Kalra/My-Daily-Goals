import React, { useCallback, useEffect, useRef, useState } from "react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharcters] = useState(false);
  // for optimization
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "@!#$%^&*()_+{}~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters]);
  // for re-render
  //   useEffect(() => {
  //     PasswordGenerator();
  //   }, [length, numbers, characters, PasswordGenerator]);

  //   for copy the password
  const passwordRef = useRef();
  const copyToclipboard = useCallback(() => {
    passwordRef.current?.setSelectionRange(2, 5);
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-indigo-900 w-full h-screen  ">
      <div className=" text-orange-500 tracking-wider items-center justify-center w-full flex  text-2xl font-bold  pt-4 animate-pulse">
          Password Generator
        </div>
   
    <div className="  text-sky-500 items-center  py-8 flex justify-center xl:flex-row flex-col gap-4">
     

      <div className="max-w-xl mx-auto px-4 w-full py-16 bg-[#353574]  text-center rounded shadow-black shadow-md">
       
        <div className="flex justify-center items-center my-5">
          <input
            type="text"
            placeholder="Your Password"
            ref={passwordRef}
            value={password}
            className="w-full h-10 rounded-l focus:outline-none p-4 bg-gray-200 "
          />
          <button
            className="bg-blue-500 h-12 px-4 hover:bg-sky-600  rounded-r text-white text-center
 "
            onClick={copyToclipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-5 mt-4 items-center justify-around text-md">
          <div className="items-center">
            <input
              type="range"
              name=""
              id=""
              readOnly
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min={6}
              max={25}
            />
            <span className="ml-4">Length: {length}</span>
          </div>
          <div>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={numbers}
              onChange={() => setNumbers((prev) => !prev)}
            />
            <span className="ml-2">Numbers</span>
          </div>
          <div>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={characters}
              onChange={() => setCharcters((prev) => !prev)}
            />
            <span className="ml-2">Characters</span>
          </div>
        </div>

        <div
          className="bg-sky-500 text-white px-24 hover:bg-sky-600 py-2 my-10 mx-auto rounded cursor-pointer"
          onClick={() => PasswordGenerator()}
        >
          Get Password
        </div>
    
      </div>
      <div className="max-w-xl mx-auto px-4 w-full py-2 bg-[#353574]  text-center rounded shadow-black shadow-md">
      <div className="text-justify">
          <p className="mt-4">
            Hey! Here you can generate your password as you want. In just 4
            steps.
          </p>

          <p className="my-2">
            {" "}
            <strong className="text-orange-400  tracking-wider text-lg">
              1.Select the Length of  Password
            </strong>
            : The first step is to determine how long you want your password to
            be. You can choose any length up to a maximum of 25 characters.
          </p>

          <p>
            {" "}
            <strong className="text-orange-400  tracking-wider text-lg">
              2.Include Numbers 
            </strong>
            : In this step, you can decide whether you want to include numbers
            in your password. If you want numbers in your password, simply click
            on the "Numbers" option.
          </p>

          <p>
            {" "}
            <strong className="text-orange-400  tracking-wider text-lg">
              3.Include Special Characters
            </strong>
            : Special characters are symbols like !, @, #, $, and so on. If you
            want to include special characters in your password, click on the
            "Characters" option.
          </p>

          <p>
            {" "}
            <strong className="text-orange-400  tracking-wider text-lg">
              4.Generate Password
            </strong>
            : Once you've configured your password preferences by selecting the
            length, numbers, and special characters, you're ready to generate
            your password. Click the "Get Password" button, and a random
            password that meets your criteria will be generated.
          </p>

          <p>
            <strong className="text-orange-400  tracking-wider text-lg">
              5.Copy Password
            </strong>
            : After generating your password, you can easily copy it to your
            clipboard by clicking the "Copy" button. This makes it convenient to
            paste the password wherever you need it,
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Password;
