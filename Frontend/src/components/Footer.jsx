//import React from "react";
import {
  Facebook,
  GitHub,
  Instagram,
  YouTube,
} from "@mui/icons-material"; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Logo & Title */}
          <div className="flex items-center md:items-start">
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "60px", marginRight: "10px" }}
            />
            <h2 className="text-6xl font-bold">DevilVote</h2>
          </div>

          {/* Links Section */}
          <div className="flex space-x-40 text-center md:text-left">
            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://vite.dev/guide/" className="hover:text-gray-400">Vite </a></li>
                <li><a href="https://react.dev/learn" className="hover:text-gray-400">React </a></li>
                <li><a href="https://ballerina.io/" className="hover:text-gray-400">Ballerina</a></li>
                <li><a href="https://tailwindcss.com/docs/guides/vite" className="hover:text-gray-400">Tailwind CSS</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/GiharaNavindu/iwb059-datadevils" className="hover:text-gray-400">GitHub</a></li>
                <li><a href="#" className="hover:text-gray-400">Youtube</a></li>
                <li><a href="#" className="hover:text-gray-400">facebook</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-600"></div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-400">
            <Facebook fontSize="large" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <GitHub fontSize="large" />
          </a>
          
          <a href="#" className="hover:text-gray-400">
            <Instagram fontSize="large" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <YouTube fontSize="large" />
          </a>
          
        </div>
        {/* Copyright Text */}
        <p className="text-sm text-center">
          &copy; 2024 DevilVote™. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

