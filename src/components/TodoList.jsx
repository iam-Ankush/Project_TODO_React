import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const TodoList = ({ listData , removeTodo , updateTodo }) => {
  const [laoding, setLoading] = useState(true);
  const [editingId , setEditingId] = useState(null)
  const [editedTodo , setEditedTodo] = useState({
    title:'',
    description:''
  })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const startEdit = (todo)=>{
    setEditingId(todo.id)
    setEditedTodo({title :todo.title , description :todo.description})
  }

  const handleUpdate = ()=>{
    updateTodo(editingId , editedTodo)
    setEditingId(null)
    setEditedTodo({title:'' , description:''})
  }


  return (
    <div className="bg-[#222222] w-full min-h-screen ">
      <div className="w-full text-[#169976] text-2xl font-semibold mb-4 self-center flex justify-center items-center">
        <p className="bg-[#111111] border border-[#169976] mt-10 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
          List of Your Custom To-Do
        </p>
      </div>
      {laoding ? (
        <Loader laoding={laoding}></Loader>
      ) : (
        <div className=" w-full flex flex-wrap ">
          <ul className="w-full  flex flex-wrap  gap-2 justify-center px-4">
            {listData.map((data, index) => (
              <li
                key={index}
                className="bg-[#111111] border border-[#169976] rounded-xl   w-[250px] h-[200px] flex flex-col justify-center items-center p-2  shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
              >
                {editingId === data.id ? (
                  <>
                  <input className="'w-full bg-[#169976] rounded-[5px] text-black p-1 " type="text" value={editedTodo.title} onChange={(e)=> setEditedTodo({...editedTodo , title: e.target.value})} />

                  <textarea   className="w-full bg-[#169976] rounded-[5px]  mb-2 mt-2  text-black"  name="" id="" value={editedTodo.description} onChange={(e)=> setEditedTodo({...editedTodo , description: e.target.value})}></textarea>

                  <button className="w-[48%]  mt-3 p-2 bg-[#111111] border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer
                   hover:bg-[#169976] hover:text-black" onClick={handleUpdate} >Save</button>
                  </>
                ) : (
                  <>
                  <h2 className="text-2xl font-bold text-[#169976] mb-2">
                  {data.title}
                </h2>
                <p className="text-gray-300">{data.description}</p>
                <div className="w-full  flex justify-between gap-2 mt-10">
                  <button className="w-[48%]  p-2 bg-[#111111] border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer
                   hover:bg-[#169976] hover:text-black" onClick={()=> removeTodo(data.id)}>
                    Done
                  </button>
                  <button className="w-[48%]  p-2 bg-[#111111] border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer
                   hover:bg-amber-800 hover:text-black" onClick={()=> startEdit(data)}>
                    Edit
                  </button>
                </div></>
                )}
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
