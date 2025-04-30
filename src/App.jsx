
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
import UnAuthorized from './components/UnAuthorized';

function App() {
  const [listData , setListData]  = useState([])
  const [error , setError] = useState(null)
  const [successMsg , setSuccessMsg] = useState(null)


  const fetchTodoData = async()=>{
    try {
        const response = await fetch('https://680e0d3bc47cb8074d91ef64.mockapi.io/react/todos')
        if(!response.ok){
            throw new Error("Failed to fetch Todo data")
        }

        const data = await response.json()
        console.log(data , 'todo data')
        setListData(data)
    } catch (error) {
        console.log('Some error occurred')
        setError(error.message)
    }
}


  useEffect(()=>{
    fetchTodoData()
    if(successMsg){
      const timer = setTimeout(() => {
        setSuccessMsg(null)
      }, 2000);
      return () => clearTimeout(timer); // cleanup
    }
},[successMsg])


const removeTodo = async(id)=>{
  try {
    const response = await fetch(`https://680e0d3bc47cb8074d91ef64.mockapi.io/react/todos/${id}`,{
      method:'DELETE'
    })
    console.log(response, 'RESPONSE')
    if(!response.ok){
      throw new Error("Failed to delete Todo")

    }
    setSuccessMsg("Todo deleted successfully!")
    fetchTodoData()
  } catch (error) {
    console.log('Error deleting todo' ,error)
    setError(error.message)
  }
}


const updateTodo = async(id, updateData)=>{
try {
  const response = await fetch(`https://680e0d3bc47cb8074d91ef64.mockapi.io/react/todos/${id}`,{
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(updateData)
  })
  if(!response.ok){
    throw new Error("Failed to Update Todo")

  }

  setSuccessMsg("Todo Updated Succesfully")
  fetchTodoData()
} catch (error) {
  console.error('Error updating todo:', error);
    setError(error.message);
}
}

  return (
    <>
    <BrowserRouter>
    <TodoNavbar />
    {successMsg && (
      <SuccessMsg message={successMsg} onClose={()=> setSuccessMsg(null)} />
    )}
    <Routes>
    <Route path="/" element={<Home />}></Route>
    
      <Route path="/register" element={<UserRegister/>}></Route>
      <Route path="/login" element={<UserLogin/>}></Route>
      <Route path="/successmsg" element={<SuccessMsg/>}></Route>
      <Route path="/unauthorized" element={<UnAuthorized/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
     

      {/* Private Route  for ADMIN*/}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
      <Route path="/adminPanel" element={<AdminPanel/>}></Route>
      <Route path="/userList" element={<Users/>}></Route>
      </Route>

 {/* Private Route  for ADMIN & USER*/}
 <Route element={<PrivateRoute allowedRoles={['admin' , 'user']} />}>
 <Route path="/userList" element={<Users/>}></Route>
 <Route path="/todo_form" element={<TodoForm onAddTodo={fetchTodoData}/>}></Route>
 <Route path="/todo_list" element={<TodoList listData={listData} removeTodo={removeTodo} updateTodo={updateTodo}/>}></Route>
 
      </Route>
      
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
