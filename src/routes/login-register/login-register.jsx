import React from 'react'

import './login-register.scss'
import Login from '../../components/login/login.jsx'
import Register from '../../components/register/register'

const LoginOrRegister = () => (
    <div className='login-register-page'>
        <Login />
        <Register />
    </div>
)

export default LoginOrRegister
