package com.example.client.services;

import com.example.client.entites.Client;
import com.example.client.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client findById(Long id) throws Exception {
        return clientRepository.findById(id).orElseThrow(() -> new Exception("Client not found"));
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

    public Client update(Long id, Client client) {
        Client existingClient = clientRepository.findById(id).orElse(null);
        if (existingClient == null) {
            return null;
        }
        existingClient.setName(client.getName());
        existingClient.setAge(client.getAge());

        return clientRepository.save(existingClient);
    }
}
