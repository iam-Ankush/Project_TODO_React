import React from 'react'

const SuccessMsg = ({message , onClose}) => {
    return (
        <>
       <div className= ' fixed top-0 left-0  w-full h-full bg-[#222222] flex justify-center items-start   bg-opacity-40  '>
  <div className="border border-[#169976] bg-[#169976] text-black font-semibold  rounded-md shadow-lg min-w-[500px] min-h-[50px] relative">
    <div className="relative w-full h-full">
      {/* This container keeps the X button at top-right and the message centered */}
      <p className="text-2xl text-center">{message}</p>
      <button 
        onClick={onClose} 
        className="absolute top-1 right-3 font-bold text-xl">
        ✕
      </button>
    </div>
  </div>
</div>
        </>
      );
}

export default SuccessMsg
