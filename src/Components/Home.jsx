import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let unsubscribe = () => {};
function Home({ user }) {
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [userTodos, setUserTodos] = useState([]);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      const todo = {
        title: title,
        description: description,
        createdAt: new Date().toLocaleDateString(),
      };
      // Generate a unique ID for the new todo item
      const id = Math.random().toString(36).substring(7);
      todo.id = id; // Set the id property
      setTask([...task, todo]);
      setTitle("");
      setDescription("");

      if (user) {
        firestore
          .collection("todos")
          .doc(user.uid)
          .set({
            todos: [...userTodos, todo], // Add the new todo to the user's existing todos
          });
        toast.success(`Todo Added successfully`, {
          position: "top-left",
        });
      }
    }
  };
  // get data from firestore
  useEffect(() => {
    if (user) {
      const docRef = firestore.collection("todos").doc(user.uid);
      unsubscribe = docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          setUserTodos(docSnap.data().todos);
        }
      });
    }

    return () => {
      unsubscribe();
    };
  }, [user]);

  const deleteFunc = (delTodo) => {
    if (!user || !user.uid) {
      console.error("User not authenticated or missing UID.");
      return;
    }
    const docRef = firestore.collection("todos").doc(user.uid);
    docRef
      .get()
      .then((docSnap) => {
        if (docSnap.exists) {
          const todos = docSnap.data().todos || [];

          const result = todos.filter((todo) => todo.id !== delTodo);
          toast.error(`Todo deleted successfully`, {
            position: "top-left",
          });
          docRef
            .update({
              todos: result,
            })
            .then(() => {
              // Update the userTodos state with the new todos
              setUserTodos(result);
            })
            .catch((error) => {
              toast.error("Error updating document:", error);
            });
        } else {
          toast.error("Document does not exist.");
        }
      })
      .catch((error) => {
        toast.error("Error getting document:", error);
      });
  };

  // edit form
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const editFunc = (elem, index) => {
    setEdit(true);
    setId(index);
    setTitle(elem.title);
    setDescription(elem.description);
  };

  const editSubmit = (e) => {
    e.preventDefault();
    let items = [...userTodos];
    if (id !== null) {
      // Check if id is not null (indicating an item is being edited)
      let item = items[id];
      item.title = title;
      item.description = description;

      // Update the userTodos state with the modified list
      setUserTodos(items);

       // Update the edited todo in Firebase
    if (user) {
      const docRef = firestore.collection("todos").doc(user.uid);
      docRef.update({
        todos: items, // Update the todos array in Firestore with the modified list
      }).then(() => {
        toast.success(`Todo updated successfully`, {
          position: "top-left",
        });
      }).catch((error) => {
        toast.error("Error updating document:", error);
      });
    }


      // Clear the form and exit editing mode
      setDescription("");
      setTitle("");
      setEdit(false);
    }
  };

  return (
    <>
      {/* main form */}

      {user ? (
        <>
          {edit === false && (
            <div className="flex justify-center flex-col items-center py-14 bg-green-700">
              <form
                className="flex flex-col text-xl  justify-center px-6 w-full"
                onSubmit={submit}
              >
                <input
                  name="text"
                  autoComplete="off"
                  className="border-4 text-blue-600 border-lime-300 w-full bg-green-100 focus:outline-none px-2 py-2  shadow-md shadow-black"
                  value={title}
                  // for capitalize first letter
                  // onChange={(e) => setTitle(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title...."
                />

                <br />
                <textarea
                    autoComplete="off"
                  className="border-4 text-blue-600 border-lime-300 w-full bg-green-100 focus:outline-none px-2 py-2 shadow-md shadow-black"
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
                  className="bg-green-600 border-lime-300 border-4 text-yellow-400 p-3 focus:outline-none text-2xl hover:bg-yellow-400 hover:text-green-500 shadow-md shadow-black  add "
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
                  autoComplete="off"
                  value={title}
                  // for capitalize the first letter
                  // onChange={(e) => setTitle(e.target.value[0].toUpperCase()+e.target.value.slice(1))}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border-4 bg-green-50 h-10 text-blue-600 border-lime-300 w-full  focus:outline-none"
                />{" "}
                <br />
                <textarea
                    autoComplete="off"
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

          <div className="w-full px-4 py-8">
            {userTodos.map((item, index) => {
              return (
                <div key={item.id}>
                  <Task
                    key={item.id}
                    deleteFunc={() => deleteFunc(item.id)}
                    title={item.title}
                    description={item.description}
                    del={item.id}
                    editFunc={editFunc}
                    index={index}
                    item={item}
                    edit={edit}
                    createdAt={item.createdAt}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div>{navigate("/login")}</div>
        </>
      )}
    </>
  );
}

export default Home;
