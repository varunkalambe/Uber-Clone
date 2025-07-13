import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.waitingForDriver(false);

            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

            <div className='flex items-center justify-between'>
                  <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
                  <div className='text-right'>
                    <h2 className='text-lg font-medium'>Varun</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
                    <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
                  </div>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>

                <div className='w-full mt-5 flex flex-col gap-4'>

                    <div className='flex flex-row items-start gap-5 p-2 border-b-2'>
                        <i className='text-lg ml-2 ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>362/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Nagpur</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-start gap-5 p-2 border-b-2'>
                        <i className='text-lg ml-2 ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Thrid Wave Coffee</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Shop No. 12, Galleria Market,
                                DLF Phase IV, Gurugram, Haryana – 122009</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-start gap-5 p-2 '>
                        <i className='text-lg ml-2 ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default WaitingForDriver
