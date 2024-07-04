'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Eye from '../components/Eye'

gsap.registerPlugin(ScrollTrigger);

function Demo() {
  const BMWref = useRef(null);
  const Fordref = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(textRef.current.children, {
        opacity: 10, //boldness of things
        x: 300, //left side nn 100px right le kk move chyyunnu
        duration: 3, // moving time the given duration higher the animation slower
        scrollTrigger:{   // this means , scroll chyyumbol mathramee mukalilee animation work chyyuvv.
            trigger: textRef.current, // this means , scrolltriger dy view port le eeee element ethumbool , appol animation work akum
            start:"top center",    //this means , scroll chyth textRef dy top  the view port dy center le ehtumbol mathramee animation start aku, we an also use [number only , means scroll view port aa number le [px] ethumbol]
            end:"bottom end", 

            //scroll mukaliloottum thazhottum akkumbol ullat actions set cheyyunnu.
            toggleActions: "play none none reverse",//we can usee ['play,pause,resume,reverse,restart,reet,complete,none']
            //            onEnter onLeave onEnterback onLeaveback    
            // markers: true,

        }
        // scrollTrigger: {
        //   trigger: textRef.current,
        //   start: "top left",
        //   end: "top center",
        //   scrub: 1,
          
        // }
      });





      
      gsap.to(BMWref.current.children,{
        x: 500,
        duration:3,
        ease: "power1.inOut",
        scrollTrigger:{
          trigger: BMWref.current,
          start:"top center",
          end:"bottom end",
          toggleActions: "play none none reverse",
          // scrub:4, //scoll chythalee anmation work aaku, means scroll chyynnth edakk stop akkityal animation um stop/pause akum ,reverse animation work akkam .
          // markers: true,
        }
        })

      gsap.to(Fordref.current.children,{
        x: -500,
        duration:3,
        ease: "power2.inOut",
        scrollTrigger:{
          trigger: Fordref.current,
          start:"top center",
          end:"bottom end",
          toggleActions: "play none none reverse",
          
        }
        })
    });







    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'.box',
        start:'top 90%',
        
        markers:true,
        scrub:3,
      }
    })
    tl.to('.box',{x:500,duration:3})
      .to('.box',{y:200,duration:4})
      .to('.box',{x:0,duration:2})
      .to('.box',{y:300,duration:3})
      .to('.box',{x:400,duration:4})
      .to('.box',{y:200,duration:4})
      .to('.box',{x:0,duration:2})
      .to('.box',{y:600,duration:2})

    return () => ctx.revert(); 
  }, []);

  return (
    <div className='min-h-screen w-full bg-zinc-950 text-white'>
      <div className='h-screen flex items-center justify-center bg-zinc-950'>
        <Eye />
        <Eye />
        <img src="https://cdna.artstation.com/p/assets/images/images/035/322/738/large/vlx-zhadaev-eurwkyjxaacujow.jpg?1614680652" alt="" className='relative h-full w-screen'/>
        <button className='text-4xl absolute rounded-lg bg-transparent border-2 font-mono border-cyan-400'>Scroll Down</button>
      </div>

      <div className="box absolute z-50 w-10 h-10 bg-fuchsia-700">
fff
</div>



      <div className='flex justify-around  w-full p-3 h-[750px] bg-red-600'>
       
        <div ref={BMWref} className='bg-blue-600 w-1/2 relative'>
          <div className='absolute -left-[480px]'>
          
            <img src="https://cdna.artstation.com/p/assets/images/images/049/632/752/large/memo-ov-6.jpg?1652940112" className="w-full h-screen object-contain" alt="Mustang GTR" />
            <h2 className='absolute top-4 left-4 text-white'>BMW</h2>
            <p className='absolute top-8 left-4 text-white'>M3 GTR</p>
          </div>
        </div>


        <div ref={Fordref} className='bg-red-800 w-1/2 items-end text-right relative overflow-hidden'>
          <div className='absolute -right-[480px]'>
            <img src="https://cdnb.artstation.com/p/assets/images/images/046/998/321/large/memo-ov-4.jpg?1646501635" className="w-full h-screen object-contain" alt="Mustang GTR" />
            <h2 className='absolute top-4 left-4 text-white'>Ford</h2>
            <p className='absolute top-8 left-4 text-white'>Mustang GT</p>
          </div>
        </div>

      </div>





      <div className='flex flex-col text-6xl justify-start p-4 bg-lime-900' ref={textRef}>
        <h1>HELLO</h1>
        <h1>WELCOME...</h1>
        <p>Black Lists</p>
      </div>





      <div className='flex flex-col justify-center items-center p-20 bg-stone-800'>
        <div className='bg-slate-400 flex p-2 relative' ref={boxRef}>
          <div className='p-5'>img</div>
          <div className='p-5'>content</div>
        </div>
      </div>





      <div className='flex justify-center items-center h-screen bg-lime-600'>
        <h1 className='text-4xl'>THE END</h1>
      </div>




    </div>
  );
}

export default Demo;