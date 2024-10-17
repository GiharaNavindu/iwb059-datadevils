import React from 'react'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="bg-black min-h-screen"> {/* Add black background and ensure it takes full height */}
      <Header />
      
      <div className="relative flex items-center justify-center min-h-screen"> {/* Center the content */}
        {/* Banner text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Join us in shaping the future
          </h1>
          <p className="text-xl text-white">
            with secure and decentralized voting.
          </p>
        </div>
      </div>
    </div>
  )
}
