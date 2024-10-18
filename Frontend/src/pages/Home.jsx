//import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';
import Footer from '../components/Footer';
import About from '../components/About';
import Follow from '../components/Follow';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/back7.jpg')",
      backgroundAttachment: "fixed", // Optional: For parallax effect
    }}
  >
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
            className="font-bold text-white mb-12" 
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
          <Link to="/sign-up"> {/* Change the path to your signup route */}
            <button 
              className="bg-purple-600 text-white py-1 px-5 rounded-lg transition duration-300 hover:bg-purple-300"
              style={{ fontSize: '2rem' }} // Style the button
            >
              Register
            </button>
          </Link>
        </div>
      </div>

      <Features />
      <About />
      <Follow />
      <Footer/>
    </div>
  );
}
