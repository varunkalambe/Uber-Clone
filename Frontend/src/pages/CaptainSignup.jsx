import React, {useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const {captain, setCaptain} = useContext(CaptainDataContext);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const captainData = {
        fullname:{
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: parseInt(vehicleCapacity),
          vehicleType: vehicleType
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }

      console.log(captainData);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setVehicleColor('');
      setVehiclePlate('');
      setVehicleCapacity('');
      setVehicleType('');
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

              <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
              <div className='flex gap-4 mb-3'>
              <input 
                required 
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
                type="text" 
                placeholder='Vehicle Color'
              />

              <input 
                required 
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
                type="text" 
                placeholder='Vehicle Plate Number'
              />
              </div>
             <div className='flex gap-4 mb-3'>
              <input 
                required 
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
                type="number" 
                placeholder='Vehicle Capacity'
              />

              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base'
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Motorcycle</option>
              </select>
              </div>
     
               <button
               className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'
               >Create Captain Account</button>
     
           </form>
     
            <p className='text-center inline ml-12 '>Already have a account?</p> <Link to='/captain-login' className='text-blue-600' >Login here</Link>
     
            </div>
            <div>
             <p className='text-[10px] leading-tight mt-6 mb-2'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
            </div>
         </div>
  )
}

export default CaptainSignup
