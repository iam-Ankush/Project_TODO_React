import React from 'react'

const UnAuthorized = () => {
  return (
    <>
    <div className='bg-[#222222] w-full min-h-screen '>
      <div className='w-full text-[#169976] text-2xl font-semibold mb-4 self-center flex justify-center items-center'>
        <div className="bg-[#111111] border border-[#169976] mt-10 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
        <p >
          You are UnAuthorized to access this PAGE
          </p>
          <p className='text-[.75rem] mt-5'>Go back to HOME</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default UnAuthorized
