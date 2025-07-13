import React, {useRef, useState} from 'react';
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const panelRef = useRef(null); 
  const PanelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  const [vehicleFound, setVehicleFound] = useState(false);
  const [waititngForDriver, setwaititngForDriver] = useState(false);
 


  const submitHandler = (e) =>{
    e.preventDefault();
  } 

  useGSAP(() => {
  if (panelOpen) {
    gsap.to(panelRef.current, {
      height: '70%',
      padding: '24',
      // opacity: 1
    });
    gsap.to(PanelCloseRef.current, {
      opacity: 1,
  })}
   else {
    gsap.to(panelRef.current, {
      height: '0%',
      padding: '0',
      // opacity: 0
    })
    gsap.to(PanelCloseRef.current, {
      opacity: 0,
  })
  }
},[panelOpen]);

useGSAP(() => {
  if (vehiclePanel) {
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
}, [vehiclePanel]);

useGSAP(() => {
  if (confirmRidePanel) {
    gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(0)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
}, [confirmRidePanel]);

useGSAP(() => {
  if (vehicleFound) {
    gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(0)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
}, [vehicleFound]);

useGSAP(() => {
  if (waitingForDriver) {
    gsap.to(waitingForDriver.current, {
      transform: 'translateY(0)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(waitingForDriver.current, {
      transform: 'translateY(100%)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
}, [waitingForDriver]);


  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute left-5 top-5'
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        alt=''
      />

      <div  className='h-screen w-screen'>
        {/* img for temporary use */}
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
          alt=''
        />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={PanelCloseRef} onClick={()=> {
            setPanelOpen(false);
          }} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
            }}>
              <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type='text'
              placeholder='Enter your destination'
            />
            
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
            <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
            <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10  bottom-0 bg-white px-3 py-6 pt-12'>
            <WaitingForDriver waitingForDriver={waititngForDriver} />
      </div>

    </div>
  );
};

export default Home;
