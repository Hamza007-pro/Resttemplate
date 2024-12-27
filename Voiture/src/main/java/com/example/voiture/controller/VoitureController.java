package com.example.voiture.controller;

import com.example.voiture.entity.Voiture;
import com.example.voiture.service.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @GetMapping("/voitures")
    public List<Voiture> findAll() {
        return voitureService.findAll();
    }

    @GetMapping("/voiture/{id}")
    public Voiture findById(Long id) {
        try {
            return voitureService.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/voiture")
    public Voiture save(@RequestBody Voiture voiture) {
        return voitureService.save(voiture);
    }

    @DeleteMapping("/voiture/{id}")
    public void delete(Long id) {
        voitureService.delete(id);
    }

    @PutMapping("/voiture/{id}")
    public Voiture update(Long id, Voiture voiture) {
        return voitureService.update(id, voiture);
    }


}
