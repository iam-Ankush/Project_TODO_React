import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const TodoList = ({listData}) => {
   
const [laoding  , setLoading] = useState(true)

useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 2000);
},[])

  return (
    <div className='bg-[#222222] w-full min-h-screen '>
      <div className='w-full text-[#169976] text-2xl font-semibold mb-4 self-center flex justify-center items-center'>
        <p className="bg-[#111111] border border-[#169976] mt-10 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition duration-300">List of Your Custom To-Do</p>
      </div>
      {laoding ? (
        <Loader laoding={laoding}></Loader>
      ) : (
        <div className=' w-full flex flex-wrap '>
      <ul className="w-full  flex flex-wrap  gap-2 justify-center px-4">
  {listData.map((data , index) => (
    <li 
      key={index} 
      className="bg-[#111111] border border-[#169976] rounded-xl  p-6 w-[250px] h-[200px] flex flex-col justify-center items-center p-2  shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
    >
      <h2 className="text-2xl font-bold text-[#169976] mb-2">{data.title}</h2>
      <p className="text-gray-300">{data.description}</p>
     <div className='w-full  flex justify-between gap-2 mt-10'> 
        <button className='w-[48%]  p-2 bg-[#111111] border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer'>Done</button>
        <button className='w-[48%]  p-2 bg-[#111111] border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer'>Edit</button>
     </div>
    </li>
  ))}
</ul>

      </div>
      )}
      
    </div>
  )
}

export default TodoList
