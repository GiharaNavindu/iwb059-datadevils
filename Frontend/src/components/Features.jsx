//import React from "react";
import {
  Security,
  Poll,
  AccessTime,
  Cloud,
  CheckCircle,
  AttachMoney,
} from "@mui/icons-material";

const features = [
  { icon: <Security fontSize="large" />, text: "Secured by 256-bit encryption" },
  { icon: <Cloud fontSize="large" />, text: "Backed by Ethereum-based technology" },
  { icon: <CheckCircle fontSize="large" />, text: "Verifiable transactions" },
  { icon: <Poll fontSize="large" />, text: "Easy to use" },
  { icon: <AttachMoney fontSize="large" />, text: "Cheaper than ballot voting system" },
  { icon: <AccessTime fontSize="large" />, text: "Faster voting process" },
];

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-center">
        <div className="flex items-center">
          <div className="relative transform -rotate-90">
            <h2 className="text-4xl font-bold text-gray-900">Features</h2>
          </div>
          <div className="h-full w-2 bg-purple-700 ml-4"></div> 
        </div>
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-purple-500">{feature.icon}</div>
              <p className="text-lg font-medium text-gray-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;



