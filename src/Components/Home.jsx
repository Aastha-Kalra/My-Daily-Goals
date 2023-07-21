import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";

// to get data from local storage on refresh
const getData = () => {
  const taskList = localStorage.getItem("task");
  if (taskList) {
    return JSON.parse(localStorage.getItem("task"));
  } else {
    return [];
  }
};
function Home() {
  const [task, setTask] = useState(getData([]));
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if(title.trim()!==''){
      const todo = {
        title:title,
        description:description,
        createdAt : new Date().toLocaleDateString()
      }
      setTask([...task,todo]);
    setTitle("");
    setDescription("");
    }
    
  };

  const deleteFunc = (ind) => {
    setTask((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(ind, 1);
      return updatedTodos;
    });
  };

  // edit form
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const editFunc = (elem, index) => {
    setEdit(true);
    setId(index);
    console.log(index);
    setTitle(elem.title);
    setDescription(elem.description);

  };

  const editSubmit = (e) => {
    e.preventDefault();
    let items = [...task];
    let item = items[id];
    console.log(item);
    item.title = title;
    item.description = description;
    setTask(items);
    setDescription("");
    setTitle("");
    setEdit(false);
  };
  // to save data on local storage and update task state on web page
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  return (
    <>
      {/* main form */}
      {edit === false && (
        <div className="flex justify-center flex-col items-center py-2 bg-green-700">
          <form
            className="flex flex-col text-xl  justify-center px-6 w-full"
            onSubmit={submit}
          >
            <input
              type="text"
              value={title}
              // for capitalize first letter
              // onChange={(e) => setTitle(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border-4 bg-green-50 h-10 text-blue-600 border-lime-300 w-full  focus:outline-none"
            />{" "}
            <br />
            <textarea
              className="border-4 text-blue-600 border-lime-300 w-full bg-green-50 focus:outline-none"
              name="text"
              id=""
              cols="10"
              rows="5"
              value={description}
              // for capitalize first letter
              // onChange={(e) => setDescription(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description...."
            ></textarea>
            <br />
            <button
              className="bg-green-600 border-lime-300 border-4 text-yellow-400 p-3 focus:outline-none text-2xl focus:bg-yellow-400 focus:text-green-500 "
              value="submit"
            >
              ADD
            </button>
            <br />
          </form>
      
        </div>
      )}

      {/* edit form  */}
      {edit === true && (
        <div className="flex justify-center flex-col items-center py-2 bg-green-700">
          <form
            className="flex flex-col text-xl  justify-center px-6 w-full"
            onSubmit={editSubmit}
          >
            <input
              type="text"
              value={title}
              // for capitalize the first letter
              // onChange={(e) => setTitle(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border-4 bg-green-50 h-10 text-blue-600 border-lime-300 w-full  focus:outline-none"
            />{" "}
            <br />
            <textarea
              className="border-4 text-blue-600 border-lime-300 w-full bg-green-50 focus:outline-none"
              name="text"
              id=""
              cols="10"
              rows="5"
              value={description}
              // for capitalize the first letter
              // onChange={(e) => setDescription(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description...."
            ></textarea>
            <br />
            <button
              className="bg-yellow-400 border-lime-300 border-4 text-green-700 p-3 focus:outline-none text-2xl focus:bg-green-500 focus:text-yellow-400 "
              value="submit"
            >
              UPDATE
            </button>
            <br />
          </form>
          <br />
        </div>
      )}

      <div className="w-full px-4">
        {task.map((item, index) => {
          // console.log(item.id)
          return (
            <Task
              key={item.id}
              deleteFunc={deleteFunc}
              title={item.title}
              description={item.description}
              del={item.id}
              editFunc={editFunc}
              index={index}
              item={item}
              edit={edit}
              createdAt={item.createdAt}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
