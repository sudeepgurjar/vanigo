package com.vanigo.backend.service;

import com.vanigo.backend.client.GroqClient;
import com.vanigo.backend.client.OllamaClient;
import com.vanigo.backend.entity.Conversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    @Autowired(required = false)
    private OllamaClient ollamaClient;

    @Autowired(required = false)
    private GroqClient groqClient;

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    public String generateResponse(String userMessage) {
        try {
            if ("prod".equals(activeProfile) && groqClient != null) {
                return groqClient.generateResponse(userMessage);
            } else if (ollamaClient != null) {
                return ollamaClient.generateResponse(userMessage);
            } else {
                return "AI service is currently unavailable.";
            }
        } catch (Exception e) {
            return "I apologize, but I'm having trouble generating a response right now. Error: " + e.getMessage();
        }
    }

    public String generateSummary(Conversation conversation) {
        try {
            if (conversation.getMessages() == null || conversation.getMessages().isEmpty()) {
                return "No messages to summarize";
            }

            String conversationText = conversation.getMessages().stream()
                    .map(msg -> msg.getSender() + ": " + msg.getContent())
                    .collect(Collectors.joining("\n"));

            String prompt = "Summarize the following conversation in 2-3 concise sentences:\n\n" + conversationText;

            if ("prod".equals(activeProfile) && groqClient != null) {
                return groqClient.generateResponse(prompt);
            } else if (ollamaClient != null) {
                return ollamaClient.generateResponse(prompt);
            } else {
                return "Summary generation unavailable.";
            }
        } catch (Exception e) {
            return "Summary generation failed: " + e.getMessage();
        }
    }

    public String analyzeConversations(String query, List<Conversation> conversations) {
        try {
            StringBuilder historyBuilder = new StringBuilder();

            for (Conversation conv : conversations) {
                historyBuilder.append("Conversation: ").append(conv.getTitle()).append("\n");
                if (conv.getSummary() != null) {
                    historyBuilder.append("Summary: ").append(conv.getSummary()).append("\n");
                }
                historyBuilder.append("\n");
            }

            String conversationHistory = historyBuilder.toString();

            if (conversationHistory.trim().isEmpty()) {
                return "No conversation history available to analyze.";
            }

            String prompt = "You are an AI assistant analyzing conversation history.\n\n" +
                    "History:\n" + conversationHistory +
                    "\n\nUser Question: " + query +
                    "\n\nProvide a helpful answer based on the history.";

            if ("prod".equals(activeProfile) && groqClient != null) {
                return groqClient.generateResponse(prompt);
            } else if (ollamaClient != null) {
                return ollamaClient.generateResponse(prompt);
            } else {
                return "Analysis unavailable.";
            }
        } catch (Exception e) {
            return "Analysis failed: " + e.getMessage();
        }
    }
}
