//import React from "react";
import {
  Assignment,
  Login,
  Dashboard,
  VpnKey,
  HowToVote,
} from "@mui/icons-material"; // MUI icons import

const Follow = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Follow these easy steps</h1>
        <div className="w-50 h-1 bg-purple-500 mx-auto"></div> {/* Underline */}
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex items-center space-x-6">
          <Assignment fontSize="large" />
          <p className="text-xl font-medium">Register yourself by filling the required information</p>
        </div>

        {/* Step 2 */}
        <div className="flex items-center space-x-6">
          <Login fontSize="large" />
          <p className="text-xl font-medium">Sign in as a user</p>
        </div>

        {/* Step 3 */}
        <div className="flex items-center space-x-6">
          <Dashboard fontSize="large" />
          <p className="text-xl font-medium">Go to vote option on dashboard</p>
        </div>

        {/* Step 4 */}
        <div className="flex items-center space-x-6">
          <VpnKey fontSize="large" />
          <p className="text-xl font-medium">Give security key</p>
        </div>

        {/* Step 5 */}
        <div className="flex items-center space-x-6">
          <HowToVote fontSize="large" />
          <p className="text-xl font-medium">Vote your candidate and submit</p>
        </div>
      </div>
    </section>
  );
};

export default Follow;
