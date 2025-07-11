import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setcaptainData] = useState('');
  
    const submitHandler = (e) => {
      e.preventDefault();
      setcaptainData({
        email: email,
        password: password
      })
      console.log(captainData);
      setEmail('');
      setPassword('');
    }
  return (
    <div className='pt-4 px-7 pb-7 h-screen flex flex-col justify-between'>
       <div>
        <img className="w-18 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />


      <form onSubmit={(e) => {
        submitHandler(e)
        }} >
          <h3 className='text-lg font-medium mb-2 '>What's your email</h3>
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
          >Login</button>

      </form>

       <p className='text-center inline ml-12'>Join a fleet?</p> <Link to='/captain-signup' className='text-blue-600' >Register as Captain</Link>

       </div>
       <div>
        <Link to='/login'
        className='bg-[#d5622d] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
       </div>
    </div>
  )
}

export default Captainlogin
