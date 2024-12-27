package com.example.voiture.service;

import com.example.voiture.entity.Voiture;
import com.example.voiture.repository.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    public List<Voiture> findAll() {
        return voitureRepository.findAll();
    }

    public Voiture findById(Long id) throws Exception {
        return voitureRepository.findById(id).orElseThrow(() -> new Exception("Voiture not found"));
    }

    public Voiture save(Voiture voiture) {
        return voitureRepository.save(voiture);
    }

    public void delete(Long id) {
        voitureRepository.deleteById(id);
    }

    public Voiture update(Long id, Voiture voiture) {
        Voiture existingVoiture = voitureRepository.findById(id).orElse(null);
        if (existingVoiture == null) {
            return null;
        }
        existingVoiture.setBrand(voiture.getBrand());
        existingVoiture.setModel(voiture.getModel());
        existingVoiture.setMatricule(voiture.getMatricule());
        existingVoiture.setClientId(voiture.getClientId());

        return voitureRepository.save(existingVoiture);
    }
}
