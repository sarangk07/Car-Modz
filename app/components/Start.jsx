'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Start() {
    const route = useRouter()
  return (
    <>
      <button className="mt-5 backdrop-blur-sm font-mono hover:bg-black hover:text-white p-5 font-extrabold border border-black" onClick={()=> route.push('./login')}>START</button> 
    </>
  )
}

export default Start
