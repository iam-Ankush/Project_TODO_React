import React from 'react'

const generateToken = (user) => {
    const secretKey = 'QWERTYYTREWQ'
    const payload = {
        username:user.username,
        role : user.role
    }

    const tokenData = `mockToken_${user.id}_${user.role}_${user.username}_${secretKey}`
    return tokenData

}

export default generateToken
