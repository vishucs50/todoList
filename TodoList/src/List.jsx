  import { ListItem } from "./ListItem";
  import useTodoStore from "./store/taskstore";
  import api from "./api";
  import { useEffect,useState} from "react";
  import { useAuth } from "../context/authContext";
  import {toast} from "react-toastify"
  export function List() {
    const {user}=useAuth();
    const[text,setText]=useState("");
    const todos = useTodoStore((state) => state.todos);
    const settodo = useTodoStore((state) => state.settodo);
    const addTodo=useTodoStore((state)=>state.addTodo);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!text.trim()) return;
        await addTodo(text, user.uid);
        toast.success("Todo added Successfully!")
        setText("");
    }
    useEffect(() => {
      if (!user) return; // don’t run until user is set

      const fetchTodos = async () => {
        try {
          const res = await api.get(`/task/gettask/${user.uid}`);
          console.log(res)
          settodo(res.data);
        } catch (err) {
          console.error("Failed to fetch todos", err);
        }
      };

      fetchTodos();
    }, [user]);
      return (
      <div className="h-full w-full  bg-blue-200 flex items-center justify-center dark:bg-slate-900">
        <div className="md:h-150 md:w-150 mt-5 bg-blue-300 dark:bg-slate-800 rounded-2xl p-6">
          <form onSubmit={handleSubmit}>
            <div className="relative w-full h-10">
              <input
                type="text"
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-full rounded-full bg-amber-100 dark:bg-slate-600 px-4 pr-20 focus:outline-none dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-300 h-8 px-4 rounded-full hover:bg-pink-500"
              >
                Add
              </button>
            </div>
          </form>
          <div className="mt-5 w-full h-[90%] bg-amber-100 dark:bg-slate-700  rounded-2xl p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300">
            {todos.length === 0 ? (
              <p className="text-gray-500">No tasks yet</p>
            ) : (
              todos.map((todo) => <ListItem key={todo._id} todo={todo} />)
            )}
          </div>
        </div>
      </div>
    );
  }
