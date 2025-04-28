import React, { useState } from 'react'
import SuccessMsg from './SuccessMsg'

const TodoForm = ({onAddTodo}) => {

  const [todoFormData , setTodoFormData]= useState({
    title : '',
    description : ''
  })
  const [error , setError] = useState({})
  const [ showSuccess , setShowSuccess] = useState(false)
  const [isBlur , setIsBlur] = useState(false)

  const handleChange = (e)=>{
    console.log('onchange working')
    const {name , value} = e.target;
    setTodoFormData(prev => ({...prev , [name]:value}))
  }

  const  handleSubmit = async(e) =>{
    e.preventDefault()
    console.log('submit button clicked' , todoFormData)
    try {
      const response = await fetch('https://680e0d3bc47cb8074d91ef64.mockapi.io/react/todos',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoFormData)
      })

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const data = await response.json()
      console.log('todo added' , data)
      setTodoFormData({ title: '', description: '' }); // clear form
      
      onAddTodo();  // call parent's fetchTodos again to refresh list

      
      // Show success message
      setShowSuccess(true);


      // Automatically hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Post error:', error.message);
    }
  }
  return (
    
    <>
    {showSuccess && (
      <SuccessMsg message="To-do is added" onClose={()=> setShowSuccess(false)} />
    )}
    <div className='bg-[#222222] w-full min-h-screen flex justify-center items-center overflow-hidden p-0 m-0 '>
      <div className='bg-[#000000] border border-[#169976] p-4   rounded-xl w-[30%]  flex  flex-col  items-center text-center' >
        <div className='text-[#169976] border-[#169976]  text-2xl font-semibold mb-4  mt-5'>Create Your ToDo</div>

        <form action="" onSubmit={handleSubmit} className='text-[#169976] w-full mt-5 flex flex-col items-center ' >
         <div className='flex flex-col gap-3 w-full self-start px-4 py-4 '>
         <label className='flex self-start mx-2 font-semibold'  htmlFor="">Title</label>
          <input className='w-[80%] bg-[#169976] rounded-[5px] text-black p-1 ' name="title" value={todoFormData.title} onChange={handleChange} type="text" />

          <label className='flex self-start mx-2 font-semibold' htmlFor="">Description</label>
          <textarea className='w-[80%] bg-[#169976] text-black rounded-[5px] p-1'  name="description" value={todoFormData.description} onChange={handleChange}></textarea>
         </div>

          <div className='w-[30%] h-[50%] bg-[#169976] text-black flex justify-center items-center text-center mt-5 rounded-[5px] cursor-pointer '>
          <button type='submit' className='text-bold p-2 cursor-pointer' >Add</button>
        </div>
        </form>

        
      </div>
    </div>
    </>
  )
}

export default TodoForm
