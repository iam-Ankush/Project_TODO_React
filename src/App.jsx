
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import TodoNavbar from './components/TodoNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import SuccessMsg from './components/SuccessMsg';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users';
import AdminPanel from './components/AdminPanel';

function App() {
  const [listData , setListData]  = useState([])
  const [error , setError] = useState(null)


  const fetchTodoData = async()=>{
    try {
        const response = await fetch('https://680e0d3bc47cb8074d91ef64.mockapi.io/react/todos')
        if(!response.ok){
            throw new Error("Failed to fetch Todo data")
        }

        const data = await response.json()
        setListData(data)
    } catch (error) {
        console.log('Some error occurred')
        setError(error.message)
    }
}


  useEffect(()=>{
    fetchTodoData()
},[])

  return (
    <>
    <BrowserRouter>
    <TodoNavbar />
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/home" element={<PrivateRoute component={Home} />}></Route>
      <Route path="/todo_form" element={<TodoForm onAddTodo={fetchTodoData}/>}></Route>
      <Route path="/todo_list" element={<TodoList listData={listData}/>}></Route>
      <Route path="/register" element={<UserRegister/>}></Route>
      <Route path="/login" element={<UserLogin/>}></Route>
      <Route path="/successmsg" element={<SuccessMsg/>}></Route>
      <Route path="/userList" element={<Users/>}></Route>
      <Route path="/adminPanel" element={<AdminPanel/>}></Route>
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
