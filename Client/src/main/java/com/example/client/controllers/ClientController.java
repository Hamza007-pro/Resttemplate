package com.example.client.controllers;

import com.example.client.entites.Client;
import com.example.client.repositories.ClientRepository;
import com.example.client.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/clients")
    public List<Client> findAll() {
        return clientService.findAll();
    }

    @GetMapping("/client/{id}")
    public Client findById(@PathVariable Long id) {
        try {
            return clientService.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/client")
    public Client save(@RequestBody Client client) {
        return clientService.save(client);
    }

    @DeleteMapping("/client/{id}")
    public void delete(Long id) {
        clientService.delete(id);
    }

    @PutMapping("/client/{id}")
    public Client update(Long id, Client client) {
        return clientService.update(id, client);
    }
}
