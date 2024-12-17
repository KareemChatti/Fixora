package com.example.projinteg.controller;

import com.example.projinteg.service.KeycloakService;
import com.example.projinteg.dto.LoginRequest;
import com.example.projinteg.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final KeycloakService keycloakService;

    @Autowired
    public AuthController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        
        String token = keycloakService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }

    
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest registerRequest) {
        keycloakService.registerUser(registerRequest.getEmail(), registerRequest.getPassword());
        return ResponseEntity.ok().build();
    }
}