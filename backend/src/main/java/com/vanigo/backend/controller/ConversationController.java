package com.vanigo.backend.controller;

import com.vanigo.backend.dto.response.ConversationResponse;
import com.vanigo.backend.entity.Conversation;
import com.vanigo.backend.entity.User;
import com.vanigo.backend.service.ConversationService;
import com.vanigo.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Conversation> createConversation(@RequestBody Map<String, String> request, Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        Conversation conversation = conversationService.createConversation(user.getId(), request.get("title"));
        return ResponseEntity.ok(conversation);
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getUserConversations(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        List<ConversationResponse> conversations = conversationService.getUserConversations(user.getId());
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationResponse> getConversation(@PathVariable UUID id, Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        ConversationResponse conversation = conversationService.getConversationById(id, user.getId());
        return ResponseEntity.ok(conversation);
    }

    @PostMapping("/{id}/end")
    public ResponseEntity<Conversation> endConversation(@PathVariable UUID id, @RequestBody Map<String, String> request, Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        Conversation conversation = conversationService.endConversation(id, user.getId(), request.get("summary"));
        return ResponseEntity.ok(conversation);
    }
}