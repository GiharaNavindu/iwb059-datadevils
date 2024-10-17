import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/back7.jpg')" }}>
      <Header />

      <div className="relative flex items-center justify-center min-h-screen"> {/* Center the content */}
        {/* Banner text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-0">
          {/* Title with larger, bolder text and black outer stroke */}
          <h1 
            className="font-extrabold mb-8 text-white" 
            style={{ 
              fontSize: '5rem',              
              color: 'white',                  
              textShadow: `
                -2px -2px 0 black, 
                2px -2px 0 black, 
                -2px 2px 0 black, 
                2px 2px 0 black
              `, 
            }}
          >
            Join us in shaping the future
          </h1>

          <p 
            className="font-bold text-white" 
            style={{ 
              fontSize: '2rem',               
            
              color: 'white',
              textShadow: `
                -2px -2px 0 black, 
                2px -2px 0 black, 
                -2px 2px 0 black, 
                2px 2px 0 black
              `,
            }}
          >
            with secure and decentralized voting.
          </p>
        </div>
      </div>

      <Features />
    </div>
  );
}
