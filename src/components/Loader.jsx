import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = ({loading}) => {
  return (
    <div className='flex justify-center items-center text-center min-h-screen'>
      <ClipLoader  color="#169976" loading={loading} size={50}></ClipLoader>
    </div>
  )
}

export default Loader
