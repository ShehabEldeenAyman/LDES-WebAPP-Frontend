import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GraphCard from './components/GraphCard';
import Footer from './components/Footer';
import TestGraph1 from './components/LDESgraphs/TestGraph1';
// --- Components ---






// --- Main Layout ---

function App() {
  // Simulating your future data list

  const graphArray = [{ id: 1, title: "Temperature Sensor", component: TestGraph1 },
    { id: 2, title: "Humidity Analytics", component: TestGraph1 },
    { id: 3, title: "Pressure Monitoring", component: TestGraph1 },]

  return (
    // min-h-screen ensures footer hits bottom even if content is short
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
            <p className="mt-2 text-slate-600">Monitor your key performance metrics in real-time.</p>
          </div>

          {/* Responsive Grid Layout:
             - grid-cols-1 (Mobile)
             - md:grid-cols-2 (Tablet)
             - lg:grid-cols-3 (Desktop)
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graphArray.map((graph) => (
              <GraphCard 
      key={graph.id} 
      title={graph.title} 
      GraphComponent={graph.component} // Add this line
    />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;