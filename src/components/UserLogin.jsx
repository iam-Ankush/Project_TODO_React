import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const UserLogin = () => {
  const navigate = useNavigate()
  const [loginData , setLoginData] = useState({
    username:'',
    password :''
  })
  const toRegister = ()=>{
    navigate('/register')
  }

  const handleChange= (e)=>{
    const {name , value} = e.target
    setLoginData(prev => ({...prev , [name]:value}))
  }

  const submitLogin = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch('https://680e0d3bc47cb8074d91ef64.mockapi.io/react/users')
      const data = await response.json()

      // find user based on username and password

      const user = data.find((user)=> user.username === loginData.username && user.password === loginData.password)
      console.log(user, 'USER')
      if(user){
        // Generate token (simple example, you would likely get this from a backend)
        // const token = `${user.id}_${user.role}`;
        // const token = jwt.sign({ role: user.role, username: user.username }, 'QWERTY', { expiresIn: '1h' });

            // Create a mock "token" (In production, it should come from the backend)
            const token = `mockToken_${user.id}_${user.role}_${user.username}`;
        console.log(token)

        // store the token in local storage
        localStorage.setItem('token', token)

       navigate('/home') 
      } else {
        alert('Invalid username or password!');
      }
     
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong, please try again.');
    }

  }
  return (
    <>
    <div className='bg-[#222222] w-full min-h-screen flex justify-center items-center'>
      <div className='bg-[#000000] border border-[#169976] p-4   rounded-xl w-[30%] h-[60%] flex  flex-col  items-center text-center' >
        <div className='text-[#169976] border-[#169976]  text-2xl font-semibold mb-4 self-center mt-4'>Login</div>

        <form action=""  className='text-[#169976] w-full mt-5 flex flex-col items-center ' onSubmit={submitLogin} >
         <div className='flex flex-col gap-3 w-full self-start px-3 py-4 '>

          <label className='flex self-start mx-2 text-semibold' htmlFor="">Username</label>
          <input type='text' className='w-[80%] bg-[#169976] text-black rounded-[5px] p-1'  name="username" value={loginData.username} onChange={handleChange} ></input>

          <label className='flex self-start mx-2 text-semibold' htmlFor="">Password</label>
          <input type='password' className='w-[80%] bg-[#169976] text-black rounded-[5px] p-1'  name="password" value={loginData.password} onChange={handleChange} ></input>
            </div>
            <div className='mt-5'>
              <p className='text-[#169976] font-semibold' >New here ? Click <span onClick={toRegister} className='border-b-4 border-b-[#169976] cursor-pointer'>here</span> to Register</p>
            </div>

          <div className='w-full mt-6 mb-4 '>
          <button type='submit' className='w-[48%] font-semibold  p-2 bg-transparent tracking-wider border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer'>Login</button>

        </div>
        </form>

        
      </div>
    </div>
    </>
  )
}

export default UserLogin
