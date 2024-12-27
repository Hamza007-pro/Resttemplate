package com.example.voiture.model;

import com.example.voiture.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VoitureResponse {

    private Long id;
    private String brand;
    private String model;
    private String matricule;
    private Client client;
}
