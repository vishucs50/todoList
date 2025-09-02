import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
const TodoStore = (set) => ({
  todos: [],
  settodo: (todos) => set(() => ({ todos })),
  addTodo: async (text) => {
    try {
      const res = await axios.post("/task/addtask", { text });
      set((state) => ({
        todos: [res.data, ...state.todos],
      }));
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  },

  setDone: (id) =>
    set((state) => ({
      todos: state.todos.map((t) => (t._id === id ? { ...t, done: !t.done } : t)),
    })),

  setEdit: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t._id === id ? { ...t, edit: !t.edit } : t
      ),
    })),
  updatetodo: async (id, text, done) => {
    
      const res = await axios.put(`task/update/${id}`, { text, done });
      set((state) => ({
        todos: state.todos.map(
          (t) => (t._id === id ? res.data : t) 
        ),
      }));
    
  },
  deletetodo: async (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id != id),
    }));
    await axios.delete(`task/delete/${id}`);
  },
});
const useTodoStore = create(
  devtools(
    persist(TodoStore, {
      name: "todos", 
    })
  )
);
export default useTodoStore;
