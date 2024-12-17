package com.example.projinteg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class KeycloakService {

    
    private static final String KEYCLOAK_URL = "http://localhost:8050"; 
    private static final String REALM = "myrealm"; 
    private static final String CLIENT_ID = "fixora"; 
    private static final String CLIENT_SECRET = "oBRZeP9IiRvvQrC8uY7HgatWHi9EOqM9"; 

    private final RestTemplate restTemplate;

    
    @Autowired
    public KeycloakService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    
    public String login(String username, String password) {
        String url = KEYCLOAK_URL + "/realms/" + REALM + "/protocol/openid-connect/token";

        
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", CLIENT_ID);
        map.add("client_secret", CLIENT_SECRET);
        map.add("username", username);
        map.add("password", password);
        map.add("grant_type", "password");

       
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

       
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null) {
            String accessToken = (String) responseBody.get("access_token");
            if (accessToken != null) {
                return accessToken;
            } else {
                throw new RuntimeException("Access token not found in the response");
            }
        } else {
            throw new RuntimeException("Failed to get access token from Keycloak: " + response.getStatusCode());
        }
    }

  
    public void registerUser(String email, String password) {
        String url = KEYCLOAK_URL + "/admin/realms/" + REALM + "/users";

       
        Map<String, Object> userPayload = new HashMap<>();
        userPayload.put("username", email);
        userPayload.put("email", email);
        userPayload.put("enabled", true);
        userPayload.put("credentials", Arrays.asList(Map.of("type", "password", "value", password)));

       
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + getAdminAccessToken());

        
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(userPayload, headers);
        try {
            restTemplate.postForObject(url, request, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to register user in Keycloak", e);
        }
    }

    
    private String getAdminAccessToken() {
        String url = KEYCLOAK_URL + "/realms/" + REALM + "/protocol/openid-connect/token";

        
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", CLIENT_ID);
        map.add("client_secret", CLIENT_SECRET);
        map.add("grant_type", "client_credentials");

       
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

       
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                String accessToken = (String) responseBody.get("access_token");
                if (accessToken != null) {
                    return accessToken;
                } else {
                    throw new RuntimeException("Admin access token not found in the response");
                }
            } else {
                throw new RuntimeException("Failed to fetch admin access token from Keycloak: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error during admin token request", e);
        }
    }
}
