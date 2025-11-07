package com.vanigo.backend.controller;

import com.vanigo.backend.dto.request.MessageRequest;
import com.vanigo.backend.entity.Message;
import com.vanigo.backend.entity.User;
import com.vanigo.backend.service.MessageService;
import com.vanigo.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/conversations/{conversationId}/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(@PathVariable UUID conversationId, @Valid @RequestBody MessageRequest request, Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        Message message = messageService.sendMessage(conversationId, request.getContent(), user.getId());
        return ResponseEntity.ok(message);
    }
}