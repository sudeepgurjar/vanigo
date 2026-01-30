package com.vanigo.backend.service;

import com.vanigo.backend.client.OllamaClient;
import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    @Autowired
    private OllamaClient ollamaClient;

    public String generateResponse(String userMessage) {
    // Check if running in production
    String profile = System.getenv("SPRING_PROFILES_ACTIVE");
    
    if ("prod".equals(profile)) {
        return "🤖 AI Chat Response:\n\n" +
               "Hello! I'm VaniGo's AI assistant. " +
               "I understand you said: \"" + userMessage + "\"\n\n" +
               "Note: Full AI capabilities with Llama 3.1 are available in development mode. " +
               "Cloud AI integration coming soon! 🚀";
    }
    
    try {
        return ollamaClient.generateResponse(userMessage);
    } catch (Exception e) {
        return "I apologize, but I'm having trouble connecting to the AI service right now. " +
               "Please try again later.";
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

            return ollamaClient.generateSummary(conversationText);
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

            return ollamaClient.analyzeConversation(query, conversationHistory);
        } catch (Exception e) {
            return "Analysis failed: " + e.getMessage();
        }
    }
}