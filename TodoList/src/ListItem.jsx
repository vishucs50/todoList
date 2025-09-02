import { useState,useEffect,useRef } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import useTodoStore from "./store/taskstore";
import { toast } from "react-toastify";


export const ListItem = ({todo}) => {
  const inputRef = useRef(null);
  const updatetodo=useTodoStore((state)=>state.updatetodo);
  const deletetodo= useTodoStore((state) => state.deletetodo );
  const setDone= useTodoStore((state) => state.setDone );
  const setEdit= useTodoStore((state) => state.setEdit );
  const handleDelete = async () => {
    try {
      toast.success("Todo deleted successfully");
      await deletetodo(todo._id);
    } catch (err) {
      toast.error("Error deleting todo", err);
    }
  };
  // const [del, toDel] = useState(false); 
  const [text, setText] = useState(todo.text);
  useEffect(() => {
    setText(todo.text);
  }, [todo.text]);
  const handleDone = () => {
    setDone(todo._id); 
  };
  useEffect(() => {
    if (todo.edit && inputRef.current) {
      inputRef.current.focus(); // cursor blinks automatically
    }
  }, [todo.edit]);
  const handleEdit = () => {
    setEdit(todo._id);
  }
  const handleSave=(id)=>{
    updatetodo(id,text,todo.done);
    setEdit(todo._id);
    toast.success("Update Successfully!")
  }
  return (
    <div className="flex justify-between items-center w-full h-10 bg-blue-200 dark:bg-slate-800 rounded-2xl p-2 mb-2">
      <input
        type="text"
        ref={inputRef}
        value={text}
        disabled={!todo.edit || todo.done}
        className={`w-full focus:outline-none dark:text-amber-50 ${
          todo.done ? "line-through text-gray-500" : ""
        }`}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={() => handleDone(todo._id)}
          className={`cursor-pointer p-1 rounded:2xl hover:bg-green-300 hover:rounded-2xl dark:text-gray-400 dark:hover:bg-green-600 dark:hover:text-white`}
        >
          {todo.done ? (
            <X className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
        </button>

        <button
          disabled={todo.done}
          className="cursor-pointer p-1 rounded hover:bg-blue-300 hover:rounded-2xl dark:text-gray-400 dark:hover:text-white"
          onClick={() => {
            if (todo.edit) {
              handleSave(todo._id); // save changes
            } else {
              handleEdit(todo._id); // enable edit mode
            }
          }}
        >
          {!todo.edit ? (
            <Pencil className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
        </button>

        <button
          className="cursor-pointer p-1 rounded hover:bg-red-300 hover:rounded-2xl dark:text-gray-400 dark:hover:bg-red-600 dark:hover:text-white"
          onClick={handleDelete}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
