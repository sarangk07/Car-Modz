'use client'

import React from 'react'
import Carousel from '../components/carousal'
import Link from 'next/link';
import { useSelector } from 'react-redux';

function Home() {
  const images = [
    'https://i.pinimg.com/originals/bf/72/f9/bf72f91268216b97ef0f8976e8314432.jpg',
    'https://i.pinimg.com/originals/14/c5/91/14c5913ac14df4378a20cda4c7c7eb26.jpg',
    'https://i.pinimg.com/originals/1a/1e/22/1a1e220a07b5a89ef92732a03a153889.jpg',
  ];
  const user = useSelector((state) => state.user);
  console.log(user.userInfo.email,"user infos");
  return (
    <div className='bg-[#1a1a2e] w-full text-[#f4ecee] h-[1550px] flex flex-col justify-stretch items-stretch'>
      <div className="navBar h-fit bg-[#1a1a2e] border-b border-[#0f3460] shadow-md">nav</div>
      <div className="mainbody h-5/6 flex">
        <div className='flex-col bg-[#16213e] md:w-1/6 border-r border-[#0f3460] hidden md:flex'>
            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mt-4 mx-2'>
              <div className='flex'>
                <div>
                  <h3 className="text-white font-semibold">{user.username}</h3>
                  <p className='text-xs'>Punto 1.6</p>
                  <p>{user.userInfo.email}</p>
                </div>
                <Link href='/profileU'>
                  <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10 ml-5'/>
                </Link>
              </div>
              <div className='flex justify-around mt-2'>
                <a className="hover:text-white transition-colors duration-300">logout</a>
                <a href="" className="hover:text-white transition-colors duration-300">more</a>
              </div>
            </div>

            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mb-4 mx-2'>
              <p className='text-white font-semibold mb-2'>Suggestions</p>
              <div className='flex items-center mb-2'>
                <Link href='/profileSO'>
                  <img src="https://wolfmoto.in/wp-content/themes/wolf-motors/images/logo.png" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10 mr-3'/>
                </Link>
                <div>
                  <p className='text-xs'>Wolf Performance</p>
                  <p className='text-xs mt-1'>Rating</p>
                </div>
              </div>

              <div className='flex items-center'>
                <img src="https://code6.racing/image/catalog/logo.png" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10 mr-3'/>
                <div>
                  <p className='text-xs'>Code 6</p>
                  <p className='text-xs mt-1'>Rating</p>
                </div>
              </div>
            </div>

            <div className='bg-[#1a1a2e] rounded-xl p-5 shadow-lg mx-2'>
              <p className='text-white font-semibold mb-2'>Similar cars owners</p>
              <div className='flex justify-between items-center mb-2 bg-[#16213e] rounded-lg p-2'>
                <div className='flex items-center'>
                  <img src="https://i.pinimg.com/564x/f1/74/17/f17417530e7fbd941fb8cf9d6a06509c.jpg" alt="" className='bg-[#0f3460] w-8 rounded-xl h-8 mr-2'/>
                  <p>Arjun</p>
                </div>
                <div>
                  <p className="text-xs hover:text-white transition-colors duration-300">Connect</p>
                  <p className='text-xs mt-1 hover:text-white transition-colors duration-300'>Message</p>
                </div>
              </div>

              <div className='flex justify-between items-center bg-[#16213e] rounded-lg p-2'>
                <div className='flex items-center'>
                  <img src="https://i.pinimg.com/564x/0f/33/9a/0f339a9675cf166d1e9e8c7439327256.jpg" alt="" className='bg-[#0f3460] w-8 rounded-xl h-8 mr-2'/>
                  <p>Ranjan</p>
                </div>
                <div>
                  <p className="text-xs hover:text-white transition-colors duration-300">Connect</p>
                  <p className='text-xs mt-1 hover:text-white transition-colors duration-300'>Message</p>
                </div>
              </div>
            </div>
        </div>
        <div className='md:w-5/6 w-full'>
            <div className="header h-1/3 w-full bg-[#1a1a2e] border-b border-[#0f3460]">
                <div className='h-3/4 m:h-full w-full'>
                  <Carousel images={images}/>
                </div>
                <div className='h-1/4 w-full md:hidden'>
                  <div className='flex justify-between items-start p-4 bg-[#16213e] rounded-xl m-2'>
                    <div>
                      <h3 className="text-white font-semibold">{user.userInfo.username}</h3>
                      <p className='text-xs'>Punto 1.6</p>
                      <p>{user.userInfo.email}</p>
                    </div>
                    <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='bg-[#0f3460] w-10 rounded-xl h-10'/>
                  </div>
                </div>
            </div>

            <div className="flex  h-2/3 w-full bg-[#1a1a2e] p-4">
              {/* <p className="text-white font-semibold mb-4">Body</p> */}
              <div className='md:w-1/3 hidden md:flex border-r border-[#0f3460]'>chats</div>
              <div className='md:w-2/3 h-full flex flex-col'>
                <div className="text-center mb-4">posts</div>
                <div className='flex-1 overflow-y-auto m-3'  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className='border-b-4 border-zinc-900 bg-zinc-700 h-[100vh] mb-5 object-cover rounded-3xl'>
                    <img src="https://i.pinimg.com/564x/f5/04/7f/f5047fb11c11eef52ab8e661addbc9ed.jpg" alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%]'>
                      <button>like</button>
                      <button>comment</button>
                      <button>share</button>
                    </div>    
                  </div>

                  <div className='border-b-4 border-zinc-900 bg-zinc-700 h-[100vh] mb-5 object-cover rounded-3xl'>
                    <img src="https://i.pinimg.com/originals/d3/d4/43/d3d44386662eaf2c3b6b070bc29226ed.jpg " alt="" className='relative w-full h-[90%] rounded-3xl' />
                    <div className='flex justify-between items-center mt-0 mb-0 pt-5 ml-5 mr-5 h-[10%]'>
                      <button>like</button>
                      
                      <button>comment</button>
                      <button>share</button>
                    </div>     
                  </div>
                </div>
              </div>
              
            </div>
        </div>
      </div>
      <div className="footer h-1/6 bg-[#16213e] border-t border-[#0f3460]">
        <div className='flex justify-center h-fit bg-[#0f3460] text-white p-2'>site info</div>
        <div className='flex flex-col items-center justify-center h-fit mt-4'>
          <p className="text-white mb-2">follow us on</p>
          <ul className='flex space-x-4'>
            <li className="hover:text-white transition-colors duration-300">Facebook</li>
            <li className="hover:text-white transition-colors duration-300">X</li>
            <li className="hover:text-white transition-colors duration-300">Instagram</li>
            <li className="hover:text-white transition-colors duration-300">Telegram</li>
          </ul>
        </div>
      </div>
    </div>
  ) 
}

export default Home