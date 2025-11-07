package com.vanigo.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/intelligence")
public class IntelligenceController {

    @PostMapping("/query")
    public ResponseEntity<Map<String, String>> queryConversations(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Map.of(
                "answer", "Demo answer: Based on your past conversations about " + request.get("query"),
                "message", "Full intelligence features coming with Ollama integration"
        ));
    }
}