import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const loginData = { email, password }
    setUserData(loginData)

    console.log('🚀 Logging in with:', loginData)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData
      )

      console.log('✅ Login response:', response.data)

      if (response.status === 200) {
        const { user: loggedInUser, token } = response.data
        
        console.log('👉 Setting user:', loggedInUser)
        console.log('👉 Setting token:', token)
        
        setUser(loggedInUser)
        localStorage.setItem('token', token)
        
        console.log('✅ Login successful, navigating to home')
        navigate('/home')
      }
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data || err.message)
      alert(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setEmail('')
      setPassword('')
    }
  }
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email" 
          placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password" 
          placeholder='password'
          />

          <button
          className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          type="submit"
          >Login</button>

        </form>

        <p className='text-center inline ml-12'>New here?</p> <Link to='/signup' className='text-blue-600' >Create new Account</Link>

       </div>
       <div>
        <Link to='/captain-login'
        className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
       </div>
    </div>
  )
}

export default UserLogin