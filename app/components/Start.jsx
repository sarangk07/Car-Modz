'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Start() {
    const route = useRouter()
  return (
    <>
      <button className="mt-5 backdrop-blur-sm font-mono hover:bg-zinc-900 rounded-md hover:text-white p-5 font-extrabold border border-zinc-500" onClick={()=> route.push('./login')} >START</button> 
    </>
  )
}

export default Start
