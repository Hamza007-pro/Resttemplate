import React, { useState } from 'react';
import { Client } from '../types';

interface AddCarFormProps {
  clients: Client[];
  onSubmit: (car: { brand: string; model: string; matricule: string; clientId: number }) => Promise<void>;
  onClose: () => void;
}

export function AddCarForm({ clients, onSubmit, onClose }: AddCarFormProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [matricule, setMatricule] = useState('');
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!brand || !model || !matricule || !clientId) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await onSubmit({
        brand,
        model,
        matricule,
        clientId: parseInt(clientId, 10)
      });
      onClose();
    } catch (err) {
      setError('Failed to add car');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">Matricule</label>
        <input
          type="text"
          id="matricule"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Owner</label>
        <select
          id="clientId"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an owner</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name} (Age: {client.age})
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Car
        </button>
      </div>
    </form>
  );
}