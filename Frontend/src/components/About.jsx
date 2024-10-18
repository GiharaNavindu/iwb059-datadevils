//import React from "react";
import { motion } from "framer-motion"; // Ensure framer-motion is imported correctly

const developers = [
  {
    name: "Gihara Navindu",
    role: "Developer",
    university: "Faculty of Engineering University of Ruhuna",
    image: "gihara.jpeg",
  },
  {
    name: "Kumesha Rashmi",
    role: "Developer",
    university: "Faculty of Engineering University of Ruhuna",
    image: "kumesha2.jpeg",
  },
  {
    name: "Sanaka Lorensuhewa",
    role: "Developer",
    university: "Faculty of Engineering University of Ruhuna",
    image: "sanaka2.jpeg",
  },
  {
    name: "Apsari Udithara",
    role: "Developer",
    university: "Faculty of Engineering University of Ruhuna",
    image: "apsari.jpeg",
  },
];

const About = () => {
  return (
    <section className="bg-navy text-white py-12">
      <div className="container mx-auto px-6">
        {/* About Title and Text Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <motion.h2
            className="text-5xl font-extrabold mb-8 md:mb-0 transform rotate-180 md:rotate-0 text-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About
          </motion.h2>

          <motion.div
            className="border-l-2 border-white pl-6 md:w-3/4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg leading-relaxed mb-6">
              An online voting system that will replace traditional ballot or
              paper systems. Over time, we have utilized the required technology
              in every sector to improve efficiency and save extra resources.
              Our system ensures safety, reliability, and modern solutions for
              issues like booth reachability, crowd-free voting, and faster
              results.
            </p>
            <p className="text-lg leading-relaxed">
              Developed by a team of passionate students across multiple
              universities, this project aims to revolutionize the voting
              process with modern technologies like blockchain and cloud-based
              systems.
            </p>
          </motion.div>
        </div>

        {/* Developer Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="bg-white text-black p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">{dev.name}</h3>
              <p className="text-center text-gray-700">{dev.role}</p>
              <p className="text-center text-sm mt-2">{dev.university}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
