import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { ErrorMessage } from './ErrorMessage';
import { Modal } from './Modal';
import { AddCarForm } from './AddCarForm';
import { Car, Client } from '../types';
import { Car as CarIcon, Plus } from 'lucide-react';

export function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([fetchCars(), fetchClients()]).finally(() => setLoading(false));
  }, []);

  const fetchCars = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8082/voitures');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      setError('Unable to connect to the car service. Please ensure the service is running at http://localhost:8082');
      console.error('Error fetching cars:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8888/CLIENT-SERVICE/clients');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleAddCar = async (carData: { brand: string; model: string; matricule: string; clientId: number }) => {
    const response = await fetch('http://localhost:8082/voiture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Failed to add car');
    }

    fetchCars();
  };

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Owner';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CarIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Cars</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Car
        </button>
      </div>

      <SearchBar
        placeholder="Search cars..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map(car => (
            <div
              key={car.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <CarIcon className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-800">{car.brand} {car.model}</h3>
              </div>
              <p className="text-sm text-gray-600">Matricule: {car.matricule}</p>
              <p className="text-sm text-gray-600">Owner: {getClientName(car.clientId)}</p>
              <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Car"
      >
        <AddCarForm
          clients={clients}
          onSubmit={handleAddCar}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}