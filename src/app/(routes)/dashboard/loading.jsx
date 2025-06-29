import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Glowing Ring Animation */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-purple-400 animate-spin" style={{animationDuration: '0.8s', animationDirection: 'reverse'}}></div>
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">Loading Dashboard</h2>
          <p className="text-gray-400">Fetching your financial data...</p>
        </div>

        {/* Progress indicators */}
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Loading budgets...</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span>Fetching expenses...</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span>Calculating insights...</span>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Loading;