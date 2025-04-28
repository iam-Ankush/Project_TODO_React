import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessMsg from "./SuccessMsg";

const UserRegister = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    username:"",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [showSuccess , setShowSuccess] = useState(false)

  const handleChange = (e)=>{
    const {name , value} = e.target
    setRegisterData(prev => ({...prev , [name]:value}))
  }
  const submitRegister = async(e)=>{
    e.preventDefault()
    console.log('submit button clicked' , registerData)
    try {
      const response = await fetch(
        "https://680e0d3bc47cb8074d91ef64.mockapi.io/react/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Add Uer Details");
      }

      const data = await response.json();
      console.log("user data added", data , registerData);
      setRegisterData({ name: "", username:"", password: "", email: "", role: "" });
      setShowSuccess(true)

      // setTimeout(() => {
      //   setShowSuccess(false)
      // }, 2000);
    } catch (error) {
      setError(error.message);
    }

  }
  const toLogin = () => {
    navigate("/login"); 
  };
  return (
    <>
    {showSuccess && (
      <SuccessMsg message='User Registered Successfully' onClose={()=> setShowSuccess(false)} />
    )}
      <div className="bg-[#222222] w-full min-h-screen flex justify-center items-center">
        <div className="bg-[#000000] border border-[#169976] p-4   rounded-xl w-[30%] h-[60%] flex  flex-col  items-center text-center">
          <div className="text-[#169976] border-[#169976]  text-2xl font-semibold mb-4 self-center mt-5">
            Register Yourself
          </div>

          <form
            action=""
            className="text-[#169976] w-full mt-5 flex flex-col items-center " onSubmit={submitRegister}
          >
            <div className="flex flex-col gap-3 w-full self-start px-4 py-4 ">
              <label className="flex self-start mx-2 text-semibold" htmlFor="">
                Name
              </label>
              <input
                className="w-[80%] bg-[#169976] rounded-[5px] text-black p-1 "
                name="name"
                value={registerData.name}
                onChange={handleChange}
                type="text"
              />

<label className="flex self-start mx-2 text-semibold" htmlFor="">
                UserName
              </label>
              <input
                className="w-[80%] bg-[#169976] rounded-[5px] text-black p-1 "
                name="username"
                value={registerData.username}
                onChange={handleChange}
                type="text"
              />

              <label className="flex self-start mx-2 text-semibold" htmlFor="">
                Email
              </label>
              <input
                type="text"
                className="w-[80%] bg-[#169976] text-black rounded-[5px] p-1"
                name="email"
                value={registerData.email}
                onChange={handleChange}
              ></input>

              <label className="flex self-start mx-2 text-semibold" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="w-[80%] bg-[#169976] text-black rounded-[5px] p-1"
                name="password"
                value={registerData.password}
                onChange={handleChange}
              ></input>

              <label className="flex self-start mx-2 text-semibold" htmlFor="">
                Roles
              </label>
              <select
                className="w-[80%] bg-[#169976] text-black rounded-[5px] p-1"
                name="role"
                value={registerData.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mt-5">
              <p className="text-[#169976] font-semibold">
                Already have an acoount ? Click{" "}
                <span
                  onClick={toLogin}
                  className="border-b-4 border-b-[#169976] cursor-pointer"
                >
                  here
                </span>{" "}
                to login
              </p>
            </div>

            <div className="w-full mt-4 ">
              <button
                type="submit"
                className="w-[48%] font-semibold  p-2 bg-transparent tracking-wider border border-[#169976] text-[#169976] text-semibold rounded-xl cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
