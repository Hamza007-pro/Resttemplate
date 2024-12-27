import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { ErrorMessage } from './ErrorMessage';
import { Modal } from './Modal';
import { AddClientForm } from './AddClientForm';
import { Client } from '../types';
import { Users, UserPlus } from 'lucide-react';

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8888/CLIENT-SERVICE/clients');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      setError('Unable to connect to the client service. Please ensure the service is running at http://localhost:8888');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (clientData: { name: string; age: number }) => {
    const response = await fetch('http://localhost:8888/CLIENT-SERVICE/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error('Failed to add client');
    }

    fetchClients();
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          Add Client
        </button>
      </div>

      <SearchBar
        placeholder="Search clients..."
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
        <div className="mt-6 space-y-4">
          {filteredClients.map(client => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{client.name}</h3>
                <p className="text-sm text-gray-600">Age: {client.age}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Client"
      >
        <AddClientForm
          onSubmit={handleAddClient}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}