import { List } from "./List"
import Navbar from "./Navbar"

function App() {
  

  return (
    <div className="h-full w-full  bg-blue-200 flex items-center justify-center dark:bg-slate-900">
        <Navbar/>
        <List/>
    </div>
  )
}

export default App
