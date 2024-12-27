import React from 'react';
import { ClientList } from './components/ClientList';
import { CarList } from './components/CarList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid gap-8 grid-cols-1">
          <ClientList />
          <CarList />
        </div>
      </div>
    </div>
  );
}

export default App;