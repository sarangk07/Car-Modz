'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function Start() {
    const route = useRouter()
  return (
    <>
     <button className="mt-5 backdrop-blur-sm font-mono p-5 font-extrabold border" onClick={()=> route.push('./login')}>Start</button> 
    </>
  )
}

export default Start
