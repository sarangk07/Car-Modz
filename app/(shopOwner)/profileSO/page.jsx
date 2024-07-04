'use client'

import React, { useState } from 'react'
import Link from 'next/link'

function ProfileSO() {
    const [choices,setChoice] = useState('default')

    const renderContent = () => {
        switch (choices) {
          case 'default':
            return (
              <>
                <li className='ml-5 bg-orange-500 border-2 border-emerald-500  rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/85/da/dc/85dadcc622e0796df424b2e30a0159c1.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 border-2 border-emerald-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/b4/cc/91/b4cc91f12f81db4b1c89c926973bfd13.jpg" alt="" />
                </li>
                <li className='ml-5 bg-orange-500 border-2 border-emerald-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/d7/01/9f/d7019fd52927233691a615b5d1824be6.jpg" alt="" />
                </li>
              </>
            );
          case 'trending':
            return (
              <>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/88/33/67/883367f1f6814f731c9ea79efc2cc048.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/f9/14/ad/f914ad248528be2edc0d4bc6bf91aec6.jpg" alt="" />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/93/71/7d/93717d50e66a79666702bfe38f9e028c.jpg" alt="" />
                </li>
              </>
            );
          case 'alloy':
            return (
              <>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/eb/34/0f/eb340f0e495d0fa26fd8eb2940e1e9d8.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/85/da/dc/85dadcc622e0796df424b2e30a0159c1.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/19/ab/69/19ab6916c66d2e43fc774a005a59c641.jpg" alt="" />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/93/71/7d/93717d50e66a79666702bfe38f9e028c.jpg" alt="" />
                </li>
              </>
            );
          case 'turbos':
            return (
              <>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/88/33/67/883367f1f6814f731c9ea79efc2cc048.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/236x/61/3a/1a/613a1a7e8616ff52b03b0c1e7d606701.jpg" alt="" />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/564x/f9/14/ad/f914ad248528be2edc0d4bc6bf91aec6.jpg" alt="" />
                </li>
              </>
            );
          case 'bodykit':
            return (
              <>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img src="https://i.pinimg.com/564x/d7/01/9f/d7019fd52927233691a615b5d1824be6.jpg" alt="" className='rounded-full relative w-14 h-14' />
                </li>
                <li className='ml-5 bg-orange-500 rounded-full h-14 flex justify-center items-center w-14'>
                  <img className='rounded-full relative w-14 h-14' src="https://i.pinimg.com/736x/a4/b3/f3/a4b3f3f1b65154f103501fa952b5d174.jpg" alt="" />
                </li>
              </>
            );
          case 'other':
            return (
              <>
                <p>not found</p>
              </>
            );
          default:
            return null;
        }
      };







  return (
    <div className='flex flex-col w-full h-fit  text-zinc-50'>
      <div className="h-1/5  bg-cyan-100 ">
        <Link className='absolute z-30' href='/home'  >
            back
        </Link>
        <img src="https://i.pinimg.com/originals/00/7f/1a/007f1afdd99b82455a73386586d5a133.jpg" alt="" className="w-screen h-[50vh] object-cover"/>

      </div>


      <div className="bodycontentDiv h-4/5 bg-zinc-800 flex flex-col">

        <div className=" border-b-4 border-b-emerald-400 border-t-4 border-t-emerald-300 bg-zinc-700 flex justify-between items-center rounded-tl-3xl rounded-br-3xl pl-5  pr-5 m-3 h-1/5">
            
            <div className='flex'>
                <div>
                    <img src="https://wolfmoto.in/wp-content/themes/wolf-motors/images/logo.png" alt="" className='w-28 h-28 rounded-3xl' />
                </div>
                <div className='pl-5'>
                    <ul className='list-none text-sm '>
                        <li className='text-lg font-mono'>Wolves Moto</li>
                        <li>Performance Tuning</li>
                    </ul>
                </div>
            </div>

            <div className='flex flex-col text-sm justify-end'>
                <button className="bg-zinc-600 text-gray-50 font-bold py-2 px-4 rounded-lg border-2 border-zinc-500 hover:bg-emerald-400 active:border-b-0 active:border-t-4">Follow</button>
                <p className='mb-3'>report</p>
                <p className='mb-3'>contact info</p>
                <p className='mb-3'>Rate</p>
            </div>

        </div>


        <div className=' bg-zinc-700  m-3 rounded-t-3xl  h-4/5'>
            <div className='bg-zinc-600 rounded-3xl p-5'>
                <div className='flex flex-col mb-3 text-xs md:text-sm'>
                  <div>
                  <h2>Stocks in Shop</h2>
                  </div>
                  <div className='flex'>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('default')}>New items</h1>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('trending')}>Trending</h1>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('alloy')}>Alloy</h1>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('turbos')}>Turbos</h1>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('bodykit')}>Body kit</h1>
                    <h1 className='mr-5 cursor-pointer' onClick={()=>setChoice('other')}>Other</h1>
                  </div>
                </div>
                
                <div className='list-none flex'>
                {renderContent()}   
                </div>
            </div>
            <div className='flex pb-5 pt-5 justify-around bg-zinc-700 border-b-4 border-zinc-900 rounded-b-3xl'>
                <button className='underline underline-offset-8 hover:animate-pulse focus:text-emerald-300'>Builds</button>
                <button className='underline underline-offset-8 hover:animate-pulse focus:text-emerald-300'>Latest</button>
                <button className='underline underline-offset-8 hover:animate-pulse focus:text-emerald-300'>Popular</button>
            </div>
            <div className='h-fit'>
                <div className=' border-b-4 border-zinc-900 bg-zinc-700  h-[100vh] ml-5 mb-5 mr-5 md:ml-32 md:mr-32 lg:ml-60 lg:mr-60 object-cover rounded-3xl '>
                    <img src="https://i.pinimg.com/originals/62/09/a5/6209a5d8de089bdfd48b78dfb40f2473.png" alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%'>
                        <button>like</button>
                        <button>comment</button>
                        <button>share</button>
                    </div>    
                </div>
                <div className=' border-b-4 border-zinc-900 bg-zinc-700  h-[100vh] ml-5 mb-5 mr-5 md:ml-32 md:mr-32 lg:ml-60 lg:mr-60 object-cover rounded-3xl '>
                    <img src="https://i.pinimg.com/564x/49/e6/02/49e602d3657a732510d3a355126aef66.jpg" alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%'>
                        <button>like</button>
                        <button>comment</button>
                        <button>share</button>
                    </div>    
                </div>
            </div>
        </div> 
      </div>

    </div>
  )
}

export default ProfileSO
