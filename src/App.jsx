import { React, useState, useEffect } from 'react'
import Navbar from './components/Navbar'

const App = () => {
  const [isShowCompleted, setIsShowCompleted] = useState(true)
  const [forminput, setforminput] = useState("")
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const handleforminputchange = (e) => {
    setforminput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (forminput.trim() === "") return
    setTodos([...todos, { text: forminput, done: false }])
    setforminput("")

  }

  const handledone = (index) => {
    const newTodos = [...todos]
    newTodos[index].done = !newTodos[index].done
    setTodos(newTodos)

  }

  const handleedit = (index) => {
    let edittodo = todos.filter((_, i) => i === index)
    setforminput(edittodo[0].text)
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

  }

  const handledelete = (index) => {
    let result = confirm(`Are you sure you want to delete the task ${todos[index].text}`)
    if (result) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }

  }

  const toggleShowCompleted = () => {
    setIsShowCompleted(!isShowCompleted)

  }

  const visibleTodos = isShowCompleted ? todos : todos.filter(todo => !todo.done)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <Navbar />
      <div className='container mx-auto px-4'>
        <div className='bg-purple-200 min-h-[70vh] max-w-screen-lg mx-auto my-5 flex flex-col px-5 py-6 font-semibold rounded items-center'>
          <h1 className='text-lg font-semibold mb-3'>Add a Todo</h1>
          <form onSubmit={handleSubmit} className='flex flex-col md:flex-row w-full max-w-screen-md gap-4 mb-4'>
            <input
              type="text"
              value={forminput}
              onChange={handleforminputchange}
              className='w-full border-purple-900 border rounded p-3 font-light'
              placeholder="Enter your task..."
            />
            <button type="submit" className='bg-purple-600 p-3 rounded text-white font-semibold'>
              Create Todo
            </button>
          </form>

          <div className="flex justify-end w-full max-w-screen-md mb-3">
            <button onClick={toggleShowCompleted} className='text-sm text-purple-800 underline'>
              {isShowCompleted ? "Hide Completed" : "Show All"}
            </button>
          </div>

          <h1 className='text-lg font-semibold my-3'>Your Todo's</h1>
          <div className="todos w-full max-w-screen-md">
            {todos.length === 0 ? (
              <div className='text-center'>No todos to display</div>
            ) : (
              visibleTodos.map((todo, index) => (
                <div key={index} className="todo flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-5 bg-white p-3 rounded shadow mb-3">
                  <div className="heading flex items-center gap-2">
                    <i
                      className={`cursor-pointer ri-${todo.done ? 'checkbox-line' : 'square-line'}`}
                      onClick={() => handledone(index)}
                    ></i>
                    <span className={todo.done ? "line-through text-gray-500" : ""}>
                      {todo.text}
                    </span>
                  </div>
                  <div className="buttons flex gap-2">
                    <button onClick={() => handleedit(index)} className='bg-purple-600 px-3 py-1 rounded text-white font-semibold'>
                      Edit
                    </button>
                    <button onClick={() => handledelete(index)} className='bg-purple-600 px-3 py-1 rounded text-white font-semibold'>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default App