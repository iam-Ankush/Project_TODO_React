import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const TodoNavbar = () => {
    const navigate = useNavigate()
    const token  = localStorage.getItem('token')
    let userName = null
    if(token){
        try {
            // const decoded_Token = jwtDecode(token)
            const parts = token.split('_')
            console.log(parts)
            if(parts.length === 4){
                const role = parts[1]
                userName = parts[3]
            }
            console.log(userName)
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }


    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }


    const homeRoute = ()=>{
        navigate('/home')
    }
  return (
    <nav className='bg-[#000000] w-full h-[80px] text-[#169976] flex items-center px-4  '>
        <div className='flex  items-center w-full'>
            <div className='text-2xl font-bold px-4 tracking-[.15rem] cursor-pointer' onClick={homeRoute}>APPLI~FY</div>
            <div className='flex justify-between items-center w-full'>
            <div>
            <ul className='font-semibold px-5  flex'>
            <Link to="/home" className='mx-[10px] relative group cursor-pointer'>HOME</Link>
                <Link to="/todo_form"  className='mx-[20px] relative group cursor-pointer'>FORM</Link>
                {/* <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#169976] transition-all duration-300 group-hover:w-full"></span> */}
                <Link to="/todo_list" className='mx-[10px] relative group cursor-pointer'>LIST</Link>               
                <Link to="/userList" className='mx-[10px] relative group cursor-pointer'>USERS</Link>               
                <Link to="/adminPanel" className='mx-[10px] relative group cursor-pointer'>ADMIN_PANEL</Link>               
            </ul>
            </div>

            <div>
            {token ? (
              <ul className='font-semibold px-5 flex'>
                <li className='mx-[10px]'>
                  <span>Hello, {userName}</span>
                </li>
                <li className='mx-[10px]'>
                  <button 
                    onClick={handleLogout} 
                    className='cursor-pointer font-semibold'
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            ) : (
              <ul className='font-semibold px-5 flex'>
                <Link to="/login" className='mx-[10px] relative group cursor-pointer'>LOGIN</Link>
                <Link to="/register" className='mx-[10px] relative group cursor-pointer'>SIGNUP</Link>
              </ul>
            )}
                
            </div>
            </div>
        </div>
    </nav>
  )
}

export default TodoNavbar
