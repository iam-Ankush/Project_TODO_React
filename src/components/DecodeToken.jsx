import React from 'react'

const DecodeToken = (token) => {

     const parts = token.split('_')
     console.log(parts)
     if(parts.length >= 3){
         const role = parts[2]
         const userName = parts[3]
         return  {role , userName}
     }
   
  return null
}

export default DecodeToken
