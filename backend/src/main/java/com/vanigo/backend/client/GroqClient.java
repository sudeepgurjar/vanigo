
package com.vanigo.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Component
public class GroqClient {

    private final WebClient webClient;
    private final String apiKey;

    public GroqClient(@Value("${groq.api.key:}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String generateResponse(String prompt) {
        try {
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> request = new HashMap<>();
            request.put("model", "llama-3.1-70b-versatile");
            request.put("messages", List.of(message));
            request.put("temperature", 0.7);
            request.put("max_tokens", 1000);

            Map<String, Object> response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                    return messageObj.get("content").toString();
                }
            }

            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with AI: " + e.getMessage());
        }
    }
}
