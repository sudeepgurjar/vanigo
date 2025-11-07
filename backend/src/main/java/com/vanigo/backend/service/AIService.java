package com.vanigo.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    public String generateResponse(String userMessage) {
        try {
            return "This is a demo AI response. Ollama integration coming soon. You said: " + userMessage;
        } catch (Exception e) {
            throw new RuntimeException("AI service error: " + e.getMessage());
        }
    }

    public String generateSummary(String conversationContent) {
        try {
            return "Summary: This was a conversation about various topics. Full AI summarization will be implemented with Ollama.";
        } catch (Exception e) {
            throw new RuntimeException("Summary generation failed: " + e.getMessage());
        }
    }
}