package com.vanigo.backend.service;

import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.Message;
import com.vanigo.backend.exception.ResourceNotFoundException;
import com.vanigo.backend.repository.ConversationRepository;
import com.vanigo.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private AIService aiService;

    public Message sendMessage(UUID conversationId, String content, UUID userId) {
        try {
            Conversation conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

            if (!conversation.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized access to conversation");
            }

            if (!conversation.getActive()) {
                throw new RuntimeException("Conversation is not active");
            }

            Message userMessage = new Message();
            userMessage.setConversation(conversation);
            userMessage.setContent(content);
            userMessage.setSender(Message.MessageSender.USER);

            Message savedUserMessage = messageRepository.save(userMessage);

            String aiResponse = aiService.generateResponse(content);

            Message aiMessage = new Message();
            aiMessage.setConversation(conversation);
            aiMessage.setContent(aiResponse);
            aiMessage.setSender(Message.MessageSender.AI);

            messageRepository.save(aiMessage);

            return savedUserMessage;
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send message: " + e.getMessage());
        }
    }
}