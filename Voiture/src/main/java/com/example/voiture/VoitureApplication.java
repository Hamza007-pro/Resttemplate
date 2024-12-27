package com.example.voiture;

import com.example.voiture.entity.Voiture;
import com.example.voiture.repository.VoitureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@EnableDiscoveryClient
@SpringBootApplication
public class VoitureApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoitureApplication.class, args);
    }

    @Bean
    CommandLineRunner start(VoitureRepository voitureRepository) {
        return args -> {
            voitureRepository.save(new Voiture( "Clio", "Renault", "1997A26", 1L));
            voitureRepository.save(new Voiture( "Golf", "Volkswagen", "1997A26", 2L));
            voitureRepository.save(new Voiture("A3", "Audi", "1997A26", 3L));
        };
    }

//    @Bean
//    public RestTemplate restTemplate() {
//        RestTemplate restTemplate = new RestTemplate();
//        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
//        requestFactory.setConnectTimeout(5000);
//        requestFactory.setReadTimeout(5000);
//        restTemplate.setRequestFactory(requestFactory);
//        return restTemplate;
//    }

}
