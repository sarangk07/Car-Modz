import Start from "./components/Start";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen overflow-hidden">
      
      <video 
        src={`/carintro2.mp4`} 
        autoPlay   
        loop 
        muted 
        playsInline   
        className="absolute hidden md:flex pointer-events-none w-full h-full object-cover object-center"
      />

      
      <video 
        src={`/carintro1mp4.mp4`} 
        autoPlay   
        loop 
        muted 
        playsInline   
        className="absolute md:hidden flex pointer-events-none w-full h-full object-cover object-center"
      />
      
      
      <div className="relative z-10 cursor-default flex flex-col items-center justify-center p-4 pl-10 pr-10 rounded-md">
        <p className="relative font-mono -top-32 md:text-9xl font-extrabold text-4xl">𝕄<span className="text-red-500">🅞</span>𝔻𝔼 𝔸ℝ𝔼ℕ𝔸</p>
        <Start/>
      </div>
    </div>
  );
}
