package com.vanigo.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("health")
public class HealthCheckController {

    @GetMapping
    public String healthCheck(){
        return "VaniGo Backend Is Ready To Go ! Rishikesh Man Kill It Here As Well";
    }
}
