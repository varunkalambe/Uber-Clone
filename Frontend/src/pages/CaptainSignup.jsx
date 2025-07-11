import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      console.log(userData);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  return (
     <div className='px-5 py-5 h-screen flex flex-col justify-between'>
            <div>
             <img className="w-16 mb-10" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
     
     
           <form onSubmit={(e) => {
             submitHandler(e)
             }} >
     
               <h3 className='text-lg font-medium mb-2'>What's our Captain's name?</h3>
               <div className='flex gap-4 mb-5'>
                 <input 
               required 
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
               type="text" 
               placeholder='First Name'
               />
     
               <input 
               required 
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
               className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
               type="text" 
               placeholder='Last Name'
               />
               </div>
     
               <h3 className='text-lg font-medium mb-2'>What's our Captain's Email?</h3>
               <input 
               required 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
               type="email" 
               placeholder='email@example.com'
               />
     
               <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
     
               <input 
               required 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
               type="password" 
               placeholder='password'
               />
     
               <button
               className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'
               >Login</button>
     
           </form>
     
            <p className='text-center inline ml-12'>Already have a account?</p> <Link to='/captain-login' className='text-blue-600' >Login here</Link>
     
            </div>
            <div>
             <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
            </div>
         </div>
  )
}

export default CaptainSignup
